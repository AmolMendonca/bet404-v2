# backend/routes/stats.py
"""
GET /stats  — Blackjack stats summary for the logged-in user

Auth:
  Uses Supabase access token via @require_user (g.user['id'])

Request:
  (no body)

Response (example):
{
  "user_id": "6183...a3df",
  "per_mode": {
    "4-10":     { "total": 120, "errors": 18, "correct": 102, "accuracy": 85.0 },
    "2-3":      { "total":  40, "errors":  9, "correct":  31, "accuracy": 77.5 },
    "A-9DAS":   { "total":  25, "errors":  4, "correct":  21, "accuracy": 84.0 },
    "A-9NoDAS": { "total":  30, "errors":  7, "correct":  23, "accuracy": 76.67 },
    "perfect":  { "total":   0, "errors":  0, "correct":   0, "accuracy": null }
  },
  "totals": { "total": 215, "errors": 38, "correct": 177, "accuracy": 82.33 }
}
"""

from flask import Blueprint, jsonify, g
from auth import require_user
from models import get_db

stats_bp = Blueprint('stats', __name__)

def _pack(total: int, errors: int):
    correct = max(0, int(total) - int(errors))
    acc = round((correct / total) * 100.0, 2) if total else None
    return {"total": int(total), "errors": int(errors), "correct": correct, "accuracy": acc}

@stats_bp.get("/stats")
@require_user
def get_stats():
    db, cur = get_db()
    user_id = g.user["id"]

    cur.execute("""
        SELECT
          total_4to10_hands,  errors_4to10_hands,
          total_2to3_hands,   errors_2to3_hands,
          total_perfect_hands,errors_perfect_hands,
          total_a9das_hands,  errors_a9das_hands,
          total_a9nodas_hands,errors_a9nodas_hands
        FROM user_stats
        WHERE user_id = %s
        LIMIT 1;
    """, (user_id,))
    row = cur.fetchone()
    if not row:
        # if somehow missing, return all zeros
        zero = _pack(0, 0)
        return jsonify({
            "user_id": user_id,
            "per_mode": {
                "4-10": zero, "2-3": zero, "A-9DAS": zero, "A-9NoDAS": zero, "perfect": zero
            },
            "totals": zero
        }), 200

    m_410   = _pack(row["total_4to10_hands"],   row["errors_4to10_hands"])
    m_23    = _pack(row["total_2to3_hands"],    row["errors_2to3_hands"])
    m_perf  = _pack(row["total_perfect_hands"], row["errors_perfect_hands"])
    m_a9das = _pack(row["total_a9das_hands"],   row["errors_a9das_hands"])
    m_a9nd  = _pack(row["total_a9nodas_hands"], row["errors_a9nodas_hands"])

    total_all  = (m_410["total"] + m_23["total"] + m_perf["total"] + m_a9das["total"] + m_a9nd["total"])
    errors_all = (m_410["errors"] + m_23["errors"] + m_perf["errors"] + m_a9das["errors"] + m_a9nd["errors"])
    totals = _pack(total_all, errors_all)

    return jsonify({
        "user_id": user_id,
        "per_mode": {
            "4-10": m_410,
            "2-3": m_23,
            "A-9DAS": m_a9das,
            "A-9NoDAS": m_a9nd,
            "perfect": m_perf
        },
        "totals": totals
    }), 200
