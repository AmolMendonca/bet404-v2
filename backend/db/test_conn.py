# backend/db/test_conn.py

from dotenv import load_dotenv, find_dotenv
load_dotenv()            

import os
import psycopg2

print("Working directory is:", os.getcwd())
print("Files here:", os.listdir(os.getcwd()))



env_path = find_dotenv()           # searches upward from cwd for a .env
print("find_dotenv found:", env_path)
loaded = load_dotenv(env_path)     # explicitly load that path
print("Was .env loaded?", loaded)

url = os.getenv('BACKEND_DATABASE_URL')
print("Connecting to:", url)   # <-- add this line to verify

conn = psycopg2.connect(url)
cur  = conn.cursor()
cur.execute("SELECT version();")
print(cur.fetchone())
conn.close()
