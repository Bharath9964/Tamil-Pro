import { useNavigate } from 'react-router-dom'
import SpeakingModule from '../components/SpeakingModule'
import { useAssessment } from '../context/AssessmentContext'

const buttonClass = 'relative overflow-hidden bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out after:absolute after:inset-0 after:bg-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity disabled:opacity-50 disabled:hover:scale-100'

const SpeakingPage = () => {
  const navigate = useNavigate()
  const {
    content,
    speakingIndex,
    setSpeakingIndex,
    speakingTranscripts,
    setSpeakingTranscriptAt
  } = useAssessment()

  const sentences = content?.speakingSentences || []
  if (!sentences.length) {
    return (
      <div className="bg-white/85 backdrop-blur rounded-2xl p-6 shadow-sm animate-pulse space-y-4 mt-6 mb-4">
        <div className="h-6 w-28 rounded bg-gray-200" />
        <div className="h-6 w-2/3 rounded bg-gray-200" />
        <div className="h-14 w-40 rounded-2xl bg-gray-200 mx-auto" />
      </div>
    )
  }

  const total = sentences.length
  const transcript = speakingTranscripts[speakingIndex] || ''
  const isLast = speakingIndex === total - 1

  return (
    <div className="mt-6 mb-4">
      <SpeakingModule
        expected={sentences[speakingIndex]}
        transcript={transcript}
        setTranscript={(value) => setSpeakingTranscriptAt(speakingIndex, value)}
        currentIndex={speakingIndex}
        totalQuestions={total}
      />

      <div className="flex items-center justify-between mt-6">
        <button onClick={() => navigate('/assessment/writing')} className={buttonClass}>Back</button>

        {!isLast ? (
          <button
            disabled={!transcript.trim()}
            onClick={() => setSpeakingIndex((prev) => prev + 1)}
            className={buttonClass}
          >
            Next
          </button>
        ) : (
          <button
            disabled={!transcript.trim()}
            onClick={() => navigate('/assessment/listening')}
            className={buttonClass}
          >
            Submit Speaking
          </button>
        )}
      </div>
    </div>
  )
}

export default SpeakingPage
