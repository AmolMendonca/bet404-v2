from flask import Flask, jsonify
app = Flask(__name__)

@app.get("/api/ping")
def ping():
    return jsonify({"ok": True})
