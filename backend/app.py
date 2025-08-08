
import os
from flask import Flask
from config import DATABASE_URL
from models import get_db, close_db
from routes.hello import hello_bp
from routes.dealing import deal_newhand

def create_app():
    app = Flask(__name__)
    app.config['DATABASE_URL'] = DATABASE_URL

    app.teardown_appcontext(close_db)

    app.register_blueprint(hello_bp, url_prefix='/api')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
