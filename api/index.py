import os, sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
@app.route('/<path:path>')
def debug_handler(path=''):
    try:
        # Try to import your backend
        from backend.app import create_app
        backend_app = create_app()
        
        # Try to handle the request with your backend app
        with backend_app.test_request_context():
            return backend_app.full_dispatch_request()
            
    except Exception as e:
        return jsonify({
            "error": str(e),
            "path": path,
            "sys_path": sys.path,
            "cwd": os.getcwd(),
            "files": os.listdir('.')
        }), 500