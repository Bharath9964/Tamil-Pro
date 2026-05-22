import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, saveAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const nextPath = location.state?.from || '/dashboard'
  const isDisabled = loading || !username.trim() || !password

  // Prevent authenticated users from staying on the auth page.
  useEffect(() => {
    if (user) navigate(nextPath, { replace: true })
  }, [user, navigate, nextPath])

  const submit = async (e) => {
    e.preventDefault()
    if (isDisabled) return
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      if (isLogin) {
        const { data } = await loginUser({ username, password })
        saveAuth(data.token, data.user)
        navigate(nextPath, { replace: true })
      } else {
        await registerUser({ username, password })
        setSuccess('Account created successfully')
        setIsLogin(true)
        setPassword('')
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-amber-50 p-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] blur-[1px] bg-center bg-cover" style={{ backgroundImage: "url('/heritage/kalvettu-3.jpg')" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] blur-[2px] bg-center bg-cover mix-blend-multiply" style={{ backgroundImage: "url('/heritage/kalvettu-2.jpg')" }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-200/35 via-transparent to-indigo-100/40" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-rose-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
      <div className="absolute left-6 top-6">
        <h1 className="brand-logo text-3xl">
          TamilPro
        </h1>
        <p className="tamil-subtle text-slate-600">தமிழ் திறன் மதிப்பீடு</p>
      </div>

      <form onSubmit={submit} className="relative auth-fade-in bg-white/95 backdrop-blur p-8 rounded-2xl shadow-md w-96 border border-white/70">
        <h1 className="text-2xl font-bold text-slate-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="tamil-subtle text-slate-700">{isLogin ? 'மீண்டும் வரவேற்கிறோம்' : 'புதிய கணக்கு உருவாக்கவும்'}</p>
        <p className="text-sm text-slate-600 mt-1">Tamil Proficiency App</p>

        <div className="mt-4 flex rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true)
              setError('')
              setSuccess('')
            }}
            className={`flex-1 py-2 rounded-md text-sm ${isLogin ? 'bg-white shadow' : ''}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false)
              setError('')
              setSuccess('')
            }}
            className={`flex-1 py-2 rounded-md text-sm ${!isLogin ? 'bg-white shadow' : ''}`}
          >
            Register
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-emerald-600 text-sm mt-2">{success}</p>}

        <div className="mt-4 space-y-3">
          <input
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-black outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-black outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          disabled={isDisabled}
          className="mt-5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-300 text-amber-950 border border-amber-300 rounded-full py-2 w-full hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100 font-semibold"
        >
          {loading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}

export default AuthPage
