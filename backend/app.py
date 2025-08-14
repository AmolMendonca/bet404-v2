# app.py
import os
from flask import Flask
from flask_cors import CORS
from config import DATABASE_URL
from models import get_db, close_db
from routes.hello import hello_bp
from routes.dealing import dealing_bp
from routes.charts import charts_bp
from routes.grading import grading_bp
from routes.settings import settings_bp
from routes.defaults import new_user_bp
from routes.stats import stats_bp

from routes.auth_routes import auth_bp   # new

from dotenv import load_dotenv
load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config['DATABASE_URL'] = DATABASE_URL

    # CORS for Vite dev and your prod origin
    CORS(
        app,
        resources={r"/api/*": {"origins": ["http://localhost:5173"]}},
        supports_credentials=True,
    )

    app.teardown_appcontext(close_db)

    # auth endpoints
    app.register_blueprint(auth_bp, url_prefix='/api')

    # your existing endpoints
    app.register_blueprint(hello_bp, url_prefix='/api')
    app.register_blueprint(dealing_bp, url_prefix='/api')
    app.register_blueprint(charts_bp, url_prefix='/api')
    app.register_blueprint(grading_bp, url_prefix='/api')
    app.register_blueprint(settings_bp, url_prefix='/api')
    app.register_blueprint(new_user_bp, prefix='/api')
    app.register_blueprint(stats_bp, prefix='/api')
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5001, debug=True)
