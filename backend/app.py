import os
from flask import Flask
from config import DATABASE_URL
from models import get_db, close_db
from routes.hello import hello_bp
from routes.dealing import dealing_bp
from routes.charts import charts_bp
from routes.grading import grading_bp

def create_app():
    app = Flask(__name__)
    app.config['DATABASE_URL'] = DATABASE_URL

    app.teardown_appcontext(close_db)

    app.register_blueprint(hello_bp, url_prefix='/api')
    app.register_blueprint(dealing_bp, url_prefix='/api')
    app.register_blueprint(charts_bp, url_prefix='/api')
    app.register_blueprint(grading_bp, url_prefix='/api')

    return app
    
if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5001, debug=True)