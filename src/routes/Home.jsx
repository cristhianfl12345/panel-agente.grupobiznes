import { useEffect, useState } from 'react'  
import { FiLogOut, FiUser, FiSearch, FiSun, FiMoon, FiBriefcase } from 'react-icons/fi'
import { WiStars } from 'react-icons/wi'
import { useKeepAlive } from '../context/KeepAliveContext'
import { useNavigate } from 'react-router-dom'
import { useLocalTheme } from '../context/useLocalTheme'
import { canAccess } from '../config/platformAccess'

function Home() {
  const { secondsLeft } = useKeepAlive()
  const { theme, toggleTheme } = useLocalTheme()
  const [nombre, setNombre] = useState('')
  const navigate = useNavigate()

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const isDark = theme === 'dark'

  useEffect(() => {
    const isAuth = localStorage.getItem('auth')
    const storedNombre = localStorage.getItem('nombre')

    if (!isAuth || !storedNombre) {
      navigate('/login')
      return
    }

    setNombre(storedNombre)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('nombre')
    localStorage.removeItem('plataforma')
    navigate('/login')
  }

  return (
    <div
      className={`
        min-h-screen flex flex-col transition-colors
        ${isDark ? 'bg-[#1F2029] text-white' : 'bg-[#F5F5F5] text-slate-800'}
      `}
    >
      {/* HEADER */}
      <header
        className={`
          flex items-center justify-between px-6 py-4 border-b
          ${isDark ? 'border-slate-700' : 'border-slate-200'}
        `}
      >
        <div className="text-lg font-semibold hover:opacity-80 transition flex items-center gap-1">
          <WiStars className={`size-12 ${isDark ? 'text-yellow-400' : 'text-gray-700'}`} />
          BiznesDigital
        </div>

        <div className="flex items-center gap-4">
          <div
            className={`
              text-xs font-medium px-3 py-1 rounded-full
              ${secondsLeft <= 60
                ? 'bg-red-100 text-red-700'
                : isDark
                  ? 'bg-slate-800 text-slate-300'
                  : 'bg-slate-200 text-slate-700'
              }
            `}
          >
            Inactividad: {minutes}:{seconds.toString().padStart(2, '0')}
          </div>

          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
            {nombre}
          </span>

          <button
            onClick={toggleTheme}
            className={`
              p-2 rounded-lg transition
              ${isDark
                ? 'bg-slate-800 text-yellow-400'
                : 'bg-slate-200 text-slate-700'
              }
              hover:scale-105
            `}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
          >
            <FiLogOut />
            Salir
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-5">
          <h1 className="text-3xl font-bold">
            Bienvenido{' '}
            <span className={isDark ? 'text-blue-400' : 'text-[#2C4361]'}>
              {nombre}
            </span>{' '}
            👋
          </h1>

          <p className={isDark ? 'text-slate-1000' : 'text-slate-500'}>
            Has iniciado sesión correctamente
          </p>

          {/* BOTÓN RENIEC */}
          {canAccess('busqueda') && (
            <div className="flex justify-center mt-6 ">
              <button
                onClick={() => navigate('/reniec')}
                className={`
                  flex items-center gap-2
                  ${isDark
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-gradient-to-r from-violet-600 to-purple-500 hover:bg-[#223550]'
                  }
                  ${isDark ? 'text-black' : 'text-white'} px-6 py-3 rounded-xl
                  shadow transition transform hover:scale-105 cursor-pointer 
                `}
              >
                <FiSearch size={20} />
                Buscador de personas
              </button>
            </div>
          )}

          {/* CARDS */}
          <div className="flex justify-center grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {canAccess('monitor') && (
              <div
                onClick={() => navigate('/monitor')}
                className={`
                  text-center p-6 rounded-xl cursor-pointer
                  ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}
                `}
              >
                <h3 className="font-semibold">Monitor Leads</h3>
                <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                  Filtrado por fechas...
                </p>
              </div>
            )}

            {canAccess('cartera') && (
              <div
                onClick={() => navigate('/cartera')}
                className={`
                  text-center p-6 rounded-xl cursor-pointer
                  ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}
                `}
              >
                <h3 className="font-semibold">Carterización</h3>
                <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                  Gestión de carteras y campañas
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        className={`
          text-center py-4 text-sm
          ${isDark ? 'text-slate-400' : 'text-slate-500'}
        `}
      >
        © Panel de administración
      </footer>
    </div>
  )
}

export default Home
