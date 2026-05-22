from datetime import datetime, timedelta, timezone
import bcrypt
import jwt
from flask import current_app


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))


def create_token(user_id: str, username: str) -> str:
    exp_hours = current_app.config['JWT_EXP_HOURS']
    payload = {
        'sub': user_id,
        'username': username,
        'exp': datetime.now(timezone.utc) + timedelta(hours=exp_hours)
    }
    return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')


def decode_token(token: str):
    return jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
