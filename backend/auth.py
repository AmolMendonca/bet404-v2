# auth.py
import os
from functools import wraps
from flask import request, g, abort, current_app
from supabase import create_client, Client

from dotenv import load_dotenv
load_dotenv()


SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    raise RuntimeError("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")

sb: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

def get_token_from_request():
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth.split(" ", 1)[1]
    cookie = request.cookies.get("sb_access", "")
    if cookie:
        return cookie
    return ""

def require_user(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        token = get_token_from_request()
        if not token:
            abort(401)
        try:
            resp = sb.auth.get_user(token)
            user = resp.user
        except Exception as e:
            current_app.logger.exception("Supabase get_user failed")
            abort(401)
        if not user:
            abort(401)
        # cast id to string for JSON safety
        g.user = {"id": str(user.id), "email": user.email}
        return fn(*args, **kwargs)
    return wrapper
