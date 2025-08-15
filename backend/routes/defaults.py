# routes/new_user_routes.py
from flask import Blueprint, jsonify, g, request
from auth import require_user
from models import get_db

new_user_bp = Blueprint("new_user", __name__)

TEST_USER = "test_user1"
SPANISH_MODES = ("Spanish_4to9", "Spanish_2to3", "Spanish_perfect")
PERFECT_MODES = {'perfect', 'Spanish_perfect'}
VALID_MODES = {
    '4-10','2-3','perfect','A-9DAS','A-9NoDAS',
    'Spanish_4to9','Spanish_2to3','Spanish_perfect'
}



@new_user_bp.post("/new_user")
@require_user
def new_user():
    db, cur = get_db()
    uid = g.user["id"]
    email = g.user["email"]

    BJ_MODES = ["4-10", "2-3", "perfect", "A-9DAS", "A-9NoDAS"]
    SPA_MODES = ["Spanish_4to9", "Spanish_2to3", "Spanish_perfect"]
    PERFECT_MODES = {"perfect", "Spanish_perfect"}

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

        # ---------- ID allocation pools ----------
        # BJ pool: strictly below 15000
        cur.execute("SELECT COALESCE(MAX(chart_id), 0) FROM charts WHERE chart_id < 15000;")
        bj_max = cur.fetchone()[0] or 0

        # Need 5 BJ ids; ensure we don't cross into 15000+
        if bj_max + 5 >= 15000:
            raise RuntimeError("Not enough BJ chart_id space below 15000 to allocate 5 charts.")

        bj_order = [
            ("4-10",    bj_max + 1),
            ("2-3",     bj_max + 2),
            ("perfect", bj_max + 3),
            ("A-9DAS",  bj_max + 4),
            ("A-9NoDAS",bj_max + 5),
        ]

        # Spanish pool: 15000+
        cur.execute("SELECT COALESCE(MAX(chart_id), 14999) FROM charts WHERE chart_id >= 15000;")
        spa_max = cur.fetchone()[0] or 14999

        spa_order = [
            ("Spanish_4to9",   spa_max + 1),
            ("Spanish_2to3",   spa_max + 2),
            ("Spanish_perfect",spa_max + 3),
        ]

        # Insert chart rows
        for mode, cid in bj_order + spa_order:
            cur.execute("""
                INSERT INTO charts (chart_id, user_id, mode)
                VALUES (%s, %s, %s);
            """, (cid, uid, mode))

        # helper to copy entries from test_user1’s chart for a given mode
        def copy_mode(mode: str, dest_chart_id: int):
            # find source chart id (test_user1) for the same mode
            cur.execute("""
                SELECT chart_id FROM charts
                WHERE user_id = %s AND mode = %s
                ORDER BY chart_id DESC LIMIT 1;
            """, (TEST_USER, mode))
            row = cur.fetchone()
            if not row:
                raise RuntimeError(f"Missing source chart for {mode} on {TEST_USER}")
            src_chart_id = row[0]

            if mode in PERFECT_MODES:
                # clone perfect_entries
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
            else:
                # clone chart_entries
                cur.execute("""
                    INSERT INTO chart_entries
                        (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move)
                    SELECT %s, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move
                    FROM chart_entries
                    WHERE chart_id = %s;
                """, (dest_chart_id, src_chart_id))

        # Copy entries for all modes (BJ + Spanish)
        for mode, cid in bj_order + spa_order:
            copy_mode(mode, cid)

        # keep the charts sequence aligned with manual inserts (important if SERIAL)
        cur.execute("""
            SELECT setval(pg_get_serial_sequence('charts','chart_id'),
                          (SELECT MAX(chart_id) FROM charts));
        """)

        db.commit()
        return jsonify({
            "ok": True,
            "user_id": uid,
            "email": email,
            "charts": {mode: cid for mode, cid in (bj_order + spa_order)}
        }), 201

    except Exception as e:
        db.rollback()
        return jsonify({"ok": False, "error": str(e)}), 500


@new_user_bp.post("/reset_entries_default")
@require_user
def reset_entries_default():
    """
    Reset the logged-in user's chart entries for a specific mode back to the defaults
    copied from test_user1.

    Request JSON:
      { "mode": "4-10" | "2-3" | "perfect" | "A-9DAS" | "A-9NoDAS" | "Spanish_4to9" | "Spanish_2to3" | "Spanish_perfect" }

    Response JSON on success:
      { "ok": true, "mode": "<mode>", "chart_id": <int>, "rows": { "deleted": <int>, "inserted": <int> } }
    """
    data = request.get_json(silent=True) or {}
    mode = data.get("mode")

    VALID_MODES = {
        '4-10','2-3','perfect',
        'A-9DAS','A-9NoDAS',
        'Spanish_4to9','Spanish_2to3','Spanish_perfect'
    }
    PERFECT_MODES = {'perfect', 'Spanish_perfect'}

    if mode not in VALID_MODES:
        return jsonify({"ok": False, "error": "invalid or missing mode"}), 400

    db, cur = get_db()
    user_id = g.user["id"]
    # user_id = '61832595-68fa-4146-b7ea-7d55df00a3df'

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
        if mode in PERFECT_MODES:
            cur.execute("DELETE FROM perfect_entries WHERE chart_id = %s;", (dest_chart_id,))
            deleted = cur.rowcount
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
            cur.execute("DELETE FROM chart_entries WHERE chart_id = %s;", (dest_chart_id,))
            deleted = cur.rowcount
            cur.execute("""
                INSERT INTO chart_entries
                    (chart_id, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move)
                SELECT %s, dealer_val, player_val, player_hand_type, dealer_hand_type, player_pair, recommended_move
                FROM chart_entries
                WHERE chart_id = %s;
            """, (dest_chart_id, src_chart_id))
            inserted = cur.rowcount

        db.commit()
        return jsonify({"ok": True, "mode": mode, "chart_id": dest_chart_id,
                        "rows": {"deleted": deleted, "inserted": inserted}}), 200
    except Exception as e:
        db.rollback()
        return jsonify({"ok": False, "error": str(e)}), 500




@new_user_bp.post("/admin/bootstrap_spanish_charts")
def bootstrap_spanish_charts():
    """
    One-time bootstrap:
      - For each existing user (excluding test_user1), create Spanish charts
        (Spanish_4to9, Spanish_2to3, Spanish_perfect) if missing.
      - Chart IDs start at 15000, then increment globally as we go user-by-user.
      - Entries are cloned from test_user1's corresponding Spanish charts:
          * chart_entries for 4to9 / 2to3
          * perfect_entries for Spanish_perfect
    Response example:
      {
        "ok": true,
        "start_from": 15000,
        "processed_users": 7,
        "created": {
          "userA": {"Spanish_4to9": 15000, "Spanish_2to3": 15001, "Spanish_perfect": 15002},
          "userB": {"Spanish_4to9": 15003, "Spanish_2to3": 15004, "Spanish_perfect": 15005},
          ...
        },
        "skipped": ["userC"]  # already had all Spanish charts
      }
    """
    db, cur = get_db()

    # 1) Find template chart_ids for test_user1 per mode
    src_ids = {}
    for m in SPANISH_MODES:
        cur.execute("""
            SELECT chart_id FROM charts
            WHERE user_id = %s AND mode = %s
            ORDER BY chart_id DESC
            LIMIT 1;
        """, (TEST_USER, m))
        r = cur.fetchone()
        if not r:
            return jsonify({
                "ok": False,
                "error": f"Missing template chart for {m} on {TEST_USER}. Ensure 97/98/99 (or by mode) exist."
            }), 500
        src_ids[m] = r["chart_id"]

    # 2) Determine starting chart_id: at least 15000, or continue from max
    cur.execute("SELECT COALESCE(MAX(chart_id), 0) FROM charts;")
    max_existing = cur.fetchone()[0] or 0
    base = max(max_existing, 14999)  # so first assigned will be base+1
    next_id = base

    # 3) Pull all users that have charts (exclude template user)
    cur.execute("""
        SELECT DISTINCT user_id
        FROM charts
        WHERE user_id <> %s
        ORDER BY user_id;
    """, (TEST_USER,))
    users = [row["user_id"] for row in cur.fetchall()]

    created = {}
    skipped = []

    try:
        for uid in users:
            # Which Spanish modes does this user already have?
            cur.execute("""
                SELECT mode FROM charts
                WHERE user_id = %s AND mode IN %s
            """, (uid, SPANISH_MODES))
            have = {row["mode"] for row in cur.fetchall()}
            missing = [m for m in SPANISH_MODES if m not in have]

            if not missing:
                skipped.append(uid)
                continue

            created[uid] = {}

            # Allocate IDs for the missing modes (keep per-user contiguous)
            alloc = []
            for _ in missing:
                next_id += 1
                alloc.append(next_id)

            # Insert charts rows and copy entries
            for mode, dest_cid in zip(missing, alloc):
                # Insert chart
                cur.execute("""
                    INSERT INTO charts (chart_id, user_id, mode)
                    VALUES (%s, %s, %s)
                """, (dest_cid, uid, mode))

                # Clone entries
                src_cid = src_ids[mode]
                if mode == "Spanish_perfect":
                    # perfect_entries
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
                    """, (dest_cid, src_cid))
                else:
                    # chart_entries
                    cur.execute("""
                        INSERT INTO chart_entries
                            (chart_id, dealer_val, player_val, player_hand_type,
                             dealer_hand_type, player_pair, recommended_move)
                        SELECT %s, dealer_val, player_val, player_hand_type,
                               dealer_hand_type, player_pair, recommended_move
                        FROM chart_entries
                        WHERE chart_id = %s;
                    """, (dest_cid, src_cid))

                created[uid][mode] = dest_cid

        # Keep SERIAL in sync if charts.chart_id uses a sequence
        cur.execute("""
            SELECT setval(
                pg_get_serial_sequence('charts','chart_id'),
                (SELECT MAX(chart_id) FROM charts)
            );
        """)

        db.commit()
        return jsonify({
            "ok": True,
            "start_from": 15000,
            "processed_users": len(users),
            "created": created,
            "skipped": skipped
        }), 200

    except Exception as e:
        db.rollback()
        return jsonify({"ok": False, "error": str(e)}), 500