from flask import Blueprint, jsonify, g
from app.utils.auth_middleware import token_required
from app.services.content_service import get_content_for_difficulty

content_bp = Blueprint('content', __name__)


@content_bp.get('/get')
@token_required
def get_content():
    difficulty = g.current_user.get('progress', {}).get('difficulty', 1)
    content = get_content_for_difficulty(difficulty)
    return jsonify(content)
