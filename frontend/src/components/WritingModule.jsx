import TamilKeyboard from './TamilKeyboard'
import { useEffect, useState } from 'react'

const grammarHint = (text) => {
  if (!text.trim()) return 'Write at least 2 sentences in Tamil.'
  const hasTamil = /[\u0B80-\u0BFF]/.test(text)
  const sentenceCount = (text.match(/[.!?।]/g) || []).length
  if (!hasTamil) return 'Try adding Tamil words.'
  if (sentenceCount < 2) return 'Add one more sentence for better structure.'
  return 'Grammar structure looks good for this level.'
}

const WritingModule = ({ prompt, text, setText, currentIndex = 0, totalQuestions = 1 }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 80)
    return () => clearTimeout(timer)
  }, [currentIndex])

  const progress = Math.round(((currentIndex + 1) / totalQuestions) * 100)

  return (
    <section className={`bg-white/85 backdrop-blur rounded-2xl shadow-sm hover:shadow-lg p-6 mt-6 mb-4 transition-all duration-300 ease-in-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <h2 className="text-lg font-semibold">Writing</h2>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <span>Question {currentIndex + 1}/{totalQuestions}</span>
        <span>{progress}% complete</span>
      </div>
      <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className="h-2 bg-blue-600 transition-all duration-700 ease-in-out" style={{ width: `${progress}%` }} />
      </div>

      <p className="text-gray-500 text-sm mt-4">Prompt</p>
      <p className="text-gray-700 mt-1">{prompt}</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="border border-gray-200 rounded-2xl p-3 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
        placeholder="தமிழில் எழுதவும்..."
      />

      <p className="text-sm text-gray-500 mt-3">{grammarHint(text)}</p>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <TamilKeyboard
          value={text}
          setValue={(next) => setText(typeof next === 'function' ? next(text) : next)}
        />
      </div>
    </section>
  )
}

export default WritingModule
