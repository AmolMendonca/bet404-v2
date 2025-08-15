# backend/routes/edits.py
"""
POST /api/chart/update_cell — Edit a single NON-PERFECT chart cell for the logged-in user.

Auth:
  Uses Supabase access token via @require_user (g.user['id'])

Accepted modes (non-perfect only):
  "4-10", "2-3", "A-9DAS", "A-9NoDAS", "Spanish_4to9", "Spanish_2to3"

Request JSON:
{
  "mode": "4-10" | "2-3" | "A-9DAS" | "A-9NoDAS" | "Spanish_4to9" | "Spanish_2to3",
  "dealer_val": "2"|"3"|...|"10"|"A",           # "T" also accepted (normalized to "10")
  "player_val": 8..18 | 13..19 | 20 | 22..99 | 12 (AA with pair=true),
  "player_pair": true|false,                    # true for pairs (22,33,...,99, 20 (TT), 12 (AA))
  "player_hand_type": "hard" | "soft",          # required when player_pair=false; ignored for pairs
  "new_move": one of ALLOWED_MOVES (see below)
}

ALLOWED_MOVES:
  Basic:        H, S, D, P, R
  Macros:       DS, DH, DP, RH, RS, RP
  Split tokens: RH/H, RS/H, S/H, H/S, D/H, P/H, P/S, H/P
  Extras used:  PRH, RPH

Success response:
{
  "ok": true,
  "mode": "...",
  "chart_id": 123,
  "entry_id": 456,
  "dealer_val": "6",
  "player_val": 12,
  "player_pair": false,
  "player_hand_type": "hard",
  "old_move": "H",
  "new_move": "S",
  "changed": true
}

Errors: 400 (bad input), 404 (chart/entry not found)
"""

from flask import Blueprint, request, jsonify, g
from auth import require_user
from models import get_db

edits_bp = Blueprint("edits", __name__)

NON_PERFECT_MODES = {
    "4-10", "2-3", "A-9DAS", "A-9NoDAS",
    "Spanish_4to9", "Spanish_2to3"
}

ALLOWED_MOVES = {
    # simple
    "H", "S", "D", "P", "R",
    # macros
    "DS", "DH", "DP", "RH", "RS", "RP",
    # split H17/S17 style or composite tokens seen in seeds
    "RH/H", "RS/H", "S/H", "H/S", "D/H", "P/H", "P/S", "H/P",
    # extras you mentioned
    "PRH", "RPH",
}

def _norm_dealer_val(v):
    """
    Accept '2'..'10','A','T' (normalize T -> '10').
    """
    if v is None:
        raise ValueError("dealer_val missing")
    s = str(v).strip().upper()
    if s == "T":
        return "10"
    if s in {"2","3","4","5","6","7","8","9","10","A"}:
        return s
    raise ValueError(f"invalid dealer_val '{v}'")

@edits_bp.post("/chart/update_cell")
@require_user
def update_chart_cell():
    data = request.get_json(silent=True) or {}

    mode = data.get("mode")
    if mode not in NON_PERFECT_MODES:
        return jsonify({"ok": False, "error": "invalid or missing mode"}), 400

    try:
        dealer_val = _norm_dealer_val(data.get("dealer_val"))
    except ValueError as e:
        return jsonify({"ok": False, "error": str(e)}), 400

    try:
        player_val = int(data.get("player_val"))
    except Exception:
        return jsonify({"ok": False, "error": "invalid or missing player_val (int expected)"}), 400

    player_pair = bool(data.get("player_pair"))
    player_hand_type = data.get("player_hand_type")
    if not player_pair:
        if player_hand_type not in ("hard", "soft"):
            return jsonify({"ok": False, "error": "player_hand_type must be 'hard' or 'soft' for non-pair rows"}), 400
    else:
        # intentionally ignore hand type for pairs (AA uses player_val=12 + pair=true)
        player_hand_type = None

    new_move = (data.get("new_move") or "").strip().upper()
    if new_move not in ALLOWED_MOVES:
        return jsonify({"ok": False, "error": f"new_move '{new_move}' not allowed"}), 400

    db, cur = get_db()
    user_id = g.user["id"]

    # find user's chart_id for this mode
    cur.execute("""
        SELECT chart_id FROM charts
        WHERE user_id = %s AND mode = %s
        ORDER BY chart_id DESC
        LIMIT 1;
    """, (user_id, mode))
    row = cur.fetchone()
    if not row:
        return jsonify({"ok": False, "error": f"no chart found for mode {mode}"}), 404
    chart_id = row["chart_id"]

    # locate target entry
    if player_pair:
        cur.execute("""
            SELECT entry_id, recommended_move
            FROM chart_entries
            WHERE chart_id = %s
              AND dealer_val = %s
              AND player_val = %s
              AND player_pair = TRUE
            LIMIT 1;
        """, (chart_id, dealer_val, player_val))
    else:
        cur.execute("""
            SELECT entry_id, recommended_move
            FROM chart_entries
            WHERE chart_id = %s
              AND dealer_val = %s
              AND player_val = %s
              AND player_pair = FALSE
              AND player_hand_type = %s
            LIMIT 1;
        """, (chart_id, dealer_val, player_val, player_hand_type))

    entry = cur.fetchone()
    if not entry:
        return jsonify({"ok": False, "error": "chart cell not found for provided coordinates"}), 404

    entry_id = entry["entry_id"]
    old_move = (entry["recommended_move"] or "").strip().upper()

    changed = (old_move != new_move)
    if changed:
        cur.execute("""
            UPDATE chart_entries
            SET recommended_move = %s
            WHERE entry_id = %s
        """, (new_move, entry_id))
        db.commit()

    return jsonify({
        "ok": True,
        "mode": mode,
        "chart_id": chart_id,
        "entry_id": entry_id,
        "dealer_val": dealer_val,
        "player_val": player_val,
        "player_pair": player_pair,
        "player_hand_type": player_hand_type,
        "old_move": old_move,
        "new_move": new_move,
        "changed": changed
    }), 200
