import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAssessment } from '../context/AssessmentContext'

const buttonClass = 'bg-black text-white rounded-full px-6 py-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-in-out'
const playButtonClass = 'rounded-full bg-black text-white p-3 hover:scale-110 transition-all duration-300 ease-in-out animate-pulse'

const celebrationMessages = {
  Beginner: 'Great Start! Keep Going 💪',
  Intermediate: 'Nice Progress! You\'re improving 🚀',
  Advanced: 'Excellent! Tamil Pro Achieved 🎉'
}

const getCelebrationMessage = (level) => celebrationMessages[level] || celebrationMessages.Beginner

const playSuccessTone = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = 520
    gain.gain.value = 0.12
    oscillator.connect(gain)
    gain.connect(audioCtx.destination)
    oscillator.start()
    oscillator.stop(audioCtx.currentTime + 0.18)
  } catch (e) {
    // ignore unsupported browsers
  }
}

const ReviewItem = ({ label, done }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0 transition-all duration-300 ease-in-out">
    <div>
      <p className="text-lg text-gray-800">{label}</p>
      <p className="tamil-subtle text-slate-600">
        {label === 'Reading' && 'வாசிப்பு'}
        {label === 'Writing' && 'எழுத்து'}
        {label === 'Speaking' && 'பேச்சு'}
        {label === 'Listening' && 'கேள்வுணர்வு'}
      </p>
    </div>
    <span className={`text-sm px-3 py-1 rounded-full flex items-center gap-1 ${done ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
      {done ? <CheckCircleIcon className="h-4 w-4" /> : <ClockIcon className="h-4 w-4" />}
      {done ? 'Completed' : 'Pending'}
    </span>
  </div>
)

const ReviewPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { completion, recommendations, submitMessage, submitLoading, submitAssessment, lastResult } = useAssessment()
  const [celebrationOpen, setCelebrationOpen] = useState(false)
  const [celebrationKey, setCelebrationKey] = useState(0)

  useEffect(() => {
    let timer
    if (celebrationOpen) {
      timer = window.setTimeout(() => setCelebrationOpen(false), 4200)
    }
    return () => window.clearTimeout(timer)
  }, [celebrationOpen])

  const onPlayCelebrate = () => {
    setCelebrationKey((current) => current + 1)
    setCelebrationOpen(true)
    playSuccessTone()
  }

  const onSubmit = async () => {
    const result = await submitAssessment()
    if (result?.passed) {
      navigate('/dashboard', {
        replace: true,
        state: { assessmentMessage: result.message }
      })
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <section className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out p-8">
        <h2 className="text-3xl font-semibold tracking-tight">Review & Submit</h2>
        <p className="tamil-subtle text-slate-700">பரிசீலித்து சமர்ப்பிக்கவும்</p>
        <p className="text-gray-500 text-lg mt-3">Confirm all modules before final submission.</p>

        <div className="mt-8 border-t border-gray-100">
          <ReviewItem label="Reading" done={completion.reading} />
          <ReviewItem label="Writing" done={completion.writing} />
          <ReviewItem label="Speaking" done={completion.speaking} />
          <ReviewItem label="Listening" done={completion.listening} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={onSubmit} disabled={submitLoading} className={`${buttonClass} disabled:opacity-50`}>
            {submitLoading ? 'Submitting...' : 'Submit Placement Test'}
          </button>
          <button onClick={() => navigate('/assessment')} className={buttonClass}>Edit Answers</button>
        </div>

        {submitMessage && <p className={`mt-4 text-base ${lastResult?.passed ? 'text-gray-900' : 'text-gray-600'}`}>{submitMessage}</p>}
      </section>

      <section className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out p-8">
        <h3 className="text-3xl font-semibold tracking-tight">Progress Summary</h3>
        <p className="tamil-subtle text-slate-700">முன்னேற்ற சுருக்கம்</p>
        <p className="text-gray-500 text-lg mt-4">Current level</p>
        <p className="tamil-subtle text-slate-600">தற்போதைய நிலை</p>
        <p className="text-4xl font-semibold mt-1">{user?.level || 'Beginner'}</p>

        <p className="text-gray-500 text-lg mt-8">Last score</p>
        <p className="tamil-subtle text-slate-600">சமீபத்திய மதிப்பெண்</p>
        <div className="flex items-center gap-4 mt-1">
          <p className="text-4xl font-semibold">{user?.progress?.last_score || 0}%</p>
          <button onClick={onPlayCelebrate} type="button" className={playButtonClass} aria-label="Play celebration">
            ▶
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
          Tap the play button for a quick motivational boost.
        </div>

        <div className="relative">
          {celebrationOpen && (
            <div className="celebration-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-sm transition-all duration-300">
              <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/95 dark:bg-gray-900/95 p-8 shadow-2xl shadow-black/20 text-center transition-all duration-300">
                <button
                  onClick={() => setCelebrationOpen(false)}
                  className="absolute right-4 top-4 rounded-full bg-black text-white p-2 hover:scale-110 transition-all duration-200"
                  aria-label="Close celebration"
                >
                  ×
                </button>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">{getCelebrationMessage(user?.level || 'Beginner')}</p>
                <p className="tamil-subtle text-slate-600 dark:text-slate-300 mt-2">A little cheer for your progress.</p>
                <div className="mt-8 grid grid-cols-4 gap-3">
                  {[...Array(8)].map((_, index) => (
                    <div
                      key={`${celebrationKey}-${index}`}
                      className={`celebration-shape ${index % 2 === 0 ? 'bg-sky-500' : 'bg-amber-400'} ${index % 3 === 0 ? 'celebration-star' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <h4 className="text-2xl font-semibold mt-10">Recommendations</h4>
        <p className="tamil-subtle text-slate-600">பரிந்துரைகள்</p>
        {recommendations.length === 0 ? (
          <p className="text-gray-500 text-base mt-3">Submit once to get personalized recommendations.</p>
        ) : (
          <ul className="mt-4 space-y-3 text-base text-gray-700 list-disc list-inside">
            {recommendations.map((rec) => <li key={rec}>{rec}</li>)}
          </ul>
        )}
      </section>
    </div>
  )
}

export default ReviewPage
