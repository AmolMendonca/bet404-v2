import os
from dotenv import load_dotenv

# Load both .env files
load_dotenv('.env')
load_dotenv('.env.local')

DATABASE_URL = os.getenv('DATABASE_URL')
if not DATABASE_URL:
    raise RuntimeError("Missing DATABASE_URL in environment variables")