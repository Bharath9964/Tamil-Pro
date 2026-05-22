import { useNavigate } from 'react-router-dom'
import WritingModule from '../components/WritingModule'
import { useAssessment } from '../context/AssessmentContext'

const buttonClass = 'relative overflow-hidden bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out after:absolute after:inset-0 after:bg-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity disabled:opacity-50 disabled:hover:scale-100'

const WritingPage = () => {
  const navigate = useNavigate()
  const {
    content,
    loading,
    error,
    writingIndex,
    setWritingIndex,
    writingResponses,
    setWritingResponse
  } = useAssessment()

  if (loading) {
    return (
      <div className="bg-white/85 backdrop-blur rounded-2xl p-6 shadow-sm animate-pulse space-y-4 mt-6 mb-4">
        <div className="h-6 w-28 rounded bg-gray-200" />
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        <div className="h-32 w-full rounded-2xl bg-gray-200" />
      </div>
    )
  }

  if (error) return <p className="text-red-600 text-sm mt-6">{error}</p>

  const prompts = content?.writingPrompts || []
  if (!prompts.length) return null

  const total = prompts.length
  const currentText = writingResponses[writingIndex] || ''
  const isLast = writingIndex === total - 1

  return (
    <div className="mt-6 mb-4">
      <WritingModule
        prompt={prompts[writingIndex]}
        text={currentText}
        setText={(value) => setWritingResponse(writingIndex, value)}
        currentIndex={writingIndex}
        totalQuestions={total}
      />

      <div className="flex items-center justify-between mt-6">
        <button onClick={() => navigate('/assessment/reading')} className={buttonClass}>Back</button>

        {!isLast ? (
          <button
            disabled={!currentText.trim()}
            onClick={() => setWritingIndex((prev) => prev + 1)}
            className={buttonClass}
          >
            Next
          </button>
        ) : (
          <button
            disabled={!currentText.trim()}
            onClick={() => navigate('/assessment/speaking')}
            className={buttonClass}
          >
            Submit Writing
          </button>
        )}
      </div>
    </div>
  )
}

export default WritingPage
