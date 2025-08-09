import os
from dotenv import load_dotenv

# Load .env files from the parent directory (project root)
parent_dir = os.path.dirname(os.path.dirname(__file__))
load_dotenv(os.path.join(parent_dir, '.env'))
load_dotenv(os.path.join(parent_dir, '.env.local'))

DATABASE_URL = os.getenv('DATABASE_URL')
if not DATABASE_URL:
    raise RuntimeError("Missing DATABASE_URL in environment variables")