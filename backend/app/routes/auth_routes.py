from flask import Blueprint, request, jsonify
from bson import ObjectId
from app.models.user_model import UserModel
from app.utils.security import hash_password, verify_password, create_token
from app.utils.auth_middleware import token_required
from app.config import Config

auth_bp = Blueprint('auth', __name__)


@auth_bp.post('/register')
def register():
    data = request.get_json() or {}
    username = (data.get('username') or '').strip()
    password = data.get('password') or ''

    if len(username) < 3:
        return jsonify({'error': 'Username too short'}), 400

    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400

    if UserModel.find_by_username(username):
        return jsonify({'error': 'User already exists'}), 409

    user = {
        'username': username,
        'display_name': username,
        'password': hash_password(password),
        'level': 'Beginner',
        'progress': {
            'reading': 0,
            'writing': 0,
            'speaking': 0,
            'listening': 0,
            'overall': 0,
            'last_score': 0,
            'improvement_message': 'Complete an assessment to view your progress.',
            'difficulty': 1
        }
    }
    inserted = UserModel.create_user(user)
    token = create_token(str(inserted.inserted_id), username)

    return jsonify({
        'message': 'Account created successfully',
        'token': token,
        'user': {
            'id': str(inserted.inserted_id),
            'username': username,
            'displayName': username,
            'level': 'Beginner',
            'progress': user['progress']
        }
    }), 201


@auth_bp.post('/login')
def login():
    data = request.get_json() or {}
    username = (data.get('username') or '').strip()
    password = data.get('password') or ''

    user = UserModel.find_by_username(username)
    if not user or not verify_password(password, user['password']):
        return jsonify({'error': 'Invalid credentials'}), 401

    token = create_token(str(user['_id']), user['username'])
    return jsonify({
        'token': token,
        'user': {
            'id': str(user['_id']),
            'username': user['username'],
            'displayName': user.get('display_name', user['username']),
            'level': user.get('level', 'Beginner'),
            'progress': user.get('progress', {})
        }
    })


@auth_bp.put('/display-name')
@token_required
def update_display_name():
    from flask import g

    data = request.get_json() or {}
    display_name = (data.get('displayName') or '').strip()

    if len(display_name) < 3:
        return jsonify({'error': 'Display name must be at least 3 characters'}), 400

    UserModel.update_display_name(g.current_user['_id'], display_name)
    user = UserModel.find_by_id(g.current_user['_id'])

    return jsonify({
        'message': 'Display name updated',
        'user': {
            'id': str(user['_id']),
            'username': user['username'],
            'displayName': user.get('display_name', user['username']),
            'level': user.get('level', 'Beginner'),
            'progress': user.get('progress', {})
        }
    })


@auth_bp.put('/admin/edit-user/<user_id>')
def admin_edit_user(user_id):
    admin_token = request.headers.get('X-Admin-Token', '')
    if admin_token != Config.ADMIN_TOKEN:
        return jsonify({'error': 'Unauthorized admin access'}), 401

    data = request.get_json() or {}
    payload = {}

    if 'username' in data:
        username = (data.get('username') or '').strip()
        if len(username) < 3:
            return jsonify({'error': 'Username must be at least 3 characters'}), 400
        existing = UserModel.find_by_username(username)
        if existing and str(existing['_id']) != user_id:
            return jsonify({'error': 'Username already exists'}), 409
        payload['username'] = username

    if 'displayName' in data:
        display_name = (data.get('displayName') or '').strip()
        if len(display_name) < 3:
            return jsonify({'error': 'Display name must be at least 3 characters'}), 400
        payload['display_name'] = display_name

    if 'level' in data:
        payload['level'] = data['level']

    if 'progress' in data:
        payload['progress'] = data['progress']

    if 'password' in data:
        password = data.get('password', '')
        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400
        payload['password'] = hash_password(password)

    if not payload:
        return jsonify({'error': 'No valid fields to update'}), 400

    try:
        UserModel.update_user(ObjectId(user_id), payload)
    except Exception:
        return jsonify({'error': 'Failed to update user.'}), 500

    user = UserModel.find_by_id(ObjectId(user_id))
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'message': 'User updated successfully',
        'user': {
            'id': str(user['_id']),
            'username': user['username'],
            'displayName': user.get('display_name', user['username']),
            'level': user.get('level', 'Beginner'),
            'progress': user.get('progress', {})
        }
    })
