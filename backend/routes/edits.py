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
import re

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

PERFECT_MODES = {"perfect", "Spanish_perfect"}

# ---------- validators ----------

# hit_until_*  (supports single N or dual "N/M")
_NUM_12_20 = re.compile(r"^(1[2-9]|20)$")
_NUMNUM_12_20 = re.compile(r"^(1[2-9]|20)/(1[2-9]|20)$")  # allow slash variant too

def _valid_hit_value(s: str) -> bool:
    """Accept a single number 12..20 OR N/M both 12..20 (to support H17/S17 variants)."""
    if not s:
        return False
    s = s.strip()
    return bool(_NUM_12_20.fullmatch(s) or _NUMNUM_12_20.fullmatch(s))

# --- double-* validators (flexible, slash-aware) ---

def _valid_int_or_range(token: str, lo: int, hi: int) -> bool:
    """
    Accepts a single int within [lo,hi] or a range 'x-y' with lo <= x <= y <= hi.
    """
    t = (token or "").strip()
    if "-" in t:
        a, b = t.split("-", 1)
        if not (a.isdigit() and b.isdigit()):
            return False
        a, b = int(a), int(b)
        return lo <= a <= b <= hi
    return t.isdigit() and lo <= int(t) <= hi

def _parse_soft_rank_token(ax: str):
    """
    ax: 'A2'..'A9', 'AT' or 'A10'  -> returns int 2..10, or None if invalid.
    """
    if not ax:
        return None
    s = ax.strip().upper()
    if not s.startswith("A"):
        return None
    tail = s[1:]
    if tail == "T" or tail == "10":
        return 10
    if tail.isdigit():
        n = int(tail)
        return n if 2 <= n <= 9 else None
    return None

def _valid_soft_token(tok: str) -> bool:
    """
    One side of double_softs can be:
      - 'NONE'
      - 'AX'              (A2..A9, AT/A10)
      - 'AX-AY'           (2 <= X <= Y <= 10)
    """
    if tok is None:
        return False
    t = tok.strip().upper()
    if t == "NONE":
        return True
    if "-" in t:
        # range form
        left, right = t.split("-", 1)
        if not (left.startswith("A") and right.startswith("A")):
            return False
        x = _parse_soft_rank_token(left)
        y = _parse_soft_rank_token(right)
        return (x is not None) and (y is not None) and (x <= y)
    # single AX
    if t.startswith("A"):
        return _parse_soft_rank_token(t) is not None
    return False

def _valid_double_hards(s: str) -> bool:
    """
    Accept:
      - single int or range: '9-11' or '11'
      - slash form mixing range/int on each side: '10-11/11', '9/10-11', '11/11'
    """
    if not s:
        return False
    s = s.strip().upper()
    if "/" in s:
        left, right = s.split("/", 1)
        return _valid_int_or_range(left, 2, 11) and _valid_int_or_range(right, 2, 11)
    return _valid_int_or_range(s, 2, 11)

def _valid_double_softs(s: str) -> bool:
    """
    Accept:
      - single: 'AX' or 'AX-AY' (A2..A9, AT/A10)
      - slash form: '<token>/<token>' where each token is:
            'NONE' | 'AX' | 'AX-AY'
        Examples: 'A3-A8', 'A7', 'A3-A4/A2-A9', 'A7/A7', 'A7/NONE', 'NONE/A8', 'NONE/NONE', 'A2-AT'
    """
    if not s:
        return False
    t = s.strip().upper()
    if "/" in t:
        left, right = t.split("/", 1)
        return _valid_soft_token(left) and _valid_soft_token(right)
    return _valid_soft_token(t)

# splits (ascending, optional slash)
SPLIT_ORDER = {ch: i for i, ch in enumerate(list("A23456789T"), start=1)}
_SPLIT_TOKEN = re.compile(r"^[A23456789T]+$")

def _is_strictly_ascending(token: str) -> bool:
    """All chars in allowed set, no dups, strictly increasing A<2<...<9<T."""
    if not _SPLIT_TOKEN.fullmatch(token):
        return False
    seen = set()
    prev_rank = 0
    for ch in token:
        if ch in seen:
            return False
        seen.add(ch)
        rank = SPLIT_ORDER[ch]
        if rank <= prev_rank:
            return False
        prev_rank = rank
    return True

def _valid_splits(s: str) -> bool:
    """
    A single ascending token like 'A234' or 'A89' OR two tokens with '/' (supporting H17/S17 form).
    """
    if not s:
        return False
    s = s.strip().upper()
    if "/" in s:
        left, right = s.split("/", 1)
        return _is_strictly_ascending(left) and _is_strictly_ascending(right)
    return _is_strictly_ascending(s)

def _norm_dealer_val_for_perfect(v):
    """
    Accept numeric 4..20 (int or str), or 'A2','A3','A4','A5','A6','AA' (case-insensitive).
    """
    if v is None:
        raise ValueError("dealer_val missing")
    s = str(v).strip().upper()
    if s.isdigit():
        n = int(s)
        if 4 <= n <= 20:
            return str(n)
        raise ValueError("dealer_val numeric must be between 4 and 20")
    if s in {"A2", "A3", "A4", "A5", "A6", "AA"}:
        return s
    raise ValueError(f"invalid dealer_val '{v}'")

_ALLOWED_COLS = {"hit_until_hard", "hit_until_soft", "double_hards", "double_softs", "splits"}

def _validate_value(col: str, new_val: str) -> bool:
    if col in ("hit_until_hard", "hit_until_soft"):
        return _valid_hit_value(new_val)
    if col == "double_hards":
        return _valid_double_hards(new_val)
    if col == "double_softs":
        return _valid_double_softs(new_val)
    if col == "splits":
        return _valid_splits(new_val)
    return False

@edits_bp.post("/chart/update_perfect_cell")
@require_user
def update_perfect_cell():
    """
    POST /api/chart/update_perfect_cell — Edit a single PERFECT chart cell (perfect or Spanish_perfect).

    Request JSON:
    {
      "mode": "perfect" | "Spanish_perfect",
      "dealer_val": "20".."4" | "A2"|"A3"|"A4"|"A5"|"A6"|"AA",
      "col": "hit_until_hard" | "hit_until_soft" | "double_hards" | "double_softs" | "splits",
      "new_val": "<validated string per column rules>"
    }

    Rules:
      - hit_until_*:           a number 12..20, OR "N/M" with both 12..20
      - double_hards:          int or "x-y" in 2..11, or slash form mixing both (e.g., "10-11/11")
      - double_softs:          'AX' or 'AX-AY' (A2..A9, AT/A10), or slash form mixing tokens;
                               each side can also be 'NONE' (e.g., "A7/NONE", "NONE/NONE")
      - splits:                ascending token like "A234" or "A89" (or "token/token" for dual-rule)
      - Surrender fields (late_surrender_* / forfeits) are NOT editable here.

    Success:
    {
      "ok": true,
      "mode": "...",
      "chart_id": 97,
      "dealer_val": "A6",
      "col": "double_hards",
      "old_val": "10-11",
      "new_val": "9-11",
      "changed": true
    }

    Special:
      - You can clear a cell by sending new_val as "None", "NULL", or "" (stores SQL NULL).
    """
    data = request.get_json(silent=True) or {}

    mode = (data.get("mode") or "").strip()
    if mode not in PERFECT_MODES:
        return jsonify({"ok": False, "error": "invalid or missing mode (perfect | Spanish_perfect)"}), 400

    try:
        dealer_val = _norm_dealer_val_for_perfect(data.get("dealer_val"))
    except ValueError as e:
        return jsonify({"ok": False, "error": str(e)}), 400

    col = (data.get("col") or "").strip()
    if col not in _ALLOWED_COLS:
        return jsonify({"ok": False, "error": f"invalid or disallowed column '{col}'"}), 400

    raw_new = (data.get("new_val") or "")
    new_upper = raw_new.strip().upper()

    # Treat "None"/"NULL"/"" as a request to set SQL NULL
    set_null = (new_upper in ("NONE", "NULL", ""))

    # Only validate when not clearing
    if not set_null and not _validate_value(col, new_upper):
        return jsonify({"ok": False, "error": f"new_val invalid for column '{col}'"}), 400

    db, cur = get_db()
    user_id = g.user["id"]

    # Find user's perfect chart_id for this mode
    cur.execute("""
        SELECT chart_id
        FROM charts
        WHERE user_id = %s AND mode = %s
        ORDER BY chart_id DESC
        LIMIT 1;
    """, (user_id, mode))
    row = cur.fetchone()
    if not row:
        return jsonify({"ok": False, "error": f"no {mode} chart found for user"}), 404
    chart_id = row["chart_id"]

    # Fetch existing value
    cur.execute(f"""
        SELECT {col} AS val
        FROM perfect_entries
        WHERE chart_id = %s AND dealer_val = %s
        LIMIT 1;
    """, (chart_id, dealer_val))
    r = cur.fetchone()
    if not r:
        return jsonify({"ok": False, "error": "perfect chart row not found for given dealer_val"}), 404

    old_val = r["val"]  # may be None
    old_norm_up = ((old_val or "").strip().upper())

    value_to_store = None if set_null else new_upper
    changed = ((old_val is not None) if set_null else (old_norm_up != new_upper))

    if changed:
        cur.execute(f"""
            UPDATE perfect_entries
            SET {col} = %s
            WHERE chart_id = %s AND dealer_val = %s
        """, (value_to_store, chart_id, dealer_val))
        db.commit()

    return jsonify({
        "ok": True,
        "mode": mode,
        "chart_id": chart_id,
        "dealer_val": dealer_val,
        "col": col,
        "old_val": old_val,
        "new_val": (None if set_null else new_upper),
        "changed": changed
    }), 200
