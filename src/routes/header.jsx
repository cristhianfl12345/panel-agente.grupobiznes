import { useKeepAlive } from '../context/KeepAliveContext'
import { WiStars } from 'react-icons/wi'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useLocalTheme } from '../context/useLocalTheme'

export default function Header({ username }) {
  const { secondsLeft } = useKeepAlive()
  const { theme, toggleTheme } = useLocalTheme()

  const isDark = theme === 'dark'
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  // 🔥 wrapper correcto
  const handleToggleTheme = () => {
    toggleTheme()
    window.location.reload()
  }

  return (
    <header
      className={`
        w-full flex items-center justify-between
        px-6 py-4 border-b transition-colors
        ${isDark
          ? 'bg-[#1F2029] border-slate-700 text-white'
          : 'bg-[#F5F5F5] border-slate-200 text-slate-800'}
      `}
    >
      <button
        onClick={() => window.location.href = '/home'}
        className="text-lg font-semibold hover:opacity-80 transition cursor-pointer flex items-center gap-1"
      >
        <WiStars className={`size-12 ${isDark ? 'text-yellow-400' : 'text-gray-700'}`} />
        BiznesDigital
      </button>

      <div className="flex items-center gap-5">
        {/* ⏱️ CONTADOR INACTIVIDAD */}
        <div
          className={`
            text-xs font-medium px-3 py-1 rounded-full
            ${secondsLeft <= 60
              ? 'bg-red-100 text-red-700'
              : isDark
                ? 'bg-slate-800 text-slate-300'
                : 'bg-slate-200 text-slate-700'}
          `}
        >
          Inactividad: {minutes}:{seconds.toString().padStart(2, '0')}
        </div>

        {/* USUARIO */}
        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
          {username}
        </span>

        {/* 🌙☀️ TOGGLE */}
        <button
          onClick={handleToggleTheme}
          className={`
            p-2 rounded-lg transition hover:scale-105
            ${isDark
              ? 'bg-slate-800 text-yellow-400'
              : 'bg-slate-200 text-slate-700'}
          `}
          aria-label="Cambiar tema"
        >
          {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
      </div>
    </header>
  )
}
