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

from flask import Blueprint, request, jsonify, g
from auth import require_user
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
        return 12         # AA
    if rank in ('T','J','Q','K'):
        return 20         # TT
    return int(rank) * 11 # 22,33,...,99



def _resolve_cell(reco_cell, soft17_hit, surrender_allowed, double_allowed):
    """
    Resolve a chart cell to a concrete single-letter action for V1.

    Inputs:
      reco_cell (str): e.g. 'H','S','D','P','R','DS','DH','DP','RH','RS','RH/H','15/16', etc.
      soft17_hit (bool): True = H17 rules, False = S17
      surrender_allowed (bool): can surrender in this game
      double_allowed (bool): can double on this first decision (per settings + first two cards)

    Returns: one of 'H','S','D','P','R'
    """
    cell = (reco_cell or '').strip().upper()

    # Handle H17/S17 split like 'RH/H' or '15/16' (we only care about the left/right token)
    if '/' in cell:
        left, right = cell.split('/', 1)
        cell = left if soft17_hit else right
        cell = cell.strip().upper()

    # Macros that depend on doubling/surrender availability
    if cell == 'DS':               # Double if allowed else Stand
        return 'D' if double_allowed else 'S'
    if cell == 'DH':               # Double if allowed else Hit
        return 'D' if double_allowed else 'H'
    if cell == 'DP':               # Double if allowed else Split (rare, but support it)
        return 'D' if double_allowed else 'P'
    if cell == 'RH':               # Surrender if allowed else Hit
        return 'R' if surrender_allowed else 'H'
    if cell == 'RS':               # Surrender if allowed else Stand
        return 'R' if surrender_allowed else 'S'
    if cell == 'RP':
        return 'R' if surrender_allowed else 'P'

    # Plain directives
    if cell in ('H', 'S', 'P', 'R', 'D'):
        if cell == 'R' and not surrender_allowed:
            return 'H'
        if cell == 'D' and not double_allowed:
            # Conservative fallback when a plain 'D' is present but doubling disallowed
            return 'H'
        return cell

    # Unknown/complex text => safe default
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
@require_user
def grade():
    db, cur = get_db()

    data = request.get_json(force=True) or {}

    # User (TODO: swap to auth/JWT later)
    # user_id = data.get('user_id') or 'test_user1'
    user_id = g.user['id']
    # user_id = 'test_user1'

    # Pull user settings (surrender + H17/S17 matter in V1)
    cur.execute("""
        SELECT hole_card, surrender_allowed, soft17_hit, double_first_two 
        FROM user_settings
        WHERE user_id = %s
    """, (user_id,))
    s = cur.fetchone()

    # Mode: DB takes precedence; otherwise payload fallback
    hole_mode = (s['hole_card'] if s else None) or data.get('hole_mode') or '4-10'
    # REMOVE this buggy overwrite line:
    # hole_mode = data.get('hole_mode')

    surrender_allowed = bool(s['surrender_allowed']) if s else True
    soft17_hit        = bool(s['soft17_hit'])        if s else False
    double_first_two  = (s['double_first_two'] if s else None) or 'any'

    player_cards = data.get('player_cards', [])
    dealer_up    = data.get('dealer_up', {})
    attempted    = (data.get('action') or '').upper().strip()

    if hole_mode in ('4-10', '2-3', 'A-9DAS', 'A-9NoDAS'):
        result = _grade_4to10(
            user_id,
            player_cards,
            dealer_up,
            attempted,
            surrender_allowed,
            soft17_hit,
            double_first_two,
            hole_mode,   # pass the actual mode
            cur
        )
    elif hole_mode == 'perfect':
        return jsonify({"todo": "perfect grading not implemented yet"}), 501
    else:
        return jsonify({"error": f"Unknown hole_mode '{hole_mode}'"}), 400

    # TODO: persist stats in user_stats here (increment totals/errors) in a tx.

    if isinstance(result, dict) and "mode" in result and "is_correct" in result:
        m = result["mode"]
        is_correct = bool(result["is_correct"])
        err_inc = 0 if is_correct else 1

        if m == "4-10":
            cur.execute("""
                UPDATE user_stats
                SET total_4to10_hands  = total_4to10_hands  + 1,
                    errors_4to10_hands = errors_4to10_hands + %s
                WHERE user_id = %s
            """, (err_inc, user_id))

        elif m == "2-3":
            cur.execute("""
                UPDATE user_stats
                SET total_2to3_hands  = total_2to3_hands  + 1,
                    errors_2to3_hands = errors_2to3_hands + %s
                WHERE user_id = %s
            """, (err_inc, user_id))

        elif m == "A-9DAS":
            cur.execute("""
                UPDATE user_stats
                SET total_a9das_hands  = total_a9das_hands  + 1,
                    errors_a9das_hands = errors_a9das_hands + %s
                WHERE user_id = %s
            """, (err_inc, user_id))

        elif m == "A-9NoDAS":
            cur.execute("""
                UPDATE user_stats
                SET total_a9nodas_hands  = total_a9nodas_hands  + 1,
                    errors_a9nodas_hands = errors_a9nodas_hands + %s
                WHERE user_id = %s
            """, (err_inc, user_id))

        elif m == "perfect":
            cur.execute("""
                UPDATE user_stats
                SET total_perfect_hands   = total_perfect_hands   + 1,
                    errors_perfect_hands  = errors_perfect_hands  + %s
                WHERE user_id = %s
            """, (err_inc, user_id))

        db.commit()
    return jsonify(result)

# -------------------------
# 4-10 grading core (V1)
# -------------------------

def _grade_4to10(user_id, player_cards, dealer_up, attempted,
                 surrender_allowed, soft17_hit, double_first_two, mode, cur):
    """
    V1: first decision only; 2-card hands only; double availability handled on frontend.
    """
    # Find user's 4-10 chart
    print(f"The hole mode here is {mode}")
    cur.execute("""
        SELECT chart_id FROM charts
        WHERE user_id = %s AND mode = %s
        LIMIT 1
    """, (user_id, mode))
    row = cur.fetchone()
    if not row:
        return {"error": "4-10 chart not found for user"}, 404
    chart_id = row['chart_id']
    print(f"Chart that we're pulling from here is {chart_id}")

   

    # Derive hand state
    pair, pair_rank = _is_pair(player_cards)
    total, soft = _hand_total_and_soft(player_cards)
    dealer_val = _dealer_val_for_4to10(dealer_up)

    setting = (double_first_two or '').lower()
    if setting == 'any':
        double_allowed = True
    elif setting in ('9-10', '9to10'):
        double_allowed = total in (9, 10)
    elif setting in ('10-11', '10to11'):
        double_allowed = total in (10, 11)
    elif setting in ('9-11', '9to11'):
        double_allowed = total in (9, 10, 11)
    else:
        # Unknown/empty => safest default is False
        double_allowed = False

    # If frontend accidentally sends trivial 19+ non-pair, stand
    if total >= 19 and not pair:
        resolved = 'S'
        return _result_payload(
            mode, attempted, resolved,
            meta={
                "reason": "auto-stand on 19+ (non-pair)",
                "dealer_val": dealer_val,
                "total": total,
                "soft": soft
            }
        )

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
        fallback = 'H' if total < 17 else 'S'
        return _result_payload(
            mode, attempted, fallback,
            meta={
                "reason": "no chart cell found",
                "dealer_val": dealer_val,
                "total": total,
                "soft": soft,
                "pair": pair
            }
        )

    reco_cell = cell['recommended_move']
    resolved = _resolve_cell(reco_cell, soft17_hit, surrender_allowed, double_allowed)
    is_correct = (attempted == resolved)

    return _result_payload(
        mode, attempted, resolved, is_correct,
        meta={
            "dealer_val": dealer_val,
            "total": total,
            "soft": soft,
            "pair": pair,
            "reco_cell_raw": reco_cell,
            "soft17_hit": soft17_hit,
            "surrender_allowed": surrender_allowed,
            "double_first_two": setting,
            "double_allowed": double_allowed
        }
    )
