import { useEffect, useRef, useState } from 'react'

const buttonClass = 'relative overflow-hidden bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out after:absolute after:inset-0 after:bg-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity'

const SpeakingModule = ({ expected, transcript, setTranscript, currentIndex = 0, totalQuestions = 1 }) => {
  const [listening, setListening] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 80)
    return () => clearTimeout(timer)
  }, [currentIndex])

  const progress = Math.round(((currentIndex + 1) / totalQuestions) * 100)

  const getSpeechRecognition = () => window.SpeechRecognition || window.webkitSpeechRecognition

  const startSpeech = async () => {
    setError('')
    setStatus('')

    const SpeechRecognition = getSpeechRecognition()
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser. Try Chrome.')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((track) => track.stop())
    } catch {
      setError('Microphone permission denied. Allow microphone access in browser settings.')
      return
    }

    if (recognitionRef.current) recognitionRef.current.abort()

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition
    recognition.lang = 'ta-IN'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setListening(true)
      setStatus('Listening...')
    }

    recognition.onend = () => {
      setListening(false)
      setStatus((prev) => (prev ? prev : 'Stopped listening.'))
    }

    recognition.onresult = (e) => {
      const text = e?.results?.[0]?.[0]?.transcript || ''
      if (!text.trim()) {
        setStatus('No speech detected. Please try again.')
        return
      }
      setTranscript(text.trim())
      setStatus('Speech captured successfully.')
    }

    recognition.onerror = (e) => {
      const code = e?.error || 'unknown'
      const map = {
        'not-allowed': 'Microphone access blocked. Please allow mic permission.',
        'service-not-allowed': 'Speech service blocked by browser/system settings.',
        'no-speech': 'No speech detected. Speak clearly and try again.',
        'audio-capture': 'No microphone detected.',
        aborted: 'Speech recognition was cancelled.',
        network: 'Network error while processing speech.'
      }
      setError(map[code] || `Speech recognition error: ${code}`)
      setListening(false)
    }

    try {
      recognition.start()
    } catch {
      setError('Unable to start speech recognition. Refresh and try again.')
      setListening(false)
    }
  }

  return (
    <section className={`bg-white/85 backdrop-blur rounded-2xl shadow-sm hover:shadow-lg p-6 mt-6 mb-4 transition-all duration-300 ease-in-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <h2 className="text-lg font-semibold">Speaking</h2>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <span>Question {currentIndex + 1}/{totalQuestions}</span>
        <span>{progress}% complete</span>
      </div>
      <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className="h-2 bg-blue-600 transition-all duration-700 ease-in-out" style={{ width: `${progress}%` }} />
      </div>

      <p className="text-gray-500 text-sm mt-4">Expected Sentence</p>
      <p className="text-gray-700 mt-1">{expected}</p>

      <div className="mt-6 flex justify-center">
        <button onClick={startSpeech} disabled={listening} className={`${buttonClass} text-base px-8 py-3 disabled:opacity-60`}>
          {listening ? 'Listening...' : 'Start Speaking'}
        </button>
      </div>

      {listening && (
        <div className="mt-3 flex justify-center">
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600" />
          </span>
        </div>
      )}

      {status && <p className="mt-3 text-sm text-blue-700 text-center">{status}</p>}
      {error && <p className="mt-3 text-sm text-red-600 text-center">{error}</p>}

      <div className="mt-6 border border-gray-200 rounded-2xl p-3 bg-gray-50/80">
        <p className="text-gray-500 text-sm">Transcript</p>
        <p className="text-gray-800 mt-1">{transcript || 'Not captured yet.'}</p>
      </div>
    </section>
  )
}

export default SpeakingModule
