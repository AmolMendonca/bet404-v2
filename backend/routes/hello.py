from flask import jsonify, Blueprint
import os


hello_bp = Blueprint('hello', __name__)

@hello_bp.route('/hello', methods=['GET'])
def hello():
    return jsonify({
        "msg": "Hello from the otherside! 👋"
    })