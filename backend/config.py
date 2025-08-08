import os

DATABASE_URL = os.getenv(
    'BACKEND_DATABASE_URL',
    'postgresql://bet404_user:changeme@localhost:5432/bet404'
)
