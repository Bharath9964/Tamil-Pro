from app.data.sample_content import READING_PASSAGE, LISTENING_CONTENT, WRITING_PROMPTS, SPEAKING_SENTENCES


def get_content_for_difficulty(difficulty: int):
    return {
        'difficulty': difficulty,
        'reading': READING_PASSAGE,
        'listening': LISTENING_CONTENT,
        'writingPrompts': WRITING_PROMPTS,
        'speakingSentences': SPEAKING_SENTENCES,
        # Backward-compatible keys
        'writingPrompt': WRITING_PROMPTS[0],
        'speakingSentence': SPEAKING_SENTENCES[0]
    }
