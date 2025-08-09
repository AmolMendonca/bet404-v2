# api/app.py
# Adapter that exposes your Flask app to Vercel

import os, sys
# make repo root importable when running on Vercel
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from backend.app import create_app

app = create_app()  # Vercel looks for a module level "app"
