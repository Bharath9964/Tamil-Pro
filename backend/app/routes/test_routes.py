from flask import Blueprint, request, jsonify, g
from app.models.user_model import UserModel
from app.utils.auth_middleware import token_required
from app.services.test_service import (
    mcq_score,
    aggregate_writing_score,
    aggregate_speaking_score,
    adaptive_difficulty,
    build_recommendations,
    promoted_level,
)
from app.data.sample_content import READING_PASSAGE, LISTENING_CONTENT, WRITING_PROMPTS, SPEAKING_SENTENCES

test_bp = Blueprint('test', __name__)


@test_bp.post('/submit')
@token_required
def submit_test():
    data = request.get_json() or {}

    reading_answers = data.get('readingAnswers', [])
    listening_answers = data.get('listeningAnswers', [])

    writing_responses = data.get('writingResponses') or []
    if not writing_responses:
        writing_text = data.get('writingText', '')
        writing_responses = [writing_text] if writing_text else []

    speaking_expected = data.get('speakingExpectedList') or SPEAKING_SENTENCES
    speaking_transcripts = data.get('speakingTranscripts') or []
    if not speaking_transcripts:
        single = data.get('speakingTranscript', '')
        speaking_transcripts = [single] if single else []

    reading_correct = [q['answer'] for q in READING_PASSAGE['questions']]
    listening_correct = [q['answer'] for q in LISTENING_CONTENT['questions']]

    reading = mcq_score(reading_answers, reading_correct)
    listening = mcq_score(listening_answers, listening_correct)
    writing = aggregate_writing_score(writing_responses[:len(WRITING_PROMPTS)])
    speaking = aggregate_speaking_score(speaking_expected, speaking_transcripts)

    overall = round((reading + writing + speaking + listening) / 4, 2)

    old_progress = g.current_user.get('progress', {})
    current_difficulty = old_progress.get('difficulty', 1)
    next_difficulty = adaptive_difficulty(overall, current_difficulty)

    current_level = g.current_user.get('level', 'Beginner')
    new_level, upgraded = promoted_level(current_level, overall)
    passed = overall >= 70

    message = (
        f'Level Upgraded to {new_level}' if upgraded else
        ('Great work! You passed this assessment.' if passed else 'Try again to improve your level')
    )

    progress = {
        'reading': reading,
        'writing': writing,
        'speaking': speaking,
        'listening': listening,
        'overall': overall,
        'last_score': overall,
        'improvement_message': message,
        'difficulty': next_difficulty
    }

    UserModel.update_progress(g.current_user['_id'], progress, new_level)

    return jsonify({
        'score': overall,
        'passed': passed,
        'level': new_level,
        'levelUpgraded': upgraded,
        'message': message,
        'redirectTo': '/dashboard' if passed else None,
        'progress': progress,
        'recommendations': build_recommendations(progress)
    })
