import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navClass = ({ isActive }) =>
  `text-sm px-3 py-1.5 rounded-md transition ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <nav className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-slate-800">Tamil Proficiency Assessment</h1>
          <span className="hidden md:inline text-xs px-2 py-1 rounded-full bg-sky-100 text-sky-700">Live Training</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
          <NavLink to="/assessment/review" className={navClass}>Review</NavLink>
          <span className="text-sm text-slate-600 px-1">{user?.username}</span>
          <button onClick={onLogout} className="px-3 py-1.5 rounded-md bg-slate-900 text-white text-sm hover:bg-slate-700">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
