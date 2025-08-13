import random

RANK_TO_VAL = {
    'A': 11, 'K': 10, 'Q': 10, 'J': 10, 'T': 10,
    '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
}
TEN_SET = {'T', 'J', 'Q', 'K'}


def _is_pair(cards):
    """
    V1 rule: treat exact same rank as a pair, AND treat any two 10-valued
    cards (T/J/Q/K) as the TT pair. Returns (is_pair, pair_rank_or_None).
    For 10-valued pairs, pair_rank is 'T' so _pair_code('T') -> 20.
    """
    if len(cards) != 2:
        return False, None

    r1, r2 = cards[0]['rank'], cards[1]['rank']
    if r1 == r2:
        return True, r1

    tens = {'T', 'J', 'Q', 'K'}
    if r1 in tens and r2 in tens:
        return True, 'T'   # normalize all 10-value pairs to 'T' -> player_val 20

    return False, None


def _hand_total_and_soft(cards):
    """
    Two-card hands only (V1).
    total: sum of face values (A=11, T/J/Q/K=10).
    soft: True iff there's exactly one Ace in the two cards.
    """
    v1 = RANK_TO_VAL[cards[0]['rank']]
    v2 = RANK_TO_VAL[cards[1]['rank']]
    total = v1 + v2

    r1, r2 = cards[0]['rank'], cards[1]['rank']
    soft = ((r1 == 'A') ^ (r2 == 'A'))  # exactly one Ace

    return total, soft


def _dealer_val_for_4to10(dealer_up):
    """Normalize dealer upcard to '2'..'10' or 'A' for chart lookup."""
    r = dealer_up['rank']
    if r == 'A':
        return 'A'
    if r in ('T', 'J', 'Q', 'K'):
        return '10'
    return r  # '2'..'9'

def _pair_code(rank):
    """Translate a pair rank into chart's player_val code."""
    if rank == 'A':
        return 22         # AA
    if rank in ('T','J','Q','K'):
        return 20         # TT
    return int(rank) * 11 # 22,33,...,99


def _is_blackjack(cards):
    """Two-card blackjack: one Ace + one 10-value."""
    if len(cards) != 2: return False
    r1, r2 = cards[0]['rank'], cards[1]['rank']
    return (r1 == 'A' and r2 in TEN_SET) or (r2 == 'A' and r1 in TEN_SET)

def _make_shoe(decks):
    suits = ['hearts','diamonds','clubs','spades']
    ranks = ['A','2','3','4','5','6','7','8','9','T','J','Q','K']  # use 'T' for ten internally
    shoe = [{'suit': s, 'rank': r} for s in suits for r in ranks] * decks
    random.shuffle(shoe)
    return shoe

def _to_frontend_rank(r):
    """Convert internal 'T' back to '10' for responses."""
    return '10' if r == 'T' else r
