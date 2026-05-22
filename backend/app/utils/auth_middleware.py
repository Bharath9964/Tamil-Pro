from functools import wraps
from flask import request, jsonify, g
import jwt
from bson import ObjectId
from app.models.user_model import UserModel
from app.utils.security import decode_token


def token_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        header = request.headers.get('Authorization', '')
        parts = header.split(' ')
        if len(parts) != 2 or parts[0] != 'Bearer':
            return jsonify({'message': 'Missing or invalid token'}), 401

        token = parts[1]
        try:
            payload = decode_token(token)
            user = UserModel.find_by_id(ObjectId(payload['sub']))
            if not user:
                return jsonify({'message': 'User not found'}), 404
            g.current_user = user
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 401
        except Exception:
            return jsonify({'message': 'Invalid token'}), 401

        return func(*args, **kwargs)

    return wrapper
