from flask import jsonify, Blueprint
import os

import random
from flask import Blueprint, jsonify

dealing_bp = Blueprint('dealing', __name__)

@dealing_bp.route('/deal_newhand', methods=['GET'])
def deal_newhand():
    hole_mode        = 'perfect'    # or '4-10', '2-3'
    surrender_allowed = True
    soft17_hit        = False
    decks_count       = 6
    double_first_two  = 'any'       # or '10-11', '9-11'

    suits = ['hearts','diamonds','clubs','spades']
    ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
    shoe = [{'suit': s, 'rank': r} for s in suits for r in ranks] * decks_count
    random.shuffle(shoe)

    player_cards = [shoe.pop(), shoe.pop()]
    dealer_up    = shoe.pop()
    dealer_hole  = shoe.pop()

    if hole_mode == 'perfect':
        dealer_cards = [dealer_up, dealer_hole]
    elif hole_mode == '2-3':
        dealer_cards = [dealer_up, {'hole_bucket': '2-3'}]
    elif hole_mode == '4-10':
        dealer_cards = [dealer_up, {'hole_bucket': '4-10'}]
    else:
        dealer_cards = [dealer_up, {'hole_bucket': None}]

    return jsonify({
        'player_cards': player_cards,
        'dealer_cards': dealer_cards,
        'settings': {
            'hole_mode':         hole_mode,
            'surrender_allowed': surrender_allowed,
            'soft17_hit':        soft17_hit,
            'decks_count':       decks_count,
            'double_first_two':  double_first_two
        }
    })
