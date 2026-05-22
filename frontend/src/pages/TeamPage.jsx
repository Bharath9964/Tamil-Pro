import { EnvelopeIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const teamMembers = [
    {
  name: 'Dr. Muthu Kumaran A M J',
  role: 'PROJECT FACULTY',
  roleTamil: 'திட்ட வழிகாட்டி',
  photo: '/team/Teacher-1.png'
},
  {
    name: 'BHARATH C',
    role: 'PROJECT OWNER',
    roleTamil: 'திட்ட உரிமையாளர்',
    photo: '/team/bharath-c.jpeg'
  },
  {
    name: 'MOHANA PRABHU',
    role: 'SCRUM MASTER',
    roleTamil: 'ஸ்க்ரம் மாஸ்டர்',
    photo: '/team/mohana-prabhu.jpeg'
  },
  {
    name: 'SANJAI G',
    role: 'DEVELOPER',
    roleTamil: 'உருவாக்குபவர்',
    photo: '/team/sanjai-g.jpeg'
  }

]

const MemberPhoto = ({ name, photo }) => {
  if (photo) {
    return <img src={photo} alt={name} className="h-24 w-24 rounded-2xl object-cover border border-slate-200" />
  }

  return (
    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-slate-100 to-blue-100 border border-slate-200 flex items-center justify-center">
      <UserCircleIcon className="h-12 w-12 text-slate-400" />
    </div>
  )
}

const TeamPage = () => (
  <div className="py-2 space-y-8">
    <section className="bg-gradient-to-b from-violet-50 to-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out p-8 border border-slate-100">
      <h2 className="text-3xl font-semibold tracking-tight">Project Team</h2>
      <p className="tamil-subtle text-slate-700">திட்ட அணி</p>
      <p className="text-slate-600 mt-3">Core members behind the Tamil Proficiency Assessment platform.</p>
    </section>

    <section className="grid md:grid-cols-3 gap-6">
      {teamMembers.map(({ name, role, roleTamil, photo }) => (
        <article key={name} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out p-6 border border-slate-100">
          <div className="flex items-center gap-4">
            <MemberPhoto name={name} photo={photo} />
            <div>
              <p className="text-base font-semibold text-indigo-700">{role}</p>
              <p className="tamil-subtle text-slate-600">{roleTamil}</p>
              <h3 className="text-xl font-semibold text-slate-900 mt-1">{name}</h3>
            </div>
          </div>
          {!photo && <p className="text-xs text-slate-400 mt-4">Photo will be added.</p>}
        </article>
      ))}
    </section>

    <section className="bg-gradient-to-b from-emerald-50 to-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out p-8 border border-slate-100">
      <h3 className="text-3xl font-semibold tracking-tight">Contact Information</h3>
      <p className="tamil-subtle text-slate-700">தொடர்பு தகவல்</p>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white border border-slate-100 p-5">
          <p className="text-sm text-slate-500">Name</p>
          <p className="text-lg font-semibold text-slate-900 mt-1">BHARATH</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-100 p-5 flex items-center gap-3">
          <PhoneIcon className="h-5 w-5 text-emerald-600" />
          <div>
            <p className="text-sm text-slate-500">Phone</p>
            <p className="text-lg font-semibold text-slate-900 mt-1">7200224236</p>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-slate-100 p-5 md:col-span-2 flex items-center gap-3">
          <EnvelopeIcon className="h-5 w-5 text-emerald-600" />
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="text-lg font-semibold text-slate-900 mt-1">bharath200517@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  </div>
)

export default TeamPage
