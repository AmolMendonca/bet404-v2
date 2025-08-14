# backend/routes/settings.py

from flask import Blueprint, request, jsonify, g
from auth import require_user
from models import get_db

settings_bp = Blueprint('settings', __name__)

# =============================================================================
# POST /api/settings_update
#
# Expect EXACT JSON (frontend must send these exact strings/values):
# {
#   "Hole Card": "perfect" | "4-10" | "2-3" | "A-9DAS" | "A-9NoDAS",
#   "Surrender": "Yes" | "No",
#   "Dealer_soft_17": "Hit" | "Stand",
#   "Decks": 1 | 4 | 5 | 6,
#   "Double allowed": "any" | "9-11" | "10-11"
# }
#
# Response (200 OK):
# {
#   "ok": true,
#   "settings": {
#     "user_id": "test_user1",
#     "hole_card": "4-10",
#     "surrender_allowed": true,
#     "soft17_hit": false,
#     "decks_count": 6,
#     "double_first_two": "any"
#   }
# }
#
# Notes:
# - This does a plain UPDATE (no UPSERT). We assume a row exists for the user.
# - User is hardcoded to test_user1 for now (TODO: replace with real auth).
# =============================================================================
@settings_bp.route('/settings_update', methods=['POST'])
@require_user
def settings_update():
    db, cur = get_db()

    data = request.get_json(force=True) or {}
    user_id = g.user['id']
    print(f"User id is {user_id} for settings edit")
    # TODO: replace with the authenticated user
    #user_id = "test_user1"

    hole_card       = data.get("Hole Card")            # exact string
    surrender_str   = data.get("Surrender")            # "Yes" | "No"
    s17_str         = data.get("Dealer_soft_17")       # "Hit" | "Stand"
    decks_count     = data.get("Decks")                # int (1,4,5,6)
    double_first_two= data.get("Double allowed")       # "any" | "9-11" | "10-11"

    # Minimal conversion to DB types
    surrender_allowed = True if surrender_str == "Yes" else False
    soft17_hit        = True if s17_str == "Hit" else False

    # Run the simple UPDATE
    cur.execute("""
        UPDATE user_settings
           SET hole_card = %s,
               surrender_allowed = %s,
               soft17_hit = %s,
               decks_count = %s,
               double_first_two = %s
         WHERE user_id = %s
    """, (hole_card, surrender_allowed, soft17_hit, decks_count, double_first_two, user_id))

    if cur.rowcount == 0:
        # No row existed for this user
        return jsonify({"ok": False, "error": "user_settings row not found for user"}), 404

    db.commit()

    return jsonify({
        "ok": True,
        "settings": {
            "user_id": user_id,
            "hole_card": hole_card,
            "surrender_allowed": surrender_allowed,
            "soft17_hit": soft17_hit,
            "decks_count": int(decks_count),
            "double_first_two": double_first_two
        }
    }), 200
