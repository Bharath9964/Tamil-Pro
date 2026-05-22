import { useNavigate } from 'react-router-dom'
import ReadingModule from '../components/ReadingModule'
import { useAssessment } from '../context/AssessmentContext'

const buttonClass = 'bg-black text-white rounded-full px-6 py-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:hover:scale-100'

const ReadingPage = () => {
  const navigate = useNavigate()
  const { content, loading, error, readingIndex, setReadingIndex, readingAnswers, setReadingAnswer } = useAssessment()

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm animate-pulse space-y-4">
        <div className="h-8 w-36 rounded bg-gray-200" />
        <div className="h-24 w-full rounded-2xl bg-gray-200" />
        <div className="h-16 w-full rounded-2xl bg-gray-200" />
      </div>
    )
  }

  if (error) return <p className="text-red-600 text-sm mt-6">{error}</p>
  if (!content?.reading) return null

  const total = content.reading.questions.length
  const selected = readingAnswers[readingIndex]
  const isLast = readingIndex === total - 1

  return (
    <div className="space-y-8">
      <ReadingModule
        content={content.reading}
        currentIndex={readingIndex}
        selectedAnswer={selected}
        onSelect={(value) => setReadingAnswer(readingIndex, value)}
      />

      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/assessment')} className={buttonClass}>Back</button>

        {!isLast ? (
          <button
            disabled={!Number.isInteger(selected)}
            onClick={() => setReadingIndex((prev) => prev + 1)}
            className={buttonClass}
          >
            Next
          </button>
        ) : (
          <button
            disabled={!Number.isInteger(selected)}
            onClick={() => navigate('/assessment/writing')}
            className={buttonClass}
          >
            Submit Reading
          </button>
        )}
      </div>
    </div>
  )
}

export default ReadingPage
