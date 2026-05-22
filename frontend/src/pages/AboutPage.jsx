import {
  BoltIcon,
  ChartBarSquareIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const AboutPage = () => (
  <div className="py-2 space-y-8">
    <section className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-white via-sky-50 to-indigo-50 shadow-sm">
      <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative p-8 md:p-10 grid lg:grid-cols-[1.35fr_0.65fr] gap-7">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-700">
            <SparklesIcon className="h-4 w-4" />
            Platform Story
          </div>
          <h2 className="text-4xl font-semibold tracking-tight mt-4">Why We Created This Platform</h2>
          <p className="tamil-subtle text-slate-700">இந்த தளத்தை ஏன் உருவாக்கினோம்</p>
          <p className="mt-5 text-lg leading-relaxed text-slate-700">
            We created this platform to make Tamil proficiency assessment simple, structured, and accessible.
            Instead of one heavy test experience, learners can complete Reading, Writing, Speaking, and Listening
            through a guided flow and track progress with clarity.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            Our design focus is confidence through separation: one clear task at a time, measurable outcomes, and
            transparent feedback that helps learners know where to improve next.
          </p>
        </div>

        <aside className="grid gap-3">
          <article className="rounded-2xl border border-white/80 bg-white/85 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">4 Core Skills</p>
              <LightBulbIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <p className="tamil-subtle text-slate-600">4 முக்கிய திறன்கள்</p>
            <p className="text-sm text-slate-600 mt-2">Reading, Writing, Speaking, Listening in one flow.</p>
          </article>
          <article className="rounded-2xl border border-white/80 bg-white/85 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">Modular Journey</p>
              <ChartBarSquareIcon className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="tamil-subtle text-slate-600">பிரிக்கப்பட்ட கற்றல் பயணம்</p>
            <p className="text-sm text-slate-600 mt-2">Clear section-by-section progression for less overwhelm.</p>
          </article>
          <article className="rounded-2xl border border-white/80 bg-white/85 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">Actionable Feedback</p>
              <BoltIcon className="h-5 w-5 text-amber-600" />
            </div>
            <p className="tamil-subtle text-slate-600">நடவடிக்கைக்கான கருத்தளிப்பு</p>
            <p className="text-sm text-slate-600 mt-2">Score clarity plus recommendations to improve quickly.</p>
          </article>
        </aside>
      </div>
    </section>

    <section className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-3xl font-semibold tracking-tight">How The Experience Is Separated</h3>
          <p className="tamil-subtle text-slate-700">அனுபவம் எப்படி பிரிக்கப்பட்டுள்ளது</p>
        </div>
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {[
          {
            title: 'Step 1: Discover',
            tamil: 'படி 1: அறிதல்',
            desc: 'Users understand the journey before starting, with clear orientation and no confusion.',
            tone: 'from-sky-50 to-white border-sky-100'
          },
          {
            title: 'Step 2: Assess',
            tamil: 'படி 2: மதிப்பீடு',
            desc: 'Each skill module is isolated, helping focus and reducing cognitive load.',
            tone: 'from-indigo-50 to-white border-indigo-100'
          },
          {
            title: 'Step 3: Improve',
            tamil: 'படி 3: முன்னேற்றம்',
            desc: 'Progress snapshots and recommendations turn scores into actionable next steps.',
            tone: 'from-emerald-50 to-white border-emerald-100'
          }
        ].map((item) => (
          <article key={item.title} className={`rounded-2xl bg-gradient-to-b ${item.tone} border p-5`}>
            <h4 className="font-semibold text-lg">{item.title}</h4>
            <p className="tamil-subtle text-slate-600">{item.tamil}</p>
            <p className="text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-gradient-to-b from-indigo-50 via-blue-50/50 to-white rounded-3xl shadow-sm transition-all duration-300 ease-in-out p-8 md:p-10 border border-indigo-100">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-3xl font-semibold tracking-tight">Platform Vision</h3>
          <p className="tamil-subtle text-slate-700">தளத்தின் நோக்கு</p>
        </div>
        <RocketLaunchIcon className="h-8 w-8 text-indigo-600" />
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <article className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm hover:-translate-y-0.5 transition-transform">
          <h4 className="font-semibold text-lg">Simple to Start</h4>
          <p className="tamil-subtle text-slate-600">எளிதாக தொடங்கலாம்</p>
          <p className="text-slate-600 mt-2">Quick sign-in and clear step-by-step learning flow.</p>
        </article>
        <article className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm hover:-translate-y-0.5 transition-transform">
          <h4 className="font-semibold text-lg">Fair Assessment</h4>
          <p className="tamil-subtle text-slate-600">நியாயமான மதிப்பீடு</p>
          <p className="text-slate-600 mt-2">Covers all core language skills in one integrated system.</p>
        </article>
        <article className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm hover:-translate-y-0.5 transition-transform">
          <h4 className="font-semibold text-lg">Visible Progress</h4>
          <p className="tamil-subtle text-slate-600">தெளிவான முன்னேற்றம்</p>
          <p className="text-slate-600 mt-2">Review score trends, module status, and recommendations.</p>
        </article>
      </div>
    </section>
  </div>
)

export default AboutPage
