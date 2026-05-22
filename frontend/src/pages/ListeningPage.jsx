import { useNavigate } from 'react-router-dom'
import ListeningModule from '../components/ListeningModule'
import { useAssessment } from '../context/AssessmentContext'

const buttonClass = 'bg-black text-white rounded-full px-6 py-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:hover:scale-100'

const ListeningPage = () => {
  const navigate = useNavigate()
  const { content, listeningIndex, setListeningIndex, listeningAnswers, setListeningAnswer } = useAssessment()

  if (!content?.listening) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm animate-pulse space-y-4">
        <div className="h-8 w-36 rounded bg-gray-200" />
        <div className="h-10 w-full rounded-2xl bg-gray-200" />
        <div className="h-16 w-full rounded-2xl bg-gray-200" />
      </div>
    )
  }

  const total = content.listening.questions.length
  const selected = listeningAnswers[listeningIndex]
  const isLast = listeningIndex === total - 1

  return (
    <div className="space-y-8">
      <ListeningModule
        content={content.listening}
        currentIndex={listeningIndex}
        selectedAnswer={selected}
        onSelect={(value) => setListeningAnswer(listeningIndex, value)}
      />

      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/assessment/speaking')} className={buttonClass}>Back</button>

        {!isLast ? (
          <button
            disabled={!Number.isInteger(selected)}
            onClick={() => setListeningIndex((prev) => prev + 1)}
            className={buttonClass}
          >
            Next
          </button>
        ) : (
          <button
            disabled={!Number.isInteger(selected)}
            onClick={() => navigate('/assessment/review')}
            className={buttonClass}
          >
            Submit Listening
          </button>
        )}
      </div>
    </div>
  )
}

export default ListeningPage
