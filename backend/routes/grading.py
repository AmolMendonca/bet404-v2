# backend/routes/grading.py
"""
V1 grading: First-decision only, 2-card hands only, doubles already gated by frontend.
We grade 4-10 mode now; 2-3 and perfect return 501 TODO stubs.

Request JSON (example):
{
  "user_id": "test_user1",                # TODO: later from session/JWT
  "hole_mode": "4-10",                    # optional; settings override if present in DB
  "player_cards": [{"rank":"A","suit":"hearts"},{"rank":"6","suit":"clubs"}],
  "dealer_up": {"rank":"6","suit":"spades"},
  "action": "D"                           # 'H'|'S'|'D'|'P'|'RS' (frontend constrains availability)
}

Response JSON:
{
  "mode": "4-10",
  "attempted": "D",
  "correct_move": "D",
  "is_correct": true,
  "meta": {...debug info...}
}
"""

from flask import Blueprint, request, jsonify
from models import get_db

grading_bp = Blueprint('grading', __name__)

# -------------------------
# Helpers
# -------------------------

RANK_TO_VAL = {
    'A': 11, 'K': 10, 'Q': 10, 'J': 10, 'T': 10,
    '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
}

def _is_pair(cards):
    """Exactly two cards in V1: return (is_pair, rank_if_pair_or_None)."""
    if len(cards) != 2:
        return False, None
    r1, r2 = cards[0]['rank'], cards[1]['rank']
    return (r1 == r2), r1

def _hand_total_and_soft(cards):
    """Compute total and whether the 2-card hand is soft (Ace counted as 11)."""
    v1 = RANK_TO_VAL[cards[0]['rank']]
    v2 = RANK_TO_VAL[cards[1]['rank']]
    total = v1 + v2
    aces = (1 if cards[0]['rank'] == 'A' else 0) + (1 if cards[1]['rank'] == 'A' else 0)
    # Reduce Aces if bust
    while total > 21 and aces:
        total -= 10
        aces -= 1
    # Soft if any Ace still effectively 11
    soft = any(c['rank'] == 'A' for c in cards) and total <= 21 and (total + 10 <= 21 if total <= 11 else False)
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

def _resolve_cell(reco_cell, soft17_hit, surrender_allowed):
    """
    Resolve a chart cell to a concrete single-letter action for V1.

    Rules:
    - Slash 'X/Y' => pick X if H17 (soft17_hit==True), else Y if S17.
    - DS or DH => 'D' (frontend already hides D when not allowed in V1).
    - RH => 'R' if surrender allowed else 'H'
    - RS => 'R' if surrender allowed else 'S'
    - Plain 'H'|'S'|'D'|'P'|'R' => return; if 'R' but not allowed => fall back to 'H'
    - Unknown => default 'H'
    """
    cell = (reco_cell or '').strip().upper()

    # H17 vs S17 split
    if '/' in cell and len(cell) <= 8:  # e.g., 'RH/H', '15/16', 'A2-A7/A2-A8'
        left, right = cell.split('/', 1)
        cell = left if soft17_hit else right

    # Macros simplified for V1
    if cell == 'DS' or cell == 'DH':
        return 'D'
    if cell == 'RH':
        return 'R' if surrender_allowed else 'H'
    if cell == 'RS':
        return 'R' if surrender_allowed else 'S'

    # Plain moves
    if cell in ('H', 'S', 'D', 'P', 'R'):
        if cell == 'R' and not surrender_allowed:
            return 'H'
        return cell

    # Anything else (ranges, typos, etc.): safe default
    return 'H'

def _result_payload(hole_mode, attempted, resolved, correct=None, meta=None):
    return {
        "mode": hole_mode,
        "attempted": attempted,
        "correct_move": resolved,
        "is_correct": bool(correct) if correct is not None else (attempted == resolved),
        "meta": meta or {}
    }

# -------------------------
# Route
# -------------------------

@grading_bp.route('/grade', methods=['POST'])
def grade():
    db, cur = get_db()

    data = request.get_json(force=True) or {}

    # User (TODO: swap to auth/JWT later)
    user_id = data.get('user_id') or 'test_user1'

    # Pull user settings (surrender + H17/S17 matter in V1)
    cur.execute("""
        SELECT hole_card, surrender_allowed, soft17_hit
        FROM user_settings
        WHERE user_id = %s
    """, (user_id,))
    s = cur.fetchone()

    # Mode: DB takes precedence; otherwise payload fallback
    hole_mode = (s['hole_card'] if s else None) or data.get('hole_mode') or '4-10'
    surrender_allowed = bool(s['surrender_allowed']) if s else True
    soft17_hit        = bool(s['soft17_hit'])        if s else False

    player_cards = data.get('player_cards', [])
    dealer_up    = data.get('dealer_up', {})
    attempted    = (data.get('action') or '').upper().strip()

    if hole_mode == '4-10':
        result = _grade_4to10(user_id, player_cards, dealer_up, attempted,
                              surrender_allowed, soft17_hit, cur)
    elif hole_mode == '2-3':
        return jsonify({"todo": "2-3 grading not implemented yet"}), 501
    elif hole_mode == 'perfect':
        return jsonify({"todo": "perfect grading not implemented yet"}), 501
    else:
        return jsonify({"error": f"Unknown hole_mode '{hole_mode}'"}), 400

    # TODO: persist stats in user_stats here (increment totals/errors) in a tx.
    return jsonify(result)

# -------------------------
# 4-10 grading core (V1)
# -------------------------

def _grade_4to10(user_id, player_cards, dealer_up, attempted,
                 surrender_allowed, soft17_hit, cur):
    """
    V1: first decision only; 2-card hands only; double availability handled on frontend.
    """
    # Find user's 4-10 chart
    cur.execute("""
        SELECT chart_id FROM charts
        WHERE user_id = %s AND mode = '4-10'
        LIMIT 1
    """, (user_id,))
    row = cur.fetchone()
    if not row:
        return {"error": "4-10 chart not found for user"}, 404
    chart_id = row['chart_id']

    # Derive hand state
    pair, pair_rank = _is_pair(player_cards)
    total, soft = _hand_total_and_soft(player_cards)
    dealer_val = _dealer_val_for_4to10(dealer_up)

    # If frontend accidentally sends trivial 19+ non-pair, stand
    if total >= 19 and not pair:
        resolved = 'S'
        return _result_payload('4-10', attempted, resolved,
                               meta={"reason": "auto-stand on 19+ (non-pair)",
                                     "dealer_val": dealer_val,
                                     "total": total, "soft": soft})

    # Pull cell from chart
    if pair:
        player_val = _pair_code(pair_rank)
        cur.execute("""
            SELECT recommended_move
            FROM chart_entries
            WHERE chart_id=%s AND dealer_val=%s AND player_val=%s
                  AND player_pair=TRUE
            LIMIT 1
        """, (chart_id, dealer_val, player_val))
    else:
        player_hand_type = 'soft' if soft else 'hard'
        cur.execute("""
            SELECT recommended_move
            FROM chart_entries
            WHERE chart_id=%s AND dealer_val=%s AND player_val=%s
                  AND player_pair=FALSE AND player_hand_type=%s
            LIMIT 1
        """, (chart_id, dealer_val, total, player_hand_type))

    cell = cur.fetchone()
    if not cell:
        # Safe fallback
        fallback = 'H' if total < 17 else 'S'
        return _result_payload('4-10', attempted, fallback,
                               meta={"reason": "no chart cell found",
                                     "dealer_val": dealer_val, "total": total,
                                     "soft": soft, "pair": pair})

    reco_cell = cell['recommended_move']  # e.g., 'DS', 'RH/H', 'P', 'S'
    resolved = _resolve_cell(reco_cell, soft17_hit, surrender_allowed)
    is_correct = (attempted == resolved)

    return _result_payload(
        '4-10', attempted, resolved, is_correct,
        meta={
            "dealer_val": dealer_val,
            "total": total,
            "soft": soft,
            "pair": pair,
            "reco_cell_raw": reco_cell,
            "soft17_hit": soft17_hit,
            "surrender_allowed": surrender_allowed
        }
    )
 