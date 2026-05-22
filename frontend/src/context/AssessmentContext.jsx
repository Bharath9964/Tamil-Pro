import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getContent, submitTest } from '../api/test'
import { useAuth } from './AuthContext'

const AssessmentContext = createContext(null)

const isAllAnswered = (arr = [], size = 0) => arr.length === size && arr.every((value) => Number.isInteger(value))

const updateAt = (arr, idx, value) => {
  const next = [...arr]
  next[idx] = value
  return next
}

export const AssessmentProvider = ({ children }) => {
  const { user, setUser } = useAuth()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [readingAnswers, setReadingAnswers] = useState([])
  const [listeningAnswers, setListeningAnswers] = useState([])
  const [writingResponses, setWritingResponses] = useState([])
  const [speakingTranscripts, setSpeakingTranscripts] = useState([])

  const [readingIndex, setReadingIndex] = useState(0)
  const [listeningIndex, setListeningIndex] = useState(0)
  const [writingIndex, setWritingIndex] = useState(0)
  const [speakingIndex, setSpeakingIndex] = useState(0)

  const [recommendations, setRecommendations] = useState([])
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [lastResult, setLastResult] = useState(null)

  const loadContent = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await getContent()
      setContent(data)
      setReadingIndex(0)
      setListeningIndex(0)
      setWritingIndex(0)
      setSpeakingIndex(0)
      setReadingAnswers([])
      setListeningAnswers([])
      setWritingResponses([])
      setSpeakingTranscripts([])
    } catch {
      setError('Unable to load assessment content right now.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) loadContent()
  }, [user?.id])

  const setReadingAnswer = (idx, value) => setReadingAnswers((prev) => updateAt(prev, idx, value))
  const setListeningAnswer = (idx, value) => setListeningAnswers((prev) => updateAt(prev, idx, value))
  const setWritingResponse = (idx, value) => setWritingResponses((prev) => updateAt(prev, idx, value))
  const setSpeakingTranscriptAt = (idx, value) => setSpeakingTranscripts((prev) => updateAt(prev, idx, value))

  const submitAssessment = async () => {
    if (!content) return null
    setSubmitLoading(true)
    setSubmitMessage('')
    try {
      const { data } = await submitTest({
        readingAnswers,
        listeningAnswers,
        writingResponses,
        speakingExpectedList: content.speakingSentences || [],
        speakingTranscripts
      })

      const updatedUser = { ...user, level: data.level, progress: data.progress }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setRecommendations(data.recommendations)
      setSubmitMessage(data.message)
      setLastResult(data)
      return data
    } catch {
      setSubmitMessage('Submission failed. Please verify answers and try again.')
      return null
    } finally {
      setSubmitLoading(false)
    }
  }

  const completion = useMemo(() => {
    const readingCount = content?.reading?.questions?.length || 0
    const listeningCount = content?.listening?.questions?.length || 0
    const writingCount = content?.writingPrompts?.length || 0
    const speakingCount = content?.speakingSentences?.length || 0

    return {
      reading: isAllAnswered(readingAnswers, readingCount),
      writing: writingResponses.length === writingCount && writingResponses.every((value) => (value || '').trim().length > 0),
      speaking: speakingTranscripts.length === speakingCount && speakingTranscripts.every((value) => (value || '').trim().length > 0),
      listening: isAllAnswered(listeningAnswers, listeningCount)
    }
  }, [content, readingAnswers, listeningAnswers, writingResponses, speakingTranscripts])

  const value = {
    content,
    loading,
    error,
    loadContent,

    readingAnswers,
    listeningAnswers,
    writingResponses,
    speakingTranscripts,

    readingIndex,
    listeningIndex,
    writingIndex,
    speakingIndex,

    setReadingIndex,
    setListeningIndex,
    setWritingIndex,
    setSpeakingIndex,

    setReadingAnswer,
    setListeningAnswer,
    setWritingResponse,
    setSpeakingTranscriptAt,

    recommendations,
    submitMessage,
    submitLoading,
    submitAssessment,
    lastResult,
    completion
  }

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>
}

export const useAssessment = () => useContext(AssessmentContext)
