import { useEffect, useState } from 'react'   
import { FiLogOut, FiUser, FiSearch, FiSun, FiMoon, FiBriefcase, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { WiStars } from 'react-icons/wi'
import { motion, AnimatePresence } from "motion/react"
import { useKeepAlive } from '../context/KeepAliveContext'
import { useNavigate } from 'react-router-dom'
import { useLocalTheme } from '../context/useLocalTheme'
import { canAccess } from '../config/platformAccess'

function Home() {
  const { secondsLeft } = useKeepAlive()
  const { theme, toggleTheme } = useLocalTheme()
  const [nombre, setNombre] = useState('')
  const [campanasMonitor, setCampanasMonitor] = useState([])
  const [openMonitor, setOpenMonitor] = useState(false)

  const navigate = useNavigate()

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const isDark = theme === 'dark'

  useEffect(() => {
    const isAuth = localStorage.getItem('auth')
    const storedNombre = localStorage.getItem('nombre')
    const idUsuario = localStorage.getItem('id_usuario')

    if (!isAuth || !storedNombre) {
      navigate('/login')
      return
    }

    setNombre(storedNombre)

    if (idUsuario) {
      fetch(`http://192.168.9.115:3001/api/auth/campanas-monitor/${idUsuario}`)
        .then(res => res.json())
        .then(data => {
          setCampanasMonitor(data.data || data)
        })
        .catch(err => {
          console.error('Error cargando campañas monitor:', err)
        })
    }

  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem('nombre')
    localStorage.removeItem('plataforma')
    localStorage.removeItem('id_plataforma')
    localStorage.removeItem('plataforma_codigo')
    localStorage.removeItem('id_campana')
    localStorage.removeItem('nombre_campana')
    navigate('/login')
  }

  const handleSelectCampana = (campana) => {
    localStorage.setItem('id_campana', campana.id_campana)
    localStorage.setItem('nombre_campana', campana.nombre)
    navigate('/monitor')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`
        min-h-screen flex flex-col transition-colors
        ${isDark ? 'bg-[#1F2029] text-white' : 'bg-[#F5F5F5] text-slate-800'}
      `}
    >
      {/* HEADER */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className={`
          flex items-center justify-between px-6 py-4 border-b backdrop-blur
          ${isDark ? 'border-slate-700' : 'border-slate-200'}
        `}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-lg font-semibold hover:opacity-80 transition flex items-center gap-1"
        >
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <WiStars className={`size-12 ${isDark ? 'text-yellow-400' : 'text-gray-700'}`} />
          </motion.div>
          BiznesDigital
        </motion.div>

        <div className="flex items-center gap-4">

          <motion.div
            key={secondsLeft <= 60 ? 'danger' : 'normal'}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
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
          </motion.div>

          <motion.span
            whileHover={{ scale: 1.05 }}
            className={isDark ? 'text-slate-300' : 'text-slate-700'}
          >
            {nombre}
          </motion.span>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 8 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`
              p-2 rounded-lg transition shadow-sm
              ${isDark
                ? 'bg-slate-800 text-yellow-400'
                : 'bg-slate-200 text-slate-700'
              }
            `}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition shadow-md"
          >
            <FiLogOut />
            Salir
          </motion.button>

        </div>
      </motion.header>

      {/* CONTENIDO */}
      <main className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center space-y-5"
        >
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            Bienvenido{' '}
            <span className={isDark ? 'text-blue-400' : 'text-[#2C4361]'}>
              {nombre}
            </span>

            <motion.span
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              👋
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={isDark ? 'text-slate-300' : 'text-slate-500'}
          >
            Has iniciado sesión correctamente
          </motion.p>

{/* BOTONES PRINCIPALES EN 3 COLUMNAS */}
<motion.div
  initial="hidden"
  animate="show"
  variants={{
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  }}
  className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10"
>

  {/* BOTÓN RENIEC */}
  {canAccess('busqueda') && (
    <motion.button
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/reniec')}
      className={`
        w-full flex items-center justify-center gap-2
        px-6 py-4 rounded-xl shadow-md
        transition
        ${isDark
          ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
          : 'bg-gradient-to-r from-violet-600 to-purple-500 text-white'
        }
      `}
    >
      <FiSearch size={20} />
      Buscador de personas
    </motion.button>
  )}

  {/* MONITOR LEADS */}
  {canAccess('monitor') && (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className="w-full relative"
    >

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpenMonitor(!openMonitor)}
        className={`
          w-full flex items-center justify-between
          px-6 py-4 rounded-xl shadow-md
          transition
          ${isDark
            ? 'bg-[#74F2F2] text-black hover:brightness-95'
            : 'bg-[#354196] text-white hover:brightness-110'
          }
        `}
      >
        <span className="flex items-center gap-2 font-semibold">
          <FiBriefcase size={20} />
          Monitor Leads
        </span>

        <motion.span
          animate={{ rotate: openMonitor ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {openMonitor ? <FiChevronUp /> : <FiChevronDown />}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {openMonitor && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute left-0 w-full mt-2
              rounded-xl shadow-lg z-50
              max-h-60 overflow-y-auto
              ${isDark ? 'bg-slate-800' : 'bg-white'}
            `}
          >
            <div className="p-3 space-y-2">
              {campanasMonitor.length === 0 && (
                <p className="text-sm text-gray-400 text-center">
                  No hay campañas asignadas
                </p>
              )}

              {campanasMonitor.map((campana) => (
                <motion.div
                  key={campana.id_campana}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectCampana(campana)}
                  className={`
                    cursor-pointer px-4 py-2 rounded-lg text-sm text-center
                    ${isDark
                      ? 'bg-slate-700 hover:bg-slate-600'
                      : 'bg-slate-100 hover:bg-slate-200'
                    }
                    transition
                  `}
                >
                  {campana.nombre}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )}

  {/* CARTERIZACIÓN */}
  {canAccess('cartera') && (
    <motion.button
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/cartera')}
      className={`
        w-full flex items-center justify-center gap-2
        px-6 py-4 rounded-xl shadow-md
        transition
        ${isDark
          ? 'bg-[#DE546C] text-black hover:brightness-95'
          : 'bg-[#732230] text-white hover:brightness-110'
        }
      `}
    >
      <FiUser size={20} />
      Carterización
    </motion.button>
  )}

</motion.div>
        </motion.div>
      </main>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`
          text-center py-4 text-sm
          ${isDark ? 'text-slate-400' : 'text-slate-500'}
        `}
      >
        © Panel de administración
      </motion.footer>
    </motion.div>
  )
}

export default Home