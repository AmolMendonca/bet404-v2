import os
from dotenv import load_dotenv

# Try to load .env from multiple possible locations
load_dotenv()  # This will look in current directory and parent directories
load_dotenv('.env')  # Explicit current directory
load_dotenv('.env.local')  # Common Vercel pattern

DATABASE_URL = os.getenv('DATABASE_URL') or os.getenv('BACKEND_DATABASE_URL')
if not DATABASE_URL:
    raise RuntimeError("Missing DATABASE_URL or BACKEND_DATABASE_URL environment variable")