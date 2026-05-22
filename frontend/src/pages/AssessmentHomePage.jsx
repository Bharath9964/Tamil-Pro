import {
  BookOpenIcon,
  MicrophoneIcon,
  PencilSquareIcon,
  QueueListIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext'

const modules = [
  { key: 'reading', title: 'Reading', tamil: 'வாசிப்பு', desc: 'Read Tamil passage and answer MCQs.', to: '/assessment/reading', icon: BookOpenIcon, accent: 'from-indigo-50 to-white', iconColor: 'text-indigo-600', chip: 'bg-indigo-50 text-indigo-700' },
  { key: 'writing', title: 'Writing', tamil: 'எழுத்து', desc: 'Answer Tamil writing prompts with keyboard support.', to: '/assessment/writing', icon: PencilSquareIcon, accent: 'from-emerald-50 to-white', iconColor: 'text-emerald-600', chip: 'bg-emerald-50 text-emerald-700' },
  { key: 'speaking', title: 'Speaking', tamil: 'பேச்சு', desc: 'Speak Tamil sentences and capture transcript.', to: '/assessment/speaking', icon: MicrophoneIcon, accent: 'from-rose-50 to-white', iconColor: 'text-rose-600', chip: 'bg-rose-50 text-rose-700' },
  { key: 'listening', title: 'Listening', tamil: 'கேள்வுணர்வு', desc: 'Listen to audio and answer questions.', to: '/assessment/listening', icon: SpeakerWaveIcon, accent: 'from-amber-50 to-white', iconColor: 'text-amber-600', chip: 'bg-amber-50 text-amber-700' }
]

const buttonClass = 'bg-black text-white rounded-full px-6 py-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-in-out'

const TamilTicker = () => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4 overflow-hidden">
    <div className="tamil-ticker whitespace-nowrap text-gray-800 font-medium text-base">
      "கற்க கசடற கற்பவை கற்றபின்" • "யாதும் ஊரே யாவரும் கேளிர்" • "உழைப்புக்கு மாற்று இல்லை"
    </div>
  </div>
)

const AssessmentHomePage = () => {
  const { completion } = useAssessment()

  return (
    <div className="py-4 space-y-10">
      <section className="bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out px-8 py-10 text-center">
        <QueueListIcon className="h-10 w-10 mx-auto text-indigo-600" />
        <h2 className="text-4xl font-semibold tracking-tight mt-6">Choose Your Assessment Path</h2>
        <p className="tamil-subtle text-slate-700">உங்கள் மதிப்பீட்டு பாதையைத் தேர்வு செய்யுங்கள்</p>
        <p className="text-gray-500 text-lg mt-3 max-w-3xl mx-auto">Pick any module first. Complete in your preferred order and submit once all are done.</p>
        <div className="mt-8 flex justify-center">
          <Link to="/assessment/reading" className={buttonClass}>Start Now</Link>
        </div>
      </section>

      <TamilTicker />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map(({ key, title, tamil, desc, to, icon: Icon, accent, iconColor, chip }, idx) => {
          const done = completion[key]
          return (
            <article
              key={to}
              className={`bg-gradient-to-b ${accent} rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out p-8 border border-gray-100`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight">{title}</h3>
                  <p className="tamil-subtle text-slate-700">{tamil}</p>
                  <p className="text-gray-500 text-base mt-3 leading-relaxed">{desc}</p>
                </div>
                <Icon className={`h-8 w-8 ${iconColor}`} />
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className={`text-sm px-3 py-1 rounded-full ${done ? 'bg-gray-900 text-white' : chip}`}>
                  {done ? 'Completed' : 'Pending'}
                </span>
                <Link to={to} className={buttonClass}>Open</Link>
              </div>
            </article>
          )
        })}
      </section>

      <section className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out px-8 py-10 flex items-center justify-between gap-6 flex-wrap border-t border-gray-100">
        <div>
          <h3 className="text-3xl font-semibold tracking-tight">Ready to submit your full assessment?</h3>
          <p className="tamil-subtle text-slate-700">முழு மதிப்பீட்டை சமர்ப்பிக்க தயாரா?</p>
          <p className="text-gray-500 text-lg mt-3">Open Progress to review status and submit final score.</p>
        </div>
        <Link to="/assessment/review" className={buttonClass}>Go to Progress</Link>
      </section>
    </div>
  )
}

export default AssessmentHomePage
