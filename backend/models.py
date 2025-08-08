
import os
import psycopg2
import psycopg2.extras
from flask import g, current_app

def get_db():
    """Return a (conn, cursor) tuple, one per request."""
    if 'db' not in g:
        g.db = psycopg2.connect(current_app.config['DATABASE_URL'])
        g.db_cursor = g.db.cursor(cursor_factory=psycopg2.extras.DictCursor)
    return g.db, g.db_cursor

def close_db(error=None):
    """Commit & close the DB at the end of the request."""
    db = g.pop('db', None)
    if db is not None:
        db.commit()
        db.close()