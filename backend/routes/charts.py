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
