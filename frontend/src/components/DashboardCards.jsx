import {
  BookOpenIcon,
  MicrophoneIcon,
  PencilSquareIcon,
  SignalIcon,
  SpeakerWaveIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { levelColor } from '../utils/levelBadge'

const baseCardClass = 'bg-white rounded-2xl shadow-sm p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out'
const skillTheme = {
  Reading: { icon: 'text-indigo-600', bar: 'bg-indigo-500' },
  Writing: { icon: 'text-emerald-600', bar: 'bg-emerald-500' },
  Speaking: { icon: 'text-rose-600', bar: 'bg-rose-500' },
  Listening: { icon: 'text-amber-600', bar: 'bg-amber-500' }
}

const AnimatedCard = ({ delay = 0, children }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`${baseCardClass} ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      {children}
    </div>
  )
}

const SkillCard = ({ title, value, icon: Icon, delay }) => {
  const theme = skillTheme[title] || { icon: 'text-gray-900', bar: 'bg-gray-900' }
  const [fill, setFill] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setFill(value), 120)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <AnimatedCard delay={delay}>
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">{title}</p>
        <Icon className={`h-5 w-5 ${theme.icon}`} />
      </div>
      <p className="text-xl font-bold mt-4">{value}%</p>
      <div className="mt-4 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
        <div className={`h-2 rounded-full ${theme.bar} transition-all duration-700 ease-in-out`} style={{ width: `${fill}%` }} />
      </div>
    </AnimatedCard>
  )
}

const DashboardCards = ({ level, progress }) => {
  const overall = progress?.overall || 0
  const [overallFill, setOverallFill] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setOverallFill(overall), 120)
    return () => clearTimeout(timer)
  }, [overall])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatedCard delay={0}>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm">Level</p>
          <StarIcon className="h-5 w-5 text-violet-600" />
        </div>
        <span className={`inline-flex mt-4 px-3 py-1 rounded-full text-sm ${levelColor(level)}`}>{level}</span>
      </AnimatedCard>

      <AnimatedCard delay={100}>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm">Progress</p>
          <SignalIcon className="h-5 w-5 text-sky-600" />
        </div>
        <p className="text-xl font-bold mt-4">{overall}%</p>
        <div className="mt-4 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
          <div className="h-2 rounded-full bg-sky-500 transition-all duration-700 ease-in-out" style={{ width: `${overallFill}%` }} />
        </div>
      </AnimatedCard>

      <SkillCard title="Reading" value={progress?.reading || 0} icon={BookOpenIcon} delay={200} />
      <SkillCard title="Writing" value={progress?.writing || 0} icon={PencilSquareIcon} delay={300} />
      <SkillCard title="Speaking" value={progress?.speaking || 0} icon={MicrophoneIcon} delay={400} />
      <SkillCard title="Listening" value={progress?.listening || 0} icon={SpeakerWaveIcon} delay={500} />
    </div>
  )
}

export default DashboardCards
