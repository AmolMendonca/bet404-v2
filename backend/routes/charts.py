# backend/routes/charts.py

from flask import Blueprint, jsonify
from models import get_db

charts_bp = Blueprint('charts', __name__)

@charts_bp.route('/4to10_chart', methods=['GET'])
def send_4to10_chart():
    db, cur = get_db()

    chart_id = 100

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
def send_2to3_chart():
    db, cur = get_db()

    # hard-coded for test_user1’s 2-3 chart
    chart_id = 101

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
def send_perfect_chart():
    db, cur = get_db()

    # hard-coded for template user's perfect chart
    chart_id = 102

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
