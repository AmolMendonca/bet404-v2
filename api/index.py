import os, sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

# Load environment variables before importing anything else
from dotenv import load_dotenv
load_dotenv()

try:
    from backend.app import create_app
    app = create_app()
except Exception as e:
    from flask import Flask, jsonify
    app = Flask(__name__)
    
    @app.route('/')
    @app.route('/<path:path>')
    def error(path=''):
        return jsonify({
            "error": str(e),
            "error_type": type(e).__name__,
            "path": path,
            "env_vars": {k: v for k, v in os.environ.items() if 'DATABASE' in k}
        })