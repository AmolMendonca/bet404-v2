import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

DATABASE_URL = os.getenv('BACKEND_DATABASE_URL')
if not DATABASE_URL:
    raise RuntimeError("Missing BACKEND_DATABASE_URL in .env")