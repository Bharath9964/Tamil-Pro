import { useEffect, useState } from 'react'

const ReadingModule = ({ content, currentIndex, selectedAnswer, onSelect }) => {
  if (!content) return null
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 80)
    return () => clearTimeout(timer)
  }, [currentIndex])

  const total = content.questions.length
  const progress = Math.round(((currentIndex + 1) / total) * 100)
  const q = content.questions[currentIndex]

  return (
    <section className={`bg-white rounded-2xl shadow-sm hover:shadow-xl p-8 transition-all duration-300 ease-in-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <h2 className="text-3xl font-semibold tracking-tight">Reading</h2>
      <div className="mt-5 flex items-center justify-between text-base text-gray-500">
        <span>Question {currentIndex + 1}/{total}</span>
        <span>{progress}% complete</span>
      </div>
      <div className="mt-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className="h-2 bg-gray-900 transition-all duration-700 ease-in-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-6 border border-gray-200 rounded-2xl p-6 bg-gray-50">
        <p className="text-gray-800 leading-8 text-lg">{content.paragraph}</p>
      </div>

      <div className="mt-8">
        <p className="text-gray-500 text-base">Question {currentIndex + 1}</p>
        <p className="font-semibold text-2xl mt-2 leading-relaxed">{q.question}</p>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          {q.options.map((opt, optIdx) => (
            <label key={opt} className="text-base flex items-center gap-3 border border-gray-200 rounded-2xl p-4 hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 ease-in-out">
              <input type="radio" name={q.id} checked={selectedAnswer === optIdx} onChange={() => onSelect(optIdx)} />
              {opt}
            </label>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReadingModule
