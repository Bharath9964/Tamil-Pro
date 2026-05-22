from flask import Blueprint, request, jsonify, g
from app.models.user_model import UserModel
from app.utils.auth_middleware import token_required
from app.services.test_service import build_recommendations, promoted_level

progress_bp = Blueprint('progress', __name__)


@progress_bp.post('/update')
@token_required
def update_progress():
    data = request.get_json() or {}
    payload = data.get('progress', {})

    reading = float(payload.get('reading', 0))
    writing = float(payload.get('writing', 0))
    speaking = float(payload.get('speaking', 0))
    listening = float(payload.get('listening', 0))
    difficulty = int(payload.get('difficulty', g.current_user.get('progress', {}).get('difficulty', 1)))

    overall = round((reading + writing + speaking + listening) / 4, 2)
    current_level = g.current_user.get('level', 'Beginner')
    level, upgraded = promoted_level(current_level, overall)

    message = f'Level Upgraded to {level}' if upgraded else ('Great work! You passed this assessment.' if overall >= 70 else 'Try again to improve your level')

    progress = {
        'reading': reading,
        'writing': writing,
        'speaking': speaking,
        'listening': listening,
        'overall': overall,
        'last_score': overall,
        'improvement_message': message,
        'difficulty': difficulty
    }

    UserModel.update_progress(g.current_user['_id'], progress, level)
    return jsonify({'level': level, 'progress': progress, 'recommendations': build_recommendations(progress)})
