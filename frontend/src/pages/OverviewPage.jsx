import { ArrowTrendingUpIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useLocation, Link } from 'react-router-dom'
import DashboardCards from '../components/DashboardCards'
import { useAuth } from '../context/AuthContext'
import { useAssessment } from '../context/AssessmentContext'

const buttonClass = 'bg-black text-white rounded-full px-6 py-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 ease-in-out'

const OverviewPage = () => {
  const location = useLocation()
  const { user } = useAuth()
  const { loading, error, content } = useAssessment()
  const assessmentMessage = location.state?.assessmentMessage || user?.progress?.improvement_message

  return (
    <div className="py-2 space-y-10">
      <section className="bg-gradient-to-b from-slate-50 to-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out px-8 py-10 text-center">
        <SparklesIcon className="h-10 w-10 mx-auto text-violet-600" />
        <h2 className="text-4xl font-semibold tracking-tight mt-6">Sharpen Your Tamil Proficiency</h2>
        <p className="tamil-subtle text-slate-700">உங்கள் தமிழ் திறனை மேலும் மேம்படுத்துங்கள்</p>
        <p className="text-gray-500 text-lg mt-3 max-w-3xl mx-auto">Measure reading, writing, speaking, and listening with a clean adaptive assessment journey.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/assessment" className={buttonClass}>Start Assessment</Link>
          <Link to="/assessment/review" className={buttonClass}>View Progress</Link>
        </div>
        {assessmentMessage && <p className="text-sm mt-4 text-gray-700">{assessmentMessage}</p>}
      </section>

      <section>
        <h3 className="text-3xl font-semibold tracking-tight mb-6">Performance Dashboard</h3>
        <p className="tamil-subtle text-slate-700 -mt-4 mb-6">செயல்திறன் கட்டுப்பாட்டு பலகம்</p>
        {loading ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-4 w-24 bg-gray-200 rounded mb-5" />
                <div className="h-8 w-20 bg-gray-200 rounded mb-5" />
                <div className="h-2 w-full bg-gray-200 rounded" />
              </div>
            ))}
          </section>
        ) : (
          <DashboardCards level={user?.level || 'Beginner'} progress={user?.progress || {}} />
        )}
      </section>

      <section className="grid lg:grid-cols-2 gap-6 border-t border-gray-200 pt-8">
        <div className="bg-gradient-to-b from-indigo-50 to-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out p-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-semibold tracking-tight">Assessment Flow</h3>
            <ArrowTrendingUpIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="tamil-subtle text-slate-700">மதிப்பீட்டு செயல்முறை ஓட்டம்</p>
          <p className="text-gray-500 text-lg mt-4 leading-relaxed">Choose modules in any order, then submit once all sections are completed.</p>
          <div className="mt-8">
            <Link to="/assessment" className={buttonClass}>Open Assessment Hub</Link>
          </div>
        </div>

        <div className="bg-gradient-to-b from-emerald-50 to-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out p-8 border border-gray-100">
          <h3 className="text-3xl font-semibold tracking-tight">Performance Snapshot</h3>
          <p className="tamil-subtle text-slate-700">செயல்திறன் சுருக்க பார்வை</p>
          {loading && (
            <div className="mt-4 space-y-3 animate-pulse">
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="h-8 w-20 rounded bg-gray-200" />
            </div>
          )}
          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
          {!loading && !error && (
            <>
              <p className="text-gray-500 text-base mt-5">Adaptive Difficulty</p>
              <p className="tamil-subtle text-slate-600">தழுவும் சிரம நிலை</p>
              <p className="text-3xl font-semibold mt-1">{content?.difficulty || 1}</p>

              <p className="text-gray-500 text-base mt-6">Last Score</p>
              <p className="tamil-subtle text-slate-600">சமீபத்திய மதிப்பெண்</p>
              <p className="text-3xl font-semibold mt-1">{user?.progress?.last_score || 0}%</p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default OverviewPage
