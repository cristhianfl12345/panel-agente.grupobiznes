import { useKeepAlive } from '../context/KeepAliveContext'
import { WiStars } from 'react-icons/wi'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useLocalTheme } from '../context/useLocalTheme'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {

  const { user } = useAuth()
  const { secondsLeft } = useKeepAlive()
  const { theme, toggleTheme } = useLocalTheme()

  const location = useLocation()
  const navigate = useNavigate()

  const [nombreCampana, setNombreCampana] = useState(null)

  const isDark = theme === 'dark'

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const horaIn = user?.hora_in || '--:--'
  const horaOut = user?.hora_out || '--:--'
  const username = user?.nombre || 'Usuario'

  useEffect(() => {

    const campana = localStorage.getItem('nombreCampana')

    if (campana) {
      setNombreCampana(campana)
    } else {
      setNombreCampana(null)
    }

  }, [location.pathname])

  const handleToggleTheme = () => {
    toggleTheme()
    window.location.reload()
  }

  const goHome = () => {

    localStorage.removeItem('nombreCampana')
    localStorage.removeItem('campanaSeleccionada')

    setNombreCampana(null)

    navigate('/home')
  }

  return (

    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        w-full flex items-center justify-between
        px-6 py-4 border-b backdrop-blur-md
        transition-colors duration-500
        ${isDark
          ? 'bg-[#1F2029]/95 border-slate-700 text-white'
          : 'bg-[#F5F5F5]/95 border-slate-200 text-slate-800'}
      `}
    >

      {/* LOGO */}
      <motion.button
        onClick={goHome}
        whileHover={{ scale: 1.05, x: 3 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-lg font-semibold transition-all"
      >

        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <WiStars
            className={`size-10 ${
              isDark ? 'text-yellow-400' : 'text-gray-700'
            }`}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.span
            key={nombreCampana ? nombreCampana : "biznes"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="whitespace-nowrap"
          >
            {nombreCampana ? nombreCampana : 'BiznesDigital'}
          </motion.span>
        </AnimatePresence>

      </motion.button>

      {/* DERECHA */}
      <div className="flex items-center gap-5">

        {/* HORARIO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`
            text-xs font-medium px-3 py-1 rounded-full
            animate-in fade-in zoom-in
            ${isDark
              ? 'bg-slate-800 text-slate-300'
              : 'bg-slate-200 text-slate-700'}
          `}
        >
          Horario: {horaIn} - {horaOut}
        </motion.div>

        {/* INACTIVIDAD */}
        <motion.div
          key={secondsLeft}
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
          whileHover={{ scale: 1.05 }}
          className={`
            text-xs font-medium px-3 py-1 rounded-full
            transition-all
            ${secondsLeft <= 60
              ? 'bg-red-100 text-red-700 animate-pulse'
              : isDark
                ? 'bg-slate-800 text-slate-300'
                : 'bg-slate-200 text-slate-700'}
          `}
        >
          Inactividad: {minutes}:{seconds.toString().padStart(2, '0')}
        </motion.div>

        {/* USUARIO */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className={isDark ? 'text-slate-300' : 'text-slate-700'}
        >
          {username}
        </motion.span>

        {/* TOGGLE TEMA */}
        <motion.button
          onClick={handleToggleTheme}
          whileHover={{
            scale: 1.15,
            rotate: 12
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`
            p-2 rounded-lg transition-all
            shadow-sm
            ${isDark
              ? 'bg-slate-800 text-yellow-400'
              : 'bg-slate-200 text-slate-700'}
          `}
        >

          <motion.div
            key={isDark ? "sun" : "moon"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </motion.div>

        </motion.button>

      </div>
    </motion.header>
  )
}