import re
from difflib import SequenceMatcher

LEVELS = ['Beginner', 'Intermediate', 'Advanced']


def adaptive_difficulty(overall_score: float, current_difficulty: int = 1) -> int:
    if overall_score > 80:
        return min(current_difficulty + 1, 3)
    if overall_score < 50:
        return max(current_difficulty - 1, 1)
    return current_difficulty


def mcq_score(submitted_answers, correct_answers) -> float:
    if not correct_answers:
        return 0.0
    correct = sum(1 for idx, ans in enumerate(submitted_answers) if idx < len(correct_answers) and ans == correct_answers[idx])
    return round((correct / len(correct_answers)) * 100, 2)


def writing_score(text: str) -> float:
    text = (text or '').strip()
    if not text:
        return 0.0

    sentences = [s.strip() for s in re.split(r'[.!?।]+', text) if s.strip()]
    words = re.findall(r'\S+', text)

    base = 30
    length_bonus = min(len(words) * 2, 30)
    sentence_bonus = min(len(sentences) * 10, 30)
    latin_penalty = 20 if re.search(r'[A-Za-z]', text) else 0
    score = max(0, min(100, base + length_bonus + sentence_bonus - latin_penalty))
    return round(score, 2)


def speaking_score(expected: str, transcript: str) -> float:
    expected = (expected or '').strip().lower()
    transcript = (transcript or '').strip().lower()
    if not expected or not transcript:
        return 0.0
    return round(SequenceMatcher(None, expected, transcript).ratio() * 100, 2)


def aggregate_writing_score(responses):
    if not responses:
        return 0.0
    scores = [writing_score(item) for item in responses]
    return round(sum(scores) / len(scores), 2)


def aggregate_speaking_score(expected_list, transcript_list):
    if not expected_list or not transcript_list:
        return 0.0
    scores = [
        speaking_score(expected_list[idx], transcript_list[idx] if idx < len(transcript_list) else '')
        for idx in range(len(expected_list))
    ]
    return round(sum(scores) / len(scores), 2)


def promoted_level(current_level: str, score: float) -> tuple[str, bool]:
    current_level = current_level if current_level in LEVELS else 'Beginner'
    if score < 70:
        return current_level, False

    idx = LEVELS.index(current_level)
    if idx == len(LEVELS) - 1:
        return current_level, False
    return LEVELS[idx + 1], True


def build_recommendations(progress: dict):
    tracked_skills = ('reading', 'writing', 'speaking', 'listening')
    rec = []
    for skill in tracked_skills:
        value = float(progress.get(skill, 0))
        if value < 50:
            rec.append(f'{skill.title()}: அடிப்படை பயிற்சியை தினமும் 20 நிமிடம் செய்யவும்.')
        elif value < 75:
            rec.append(f'{skill.title()}: இடைநிலை பயிற்சி தொகுப்பை முடிக்கவும்.')
        else:
            rec.append(f'{skill.title()}: மேம்பட்ட செயல்பாடுகளை தொடரவும்.')
    return rec
