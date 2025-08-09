import os, sys
# Make repo root importable when running on Vercel
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from backend.app import create_app

# Vercel looks for a module level "app"
app = create_app()

# This will handle all /api/* routes through your backend Flask app