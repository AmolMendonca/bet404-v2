import os, sys
import traceback
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, jsonify, request
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create a debug Flask app first
debug_app = Flask(__name__)

@debug_app.route('/')
@debug_app.route('/<path:path>')
def debug_handler(path=''):
    try:
        # Try to import and create your real app
        from backend.app import create_app
        real_app = create_app()
        
        # Create a test request context and try to dispatch
        with real_app.test_request_context(request.path, method=request.method):
            try:
                response = real_app.full_dispatch_request()
                return response
            except Exception as dispatch_error:
                return jsonify({
                    "error": "Dispatch error",
                    "message": str(dispatch_error),
                    "traceback": traceback.format_exc(),
                    "path": path,
                    "method": request.method
                }), 500
                
    except ImportError as import_error:
        return jsonify({
            "error": "Import error", 
            "message": str(import_error),
            "traceback": traceback.format_exc()
        }), 500
    except Exception as e:
        return jsonify({
            "error": "General error",
            "message": str(e),
            "traceback": traceback.format_exc(),
            "path": path
        }), 500

# Use the debug app
app = debug_app