import {
  ArrowLeftOnRectangleIcon,
  CheckIcon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { updateDisplayName } from '../api/auth'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'Dashboard', tamil: 'கட்டுப்பாட்டு பலகம்', to: '/dashboard', icon: HomeIcon, end: true },
  { label: 'Assessment', tamil: 'மதிப்பீடு', to: '/assessment', icon: ClipboardDocumentCheckIcon, end: true },
  { label: 'Progress', tamil: 'முன்னேற்றம்', to: '/assessment/review', icon: ChartBarSquareIcon, end: false },
  { label: 'About', tamil: 'இந்த தளம் பற்றி', to: '/about', icon: InformationCircleIcon, end: true },
  { label: 'Team', tamil: 'அணி', to: '/team', icon: UserGroupIcon, end: true }
]

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/assessment': 'Assessment Hub',
  '/assessment/reading': 'Reading Assessment',
  '/assessment/writing': 'Writing Assessment',
  '/assessment/speaking': 'Speaking Assessment',
  '/assessment/listening': 'Listening Assessment',
  '/assessment/review': 'Progress & Review',
  '/about': 'About This Platform',
  '/team': 'Project Team'
}

const pageSubtitles = {
  '/dashboard': 'கட்டுப்பாட்டு பலகம்',
  '/assessment': 'மதிப்பீட்டு மையம்',
  '/assessment/reading': 'வாசிப்பு மதிப்பீடு',
  '/assessment/writing': 'எழுத்து மதிப்பீடு',
  '/assessment/speaking': 'பேச்சு மதிப்பீடு',
  '/assessment/listening': 'கேள்வுணர்வு மதிப்பீடு',
  '/assessment/review': 'முன்னேற்றம் மற்றும் மறுபரிசீலனை',
  '/about': 'இந்த தளம் பற்றி',
  '/team': 'திட்ட அணி'
}

const buttonClass =
  'rounded-full px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm hover:shadow-md hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300'

const navClass = ({ isActive }) =>
  `group relative flex items-center gap-3 px-4 py-3 rounded-2xl border text-base font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
    isActive
      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500/40 shadow-[0_12px_24px_-18px_rgba(37,99,235,0.85)]'
      : 'text-slate-600 bg-white/70 border-transparent hover:bg-white hover:text-slate-900 hover:border-slate-200 hover:shadow-sm'
  }`

const AppShell = () => {
  const { user, logout, setUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(user?.displayName || user?.username || '')
  const [nameLoading, setNameLoading] = useState(false)
  const [nameError, setNameError] = useState('')

  const onLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  const onStartEditName = () => {
    setNameError('')
    setNameInput(user?.displayName || user?.username || '')
    setEditingName(true)
  }

  const onSaveName = async () => {
    const trimmed = nameInput.trim()
    if (trimmed.length < 3) {
      setNameError('Name must be at least 3 characters')
      return
    }

    setNameLoading(true)
    setNameError('')
    try {
      const { data } = await updateDisplayName({ displayName: trimmed })
      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      setEditingName(false)
    } catch (err) {
      setNameError(err.response?.data?.error || 'Unable to update name')
    } finally {
      setNameLoading(false)
    }
  }

  const title = pageTitles[location.pathname] || 'TamilPro'
  const subtitle = pageSubtitles[location.pathname] || 'தமிழ் திறன் தளம்'

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-100/40 text-slate-900">
      <div className="flex h-full overflow-hidden">
        <aside className="relative hidden md:flex md:w-72 md:fixed md:inset-y-0 md:left-0 bg-gradient-to-b from-white via-blue-50/40 to-indigo-50/50 border-r border-slate-200/70 flex-col p-8 overflow-hidden">
          <div className="absolute -top-12 -left-10 h-36 w-36 rounded-full bg-blue-400/15 blur-2xl pointer-events-none" />
          <div className="absolute bottom-10 -right-10 h-40 w-40 rounded-full bg-indigo-400/15 blur-2xl pointer-events-none" />
          <h1 className="brand-logo text-3xl">TamilPro</h1>
          <p className="text-sm text-slate-500 mt-1">Assessment workspace</p>
          <p className="tamil-subtle text-slate-600">மதிப்பீட்டு பணிச்சூழல்</p>
          <nav className="space-y-3 flex-1 mt-10">
            {navItems.map(({ label, tamil, to, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={navClass}>
                <Icon className="h-6 w-6" />
                <div className="leading-tight">
                  <p>{label}</p>
                  <p className="tamil-subtle">{tamil}</p>
                </div>
              </NavLink>
            ))}
          </nav>
          <button onClick={onLogout} className={`${buttonClass} w-full flex items-center justify-center gap-2 mt-6`}>
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <div className="text-left leading-tight">
              <p>Logout</p>
              <p className="tamil-subtle text-white/85">வெளியேறு</p>
            </div>
          </button>
        </aside>

        <div className="flex-1 md:ml-72 flex flex-col min-h-0">
          <header className="bg-white/90 backdrop-blur border-b border-slate-200/80 px-8 py-5 flex items-center justify-between gap-4">
            <div className="truncate">
              <h2 className="text-3xl font-semibold tracking-tight truncate">{title}</h2>
              <p className="tamil-subtle text-slate-600 truncate">{subtitle}</p>
            </div>
            <div className="flex items-center gap-4 min-w-0">
              <div className="hidden sm:flex flex-col items-end min-w-0">
                {editingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={nameInput}
                      onChange={(event) => setNameInput(event.target.value)}
                      className="w-44 rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Display name"
                    />
                    <button
                      type="button"
                      onClick={onSaveName}
                      disabled={nameLoading}
                      className="rounded-lg border border-emerald-300 bg-emerald-50 p-1.5 text-emerald-700 hover:bg-emerald-100 disabled:opacity-60"
                      title="Save name"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingName(false)
                        setNameError('')
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-base text-slate-500 truncate max-w-44">{user?.displayName || user?.username}</span>
                    <button
                      type="button"
                      onClick={onStartEditName}
                      className="rounded-lg border border-slate-300 bg-white p-1.5 text-slate-600 hover:bg-slate-50"
                      title="Edit profile name"
                    >
                      <PencilSquareIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
              </div>
              <button onClick={onLogout} className={`${buttonClass} md:hidden`}>Logout</button>
            </div>
          </header>

          <nav className="md:hidden bg-white/90 backdrop-blur border-b border-slate-200/80 px-5 py-3 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {navItems.map(({ label, tamil, to, icon: Icon, end }) => (
                <NavLink key={to} to={to} end={end} className={navClass}>
                  <Icon className="h-5 w-5" />
                  <div className="leading-tight">
                    <p>{label}</p>
                    <p className="tamil-subtle">{tamil}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </nav>

          <main className="flex-1 overflow-y-auto px-5 py-8 md:px-8 md:py-10">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AppShell
