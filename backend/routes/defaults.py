# routes/new_user_routes.py
from flask import Blueprint, jsonify, g, request
from auth import require_user
from models import get_db

new_user_bp = Blueprint("new_user", __name__)

TEST_USER = "test_user1"
VALID_MODES = {"4-10", "2-3", "perfect", "A-9DAS", "A-9NoDAS"}


@new_user_bp.post("/new_user")
@require_user
def new_user():
    db, cur = get_db()
    uid = g.user["id"]
    email = g.user["email"]

    # uid = '61832595-68fa-4146-b7ea-7d55df00a3df'
    # email = 'pritesh82tobayern@gmail.com'

    try:
        # 1) users row (hardcoded password)
        cur.execute("""
            INSERT INTO users (user_id, email, password, created_at)
            VALUES (%s, %s, %s, NOW())
            ON CONFLICT (user_id) DO NOTHING;
        """, (uid, email, "hashed_pw_12345"))

        # 2) user_settings cloned from test_user1
        cur.execute("""
            INSERT INTO user_settings (user_id, hole_card, surrender_allowed, soft17_hit, decks_count, double_first_two)
            SELECT %s, hole_card, surrender_allowed, soft17_hit, decks_count, double_first_two
            FROM user_settings
            WHERE user_id = %s
            ON CONFLICT (user_id) DO NOTHING;
        """, (uid, TEST_USER))

        # 3) zeroed user_stats row
        cur.execute("""
            INSERT INTO user_stats (user_id)
            VALUES (%s)
            ON CONFLICT (user_id) DO NOTHING;
        """, (uid,))

        # 4) allocate five new chart IDs (max+1..+5), insert charts
        cur.execute("SELECT COALESCE(MAX(chart_id), 0) FROM charts;")
        max_id = cur.fetchone()[0] or 0

        order = [("4-10", max_id + 1),
                 ("2-3",  max_id + 2),
                 ("perfect", max_id + 3),
                 ("A-9DAS", max_id + 4),
                 ("A-9NoDAS", max_id + 5)]

        for mode, cid in order:
            cur.execute("""
                INSERT INTO charts (chart_id, user_id, mode)
                VALUES (%s, %s, %s);
            """, (cid, uid, mode))

        # keep the charts sequence aligned with manual inserts (important if SERIAL)
        cur.execute("""
            SELECT setval(pg_get_serial_sequence('charts','chart_id'),
                          (SELECT MAX(chart_id) FROM charts));
        """)

        # helper to copy entries from test_user1’s chart for a given mode
        def copy_mode(mode: str, dest_chart_id: int):
            # source chart id (test_user1)
            cur.execute("""
                SELECT chart_id FROM charts
                WHERE user_id = %s AND mode = %s
                ORDER BY chart_id DESC LIMIT 1;
            """, (TEST_USER, mode))
            row = cur.fetchone()
            if not row:
                raise RuntimeError(f"Missing source chart for {mode} on {TEST_USER}")
            src_chart_id = row[0]

            # clone chart_entries (no entry_id)
            cur.execute("""
                INSERT INTO chart_entries
                    (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move)
                SELECT %s, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move
                FROM chart_entries
                WHERE chart_id = %s;
            """, (dest_chart_id, src_chart_id))

            # clone perfect_entries only for the perfect chart
            if mode == "perfect":
                cur.execute("""
                    INSERT INTO perfect_entries
                        (chart_id, dealer_val, hit_until_hard, hit_until_soft,
                         double_hards, double_softs, splits,
                         late_surrender_hards, late_surrender_softs, forfeits)
                    SELECT %s, dealer_val, hit_until_hard, hit_until_soft,
                           double_hards, double_softs, splits,
                           late_surrender_hards, late_surrender_softs, forfeits
                    FROM perfect_entries
                    WHERE chart_id = %s;
                """, (dest_chart_id, src_chart_id))

        # 5) copy entries for all five modes
        for mode, cid in order:
            copy_mode(mode, cid)

        db.commit()
        return jsonify({
            "ok": True,
            "user_id": uid,
            "email": email,
            "charts": {mode: cid for mode, cid in order}
        }), 201

    except Exception as e:
        db.rollback()
        return jsonify({"ok": False, "error": str(e)}), 500


@new_user_bp.post("/reset_entries_default")
#@require_user
def reset_entries_default():
    """
    Reset the logged-in user's chart entries for a specific mode back to the defaults
    copied from test_user1.

    Request JSON:
      {
        "mode": "4-10" | "2-3" | "perfect" | "A-9DAS" | "A-9NoDAS"
      }

    Response JSON on success:
      {
        "ok": true,
        "mode": "<mode>",
        "chart_id": <int>,
        "rows": { "deleted": <int>, "inserted": <int> }
      }
    """
    data = request.get_json(silent=True) or {}
    mode = data.get("mode")

    if mode not in VALID_MODES:
        return jsonify({"ok": False, "error": "invalid or missing mode"}), 400

    db, cur = get_db()
    # user_id = g.user["id"]
    user_id = '61832595-68fa-4146-b7ea-7d55df00a3df'

    # Find destination (caller) chart_id
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
    dest_chart_id = row["chart_id"]

    # Find source (test_user1) chart_id
    cur.execute("""
        SELECT chart_id
        FROM charts
        WHERE user_id = %s AND mode = %s
        ORDER BY chart_id DESC
        LIMIT 1;
    """, (TEST_USER, mode))
    row = cur.fetchone()
    if not row:
        return jsonify({"ok": False, "error": f"no {mode} chart found for {TEST_USER} (defaults missing)"}), 500
    src_chart_id = row["chart_id"]

    try:
        if mode == "perfect":
            # wipe destination perfect entries
            cur.execute("DELETE FROM perfect_entries WHERE chart_id = %s;", (dest_chart_id,))
            deleted = cur.rowcount

            # clone from test_user1
            cur.execute("""
                INSERT INTO perfect_entries
                    (chart_id, dealer_val, hit_until_hard, hit_until_soft,
                     double_hards, double_softs, splits,
                     late_surrender_hards, late_surrender_softs, forfeits)
                SELECT %s, dealer_val, hit_until_hard, hit_until_soft,
                       double_hards, double_softs, splits,
                       late_surrender_hards, late_surrender_softs, forfeits
                FROM perfect_entries
                WHERE chart_id = %s;
            """, (dest_chart_id, src_chart_id))
            inserted = cur.rowcount
        else:
            # wipe destination standard entries
            cur.execute("DELETE FROM chart_entries WHERE chart_id = %s;", (dest_chart_id,))
            deleted = cur.rowcount

            # clone from test_user1
            cur.execute("""
                INSERT INTO chart_entries
                    (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move)
                SELECT %s, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move
                FROM chart_entries
                WHERE chart_id = %s;
            """, (dest_chart_id, src_chart_id))
            inserted = cur.rowcount

        db.commit()
        return jsonify({
            "ok": True,
            "mode": mode,
            "chart_id": dest_chart_id,
            "rows": {"deleted": deleted, "inserted": inserted}
        }), 200

    except Exception as e:
        db.rollback()
        return jsonify({"ok": False, "error": str(e)}), 500