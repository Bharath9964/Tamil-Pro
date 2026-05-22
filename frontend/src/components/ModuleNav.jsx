import { NavLink } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext'

const links = [
  { to: '/dashboard', label: 'Overview', key: 'overview' },
  { to: '/assessment/reading', label: 'Reading', key: 'reading' },
  { to: '/assessment/writing', label: 'Writing', key: 'writing' },
  { to: '/assessment/speaking', label: 'Speaking', key: 'speaking' },
  { to: '/assessment/listening', label: 'Listening', key: 'listening' },
  { to: '/assessment/review', label: 'Review', key: 'review' }
]

const ModuleNav = () => {
  const { completion } = useAssessment()

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max">
        {links.map(({ to, label, key }) => {
          const done = completion[key]
          return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-sm border transition ${
                  isActive ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`
              }
            >
              {label} {done ? '•' : ''}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default ModuleNav
