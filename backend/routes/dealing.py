from flask import Blueprint, jsonify, g
import random

from utils import (
    _is_pair,
    _hand_total_and_soft,
    _is_blackjack,
    _to_frontend_rank,
    _make_shoe,
)
from models import get_db
from auth import require_user

dealing_bp = Blueprint('dealing', __name__)

RANK_TO_VAL = {
    'A': 11, 'K': 10, 'Q': 10, 'J': 10, 'T': 10,
    '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
}
TEN_SET = {'T', 'J', 'Q', 'K'}

@dealing_bp.get('/deal_newhand')
@require_user                      # protect this route
def deal_newhand():
    db, cur = get_db()

    # real user from Supabase token
    user_id = g.user['id']

    # pull settings for this user
    cur.execute("""
        SELECT hole_card, surrender_allowed, soft17_hit, decks_count, double_first_two
        FROM user_settings
        WHERE user_id = %s
    """, (user_id,))
    s = cur.fetchone()

    # defaults if not found
    hole_mode         = (s['hole_card'] if s else '4-10')
    surrender_allowed = bool(s['surrender_allowed']) if s else True
    soft17_hit        = bool(s['soft17_hit'])        if s else False
    decks_count       = int(s['decks_count'])        if s else 6
    double_first_two  = (s['double_first_two'] if s else 'any')

    # force one deck for the A to 9 modes
    if hole_mode in ('A-9DAS', 'A-9NoDAS'):
        decks_count = 1

    # deal until non trivial hand
    tries = 0
    MAX_TRIES = 400
    while True:
        tries += 1
        if tries > MAX_TRIES:
            return jsonify({"error": "could not produce a non trivial hand"}), 500

        shoe = _make_shoe(decks_count)

        player_cards = [shoe.pop(), shoe.pop()]
        dealer_up    = shoe.pop()
        dealer_hole  = shoe.pop()

        player_total, player_soft = _hand_total_and_soft(player_cards)
        player_pair = _is_pair(player_cards)

        player_blackjack = _is_blackjack(player_cards)
        dealer_blackjack = _is_blackjack([dealer_up, dealer_hole])

        trivial = (
            player_blackjack or
            dealer_blackjack or
            (player_total <= 6 and not player_pair) or
            (player_total == 19 and not player_soft and not player_pair)
        )

        if not trivial:
            break

    # build dealer cards payload by mode
    if hole_mode == 'perfect':
        dealer_cards = [
            {'suit': dealer_up['suit'],   'rank': _to_frontend_rank(dealer_up['rank'])},
            {'suit': dealer_hole['suit'], 'rank': _to_frontend_rank(dealer_hole['rank'])},
        ]
    elif hole_mode == '2-3':
        dealer_cards = [
            {'suit': dealer_up['suit'], 'rank': _to_frontend_rank(dealer_up['rank'])},
            {'hole_bucket': '2-3'}
        ]
    elif hole_mode == '4-10':
        dealer_cards = [
            {'suit': dealer_up['suit'], 'rank': _to_frontend_rank(dealer_up['rank'])},
            {'hole_bucket': '4-10'}
        ]
    elif hole_mode == 'A-9DAS':
        dealer_cards = [
            {'suit': dealer_up['suit'], 'rank': _to_frontend_rank(dealer_up['rank'])},
            {'hole_bucket': 'A-9DAS'}
        ]
    elif hole_mode == 'A-9NoDAS':
        dealer_cards = [
            {'suit': dealer_up['suit'], 'rank': _to_frontend_rank(dealer_up['rank'])},
            {'hole_bucket': 'A-9NoDAS'}
        ]
    else:
        dealer_cards = [
            {'suit': dealer_up['suit'], 'rank': _to_frontend_rank(dealer_up['rank'])},
            {'hole_bucket': None}
        ]

    # normalize player ranks for frontend
    player_cards_out = [
        {'suit': player_cards[0]['suit'], 'rank': _to_frontend_rank(player_cards[0]['rank'])},
        {'suit': player_cards[1]['suit'], 'rank': _to_frontend_rank(player_cards[1]['rank'])},
    ]

    return jsonify({
        'player_cards': player_cards_out,
        'dealer_cards': dealer_cards,
        'settings': {
            'hole_mode':         hole_mode,
            'surrender_allowed': surrender_allowed,
            'soft17_hit':        soft17_hit,
            'decks_count':       decks_count,
            'double_first_two':  double_first_two
        }
    })
