
import os
import psycopg2
import psycopg2.extras
from flask import g
from bfkt import app   

def get_db():
    """Get or create the Postgres connection for this request."""
    if 'db' not in g:
        g.db = psycopg2.connect(app.config['DATABASE_URL'])
        g.db_cursor = g.db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    return g.db, g.db_cursor

@app.teardown_appcontext
def close_db(error):
    """Commit & close Postgres connection after each request."""
    db = g.pop('db', None)
    if db is not None:
        db.commit()
        db.close()
