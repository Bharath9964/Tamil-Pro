import { AcademicCapIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const ctaClass =
  'rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_12px_24px_-18px_rgba(37,99,235,0.95)] hover:shadow-[0_18px_28px_-16px_rgba(37,99,235,1)] hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all duration-300 ease-in-out'
const goldCtaClass =
  'rounded-full px-6 py-3 text-sm font-semibold text-amber-950 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-200 border border-amber-300 shadow-[0_12px_24px_-18px_rgba(245,158,11,0.95)] hover:shadow-[0_18px_30px_-16px_rgba(245,158,11,1)] hover:-translate-y-0.5 hover:from-amber-400 hover:to-yellow-300 active:scale-[0.98] transition-all duration-300 ease-in-out'

const PublicLandingPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-amber-50/70 to-sky-100 text-slate-900 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] blur-[1px] bg-center bg-cover" style={{ backgroundImage: "url('/heritage/kalvettu-1.jpg')" }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] blur-[2px] bg-center bg-cover mix-blend-multiply" style={{ backgroundImage: "url('/heritage/kalvettu-2.jpg')" }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-200/35 via-transparent to-cyan-100/45" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(251,191,36,0.22),transparent_38%),radial-gradient(circle_at_82%_78%,rgba(59,130,246,0.16),transparent_34%)]" />
      <div className="pointer-events-none absolute -top-20 -right-24 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-28 h-96 w-96 rounded-full bg-amber-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white/70 backdrop-blur px-4 py-3 shadow-[0_14px_34px_-24px_rgba(245,158,11,0.95)] hover:shadow-[0_22px_44px_-24px_rgba(245,158,11,1)] hover:-translate-y-0.5 transition-all duration-300">
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] bg-center bg-cover" style={{ backgroundImage: "url('/heritage/kalvettu-3.jpg')" }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/20 via-transparent to-amber-900/20" />
          <h1 className="brand-logo text-3xl">
            TamilPro
          </h1>
          <p className="tamil-subtle text-slate-600">தமிழ் திறன் மதிப்பீட்டு தளம்</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/auth" className="rounded-full px-5 py-2 border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition">
            Login
          </Link>
          <Link to="/auth" className={goldCtaClass}>Sign Up</Link>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-6 py-10">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-amber-50/60 to-sky-50/55 backdrop-blur-md border border-white/80 shadow-[0_28px_56px_-32px_rgba(15,23,42,0.45)] hover:shadow-[0_34px_64px_-30px_rgba(15,23,42,0.55)] transition-all duration-300 p-8 md:p-12">
          <div className="pointer-events-none absolute -right-24 -bottom-20 h-72 w-72 rounded-full bg-gradient-to-br from-amber-300/35 to-orange-200/20 blur-3xl" />
          <div className="pointer-events-none absolute top-0 left-0 h-56 w-56 rounded-full bg-gradient-to-br from-blue-300/20 to-indigo-200/10 blur-3xl" />
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
                Learn Tamil with a modern, clear, and structured assessment experience.
              </h2>
              <p className="tamil-subtle text-slate-700">தமிழை தெளிவாகவும் நவீன முறையிலும் மதிப்பிடுங்கள்</p>
              <p className="text-slate-600 text-lg mt-4">
                Explore your Reading, Writing, Speaking, and Listening skills in one guided platform.
                You only need to login when you start your assessment journey.
              </p>
              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <Link to="/assessment" className={goldCtaClass}>Start Assessment</Link>
                <Link to="/auth" className="rounded-full px-6 py-3 border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition">
                  Login / Register
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 via-indigo-50 to-cyan-50 p-6 border border-indigo-100 min-w-[280px] shadow-[0_12px_26px_-20px_rgba(79,70,229,0.8)] hover:shadow-[0_18px_30px_-18px_rgba(79,70,229,0.95)] hover:-translate-y-1 transition-all duration-300">
              <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-center bg-cover mix-blend-multiply" style={{ backgroundImage: "url('/heritage/kalvettu-1.jpg')" }} />
              <SparklesIcon className="relative h-9 w-9 text-indigo-600" />
              <p className="mt-4 text-lg font-semibold">Personalized Progress</p>
              <p className="text-slate-600 mt-2">Track module completion and improve each attempt.</p>
            </div>
          </div>
        </section>

        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

        <section className="grid md:grid-cols-3 gap-5 mt-8">
          {[
            { title: 'Reading', tamil: 'வாசிப்பு' },
            { title: 'Writing', tamil: 'எழுத்து' },
            { title: 'Speaking & Listening', tamil: 'பேச்சு மற்றும் கேள்வுணர்வு' }
          ].map((item) => (
            <article key={item.title} className="rounded-2xl bg-white/88 backdrop-blur-sm border border-white/80 p-6 shadow-[0_18px_30px_-24px_rgba(15,23,42,0.55)] hover:-translate-y-2 hover:shadow-[0_28px_42px_-20px_rgba(15,23,42,0.6)] transition-all duration-300">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200">
                <AcademicCapIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="tamil-subtle text-slate-600">{item.tamil}</p>
              <div className="mt-3 h-px bg-gradient-to-r from-indigo-200/70 to-transparent" />
              <p className="text-slate-600 mt-3">Practice and assess core language skills with guided steps.</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-amber-200/70 bg-gradient-to-r from-amber-50/90 via-orange-50/85 to-rose-50/70 p-5 md:p-6 shadow-[0_18px_36px_-28px_rgba(180,83,9,0.7)]">
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-5 items-center">
            <div>
              <p className="text-sm font-semibold text-amber-800">Heritage + Modern Learning Interface</p>
              <p className="tamil-subtle text-slate-700">பாரம்பரியமும் நவீன கற்றல் அனுபவமும்</p>
              <p className="text-slate-700 mt-2">
                Crafted with Tamil Kalvettu-inspired textures, warm gold accents, and clean modular structure for a premium feel.
              </p>
            </div>
            <div className="h-28 rounded-2xl border border-amber-200 bg-center bg-cover shadow-inner" style={{ backgroundImage: "linear-gradient(120deg, rgba(17,24,39,0.38), rgba(120,53,15,0.26)), url('/heritage/kalvettu-2.jpg')" }} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default PublicLandingPage
