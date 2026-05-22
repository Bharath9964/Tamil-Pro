import { useMemo, useState } from 'react'

const VOWELS = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ']
const CONSONANTS = ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன']
const MODIFIERS = ['ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ', '்']

const PHONETIC_MAP = {
  a: 'அ', aa: 'ஆ', i: 'இ', ii: 'ஈ', u: 'உ', uu: 'ஊ', e: 'எ', ee: 'ஏ', ai: 'ஐ', o: 'ஒ', oo: 'ஓ', au: 'ஔ',
  ka: 'க', nga: 'ங', ca: 'ச', nya: 'ஞ', ta: 'ட', na: 'ந', tha: 'த', pa: 'ப', ma: 'ம', ya: 'ய', ra: 'ர', la: 'ல', va: 'வ', zha: 'ழ', lla: 'ள', rra: 'ற', nna: 'ன'
}

const keyClass = 'relative overflow-hidden bg-blue-600 text-white px-3 py-2 rounded-2xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out text-sm after:absolute after:inset-0 after:bg-white/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity'

const applyModifierToText = (text, modifier) => {
  if (!text) return text
  const lastChar = text.slice(-1)
  if (!CONSONANTS.includes(lastChar)) return text
  return `${text.slice(0, -1)}${lastChar}${modifier}`
}

const TamilKeyboard = ({ value, setValue }) => {
  const [selectedConsonant, setSelectedConsonant] = useState('')
  const [mode, setMode] = useState('tamil99')
  const [phoneticInput, setPhoneticInput] = useState('')

  const preview = selectedConsonant ? `${selectedConsonant} + குறி` : 'எழுத்து தேர்வு செய்யவும்'

  const suggestions = useMemo(() => {
    if (mode === 'phonetic') {
      if (!phoneticInput.trim()) return []
      return Object.entries(PHONETIC_MAP)
        .filter(([key]) => key.startsWith(phoneticInput.toLowerCase()))
        .slice(0, 6)
        .map(([key, letter]) => `${key} → ${letter}`)
    }

    if (!selectedConsonant) return []
    return MODIFIERS.slice(0, 6).map((m) => `${selectedConsonant}${m}`)
  }, [mode, phoneticInput, selectedConsonant])

  const appendText = (chunk) => setValue((prev) => `${prev}${chunk}`)

  const onVowel = (vowel) => {
    setSelectedConsonant('')
    appendText(vowel)
  }

  const onConsonant = (cons) => {
    setSelectedConsonant(cons)
    appendText(cons)
  }

  const onModifier = (modifier) => {
    if (!selectedConsonant) return
    setValue((prev) => applyModifierToText(prev, modifier))
    setSelectedConsonant('')
  }

  const onBackspace = () => {
    setValue((prev) => prev.slice(0, -1))
    setSelectedConsonant('')
  }

  const applyPhonetic = () => {
    const key = phoneticInput.trim().toLowerCase()
    if (!key) return
    const mapped = PHONETIC_MAP[key]
    if (mapped) appendText(mapped)
    setPhoneticInput('')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setMode('tamil99')} className={`${mode === 'tamil99' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} px-3 py-1.5 rounded-2xl text-sm transition-all duration-300 ease-in-out`}>
          Tamil99
        </button>
        <button type="button" onClick={() => setMode('phonetic')} className={`${mode === 'phonetic' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} px-3 py-1.5 rounded-2xl text-sm transition-all duration-300 ease-in-out`}>
          Phonetic
        </button>
      </div>

      {mode === 'phonetic' ? (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 space-y-3">
          <p className="text-sm text-gray-500">Type phonetic key (example: ka, nga, aa)</p>
          <div className="flex gap-2">
            <input
              value={phoneticInput}
              onChange={(e) => setPhoneticInput(e.target.value)}
              className="flex-1 border border-gray-200 rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Type phonetic text"
            />
            <button type="button" onClick={applyPhonetic} className={keyClass}>Add</button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3">
            <p className="text-gray-500 text-sm mb-2">Vowels</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {VOWELS.map((item) => (
                <button key={item} type="button" onClick={() => onVowel(item)} className={keyClass}>{item}</button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3">
            <p className="text-gray-500 text-sm mb-2">Consonants</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {CONSONANTS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onConsonant(item)}
                  className={`${keyClass} ${selectedConsonant === item ? '!bg-emerald-600' : ''}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3">
            <p className="text-gray-500 text-sm mb-2">Modifiers</p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {MODIFIERS.map((item) => (
                <button key={item} type="button" onClick={() => onModifier(item)} className={keyClass}>{item}</button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-3">
        <p className="text-sm text-gray-500">Preview</p>
        <p className="font-semibold mt-1">{preview}</p>
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <span key={item} className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{item}</span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        <button type="button" onClick={onBackspace} className={keyClass}>Backspace</button>
        <button type="button" onClick={() => appendText(' ')} className={keyClass}>Space</button>
        <button type="button" onClick={() => { setValue(''); setSelectedConsonant('') }} className={keyClass}>Clear</button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3">
        <p className="text-gray-500 text-sm">Live Text</p>
        <p className="text-gray-800 mt-1 break-words min-h-6">{value || '...'}</p>
      </div>
    </div>
  )
}

export default TamilKeyboard
