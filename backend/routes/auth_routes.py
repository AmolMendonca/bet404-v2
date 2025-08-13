# routes/auth_routes.py
from flask import Blueprint, request, jsonify, make_response, g
from auth import sb, require_user

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/auth/exchange")
def auth_exchange():
    data = request.get_json(silent=True) or {}
    token = data.get("access_token")
    if not token:
        return jsonify({"error": "access_token missing"}), 400
    try:
        user = sb.auth.get_user(token).user
    except Exception:
        return jsonify({"error": "invalid token"}), 401
    if not user:
        return jsonify({"error": "invalid token"}), 401

    resp = make_response(jsonify({"ok": True, "id": user.id, "email": user.email}))
    resp.set_cookie(
        "sb_access",
        token,
        httponly=True,
        secure=False,   # set True in production
        samesite="Lax",
        max_age=60 * 60,
    )
    return resp

@auth_bp.post("/auth/logout")
def auth_logout():
    resp = make_response(jsonify({"ok": True}))
    resp.delete_cookie("sb_access")
    return resp

@auth_bp.get("/me")
@require_user
def me():
    return jsonify(g.user)

@auth_bp.get("/ping")
def ping():
    return jsonify({"ok": True})

