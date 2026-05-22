export const levelColor = (level) => {
  if (level === 'Advanced') return 'bg-emerald-100 text-emerald-700'
  if (level === 'Intermediate') return 'bg-amber-100 text-amber-700'
  return 'bg-sky-100 text-sky-700'
}
