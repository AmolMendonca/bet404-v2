# backend/routes/charts.py

from flask import Blueprint, jsonify, g
from models import get_db
from auth import require_user

charts_bp = Blueprint('charts', __name__)

def _get_chart_id_for_mode(cur, user_id: str, mode: str) -> int:
    cur.execute("""
        SELECT chart_id
        FROM charts
        WHERE user_id = %s AND mode = %s
        ORDER BY chart_id DESC
        LIMIT 1;
    """, (user_id, mode))
    row = cur.fetchone()
    return row['chart_id'] if row else None

@charts_bp.route('/4to10_chart', methods=['GET'])
@require_user
def send_4to10_chart():
    db, cur = get_db()

    user_id = g.user['id']
    chart_id = _get_chart_id_for_mode(cur, user_id, '4-10')
    if not chart_id:
        return jsonify({"error": "4-10 chart not found for user"}), 404

    cur.execute("""
        SELECT
            dealer_val,
            player_val,
            player_hand_type,
            player_pair,
            recommended_move
        FROM chart_entries
        WHERE chart_id = %s
        ORDER BY player_pair, player_val, dealer_val
    """, (chart_id,))

    rows = cur.fetchall()

    regular_entries = []
    pair_entries    = []

    for row in rows:
        dealer_val       = row['dealer_val']
        recommended_move = row['recommended_move']

        if row['player_pair']:
            pair_entries.append({
                'dealer_val':       dealer_val,
                'player_pair':      str(row['player_val']),
                'recommended_move': recommended_move
            })
        else:
            regular_entries.append({
                'dealer_val':       dealer_val,
                'player_val':       row['player_val'],
                'player_hand_type': row['player_hand_type'],
                'recommended_move': recommended_move
            })

    return jsonify({
        'regular_entries': regular_entries,
        'pair_entries':    pair_entries
    })

@charts_bp.route('/2to3_chart', methods=['GET'])
@require_user
def send_2to3_chart():
    db, cur = get_db()

    user_id = g.user['id']
    chart_id = _get_chart_id_for_mode(cur, user_id, '2-3')
    if not chart_id:
        return jsonify({"error": "2-3 chart not found for user"}), 404

    cur.execute("""
        SELECT
            dealer_val,
            player_val,
            player_hand_type,
            player_pair,
            recommended_move
        FROM chart_entries
        WHERE chart_id = %s
        ORDER BY player_pair, player_val, dealer_val
    """, (chart_id,))

    rows = cur.fetchall()

    regular_entries = []
    pair_entries    = []

    for row in rows:
        dealer_val       = row['dealer_val']
        recommended_move = row['recommended_move']

        if row['player_pair']:
            pair_entries.append({
                'dealer_val':       dealer_val,
                'player_pair':      str(row['player_val']),
                'recommended_move': recommended_move
            })
        else:
            regular_entries.append({
                'dealer_val':       dealer_val,
                'player_val':       row['player_val'],
                'player_hand_type': row['player_hand_type'],
                'recommended_move': recommended_move
            })

    return jsonify({
        'regular_entries': regular_entries,
        'pair_entries':    pair_entries
    })

@charts_bp.route('/perfect_chart', methods=['GET'])
@require_user
def send_perfect_chart():
    db, cur = get_db()

    user_id = g.user['id']
    chart_id = _get_chart_id_for_mode(cur, user_id, 'perfect')
    if not chart_id:
        return jsonify({"error": "perfect chart not found for user"}), 404

    cur.execute("""
        SELECT
            dealer_val,
            hit_until_hard,
            hit_until_soft,
            double_hards,
            double_softs,
            splits,
            late_surrender_hards,
            late_surrender_softs
        FROM perfect_entries
        WHERE chart_id = %s
        ORDER BY dealer_val
    """, (chart_id,))

    rows = cur.fetchall()

    entries = []
    for row in rows:
        entries.append({
            "dealer_val":      row["dealer_val"],
            "harduntil":       row["hit_until_hard"],
            "softstanduntil":  row["hit_until_soft"],
            "doublehards":     row["double_hards"],
            "doublesofts":     row["double_softs"],
            "splits":          row["splits"],
            "lshards":         row["late_surrender_hards"],
            "lssofts":         row["late_surrender_softs"],
        })

    return jsonify({ "perfect_entries": entries })

@charts_bp.route('/a9das_chart', methods=['GET'])
@require_user
def send_a9das_chart():
    db, cur = get_db()

    user_id = g.user['id']
    chart_id = _get_chart_id_for_mode(cur, user_id, 'A-9DAS')
    if not chart_id:
        return jsonify({"error": "A-9DAS chart not found for user"}), 404

    cur.execute("""
        SELECT
            dealer_val,
            player_val,
            player_hand_type,
            player_pair,
            recommended_move
        FROM chart_entries
        WHERE chart_id = %s
        ORDER BY player_pair, player_val, dealer_val
    """, (chart_id,))

    rows = cur.fetchall()

    regular_entries = []
    pair_entries    = []

    for row in rows:
        dealer_val       = row['dealer_val']
        recommended_move = row['recommended_move']

        if row['player_pair']:
            pair_entries.append({
                'dealer_val':       dealer_val,
                'player_pair':      str(row['player_val']),
                'recommended_move': recommended_move
            })
        else:
            regular_entries.append({
                'dealer_val':       dealer_val,
                'player_val':       row['player_val'],
                'player_hand_type': row['player_hand_type'],
                'recommended_move': recommended_move
            })

    return jsonify({
        'regular_entries': regular_entries,
        'pair_entries':    pair_entries
    })


@charts_bp.route('/a9nodas_chart', methods=['GET'])
@require_user
def send_a9nodas_chart():
    db, cur = get_db()

    user_id = g.user['id']
    chart_id = _get_chart_id_for_mode(cur, user_id, 'A-9NoDAS')
    if not chart_id:
        return jsonify({"error": "A-9NoDAS chart not found for user"}), 404

    cur.execute("""
        SELECT
            dealer_val,
            player_val,
            player_hand_type,
            player_pair,
            recommended_move
        FROM chart_entries
        WHERE chart_id = %s
        ORDER BY player_pair, player_val, dealer_val
    """, (chart_id,))

    rows = cur.fetchall()

    regular_entries = []
    pair_entries    = []

    for row in rows:
        dealer_val       = row['dealer_val']
        recommended_move = row['recommended_move']

        if row['player_pair']:
            pair_entries.append({
                'dealer_val':       dealer_val,
                'player_pair':      str(row['player_val']),
                'recommended_move': recommended_move
            })
        else:
            regular_entries.append({
                'dealer_val':       dealer_val,
                'player_val':       row['player_val'],
                'player_hand_type': row['player_hand_type'],
                'recommended_move': recommended_move
            })

    return jsonify({
        'regular_entries': regular_entries,
        'pair_entries':    pair_entries
    })
