import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret')
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
    DB_NAME = os.getenv('DB_NAME', 'tamil_assessment')
    JWT_EXP_HOURS = int(os.getenv('JWT_EXP_HOURS', 24))
    ADMIN_TOKEN = os.getenv('ADMIN_TOKEN', 'admin-secret')
