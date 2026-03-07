import { useState, useEffect } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from "motion/react"
import logoPanel from '/src/assets/logo_panel.png'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [darkMode, setDarkMode] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light') setDarkMode(false)
    else setDarkMode(true)
  }, [])

  const toggleTheme = () => {
    const nextDark = !darkMode
    setDarkMode(nextDark)
    localStorage.setItem('theme', nextDark ? 'dark' : 'light')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('http://192.168.9.115:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: user,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Error al iniciar sesión')
        return
      }

      login({
        id_usuario: data.id_usuario,
        usuario: data.usuario,
        nombre: data.nombre,
        id_plataforma: data.id_plataforma,
        plataforma: data.plataforma_codigo,
        hora_in: data.hora_in.slice(0, 5),
        hora_out: data.hora_out.slice(0, 5)
      })

      localStorage.setItem('id_usuario', data.id_usuario)
      localStorage.setItem('auth', 'true')
      localStorage.setItem('nombre', data.nombre)
      localStorage.setItem('plataforma', data.plataforma_codigo)
      localStorage.setItem('id_plataforma', data.id_plataforma)
      localStorage.setItem('hora_in', data.hora_in.slice(0, 5))
      localStorage.setItem('hora_out', data.hora_out.slice(0, 5))

      navigate('/home')

    } catch (err) {
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`min-h-screen flex items-center justify-center
        ${darkMode ? 'bg-slate-900' : 'bg-slate-100'}`}
    >

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className={`w-full max-w-sm p-8 rounded-2xl shadow-xl backdrop-blur
          ${darkMode ? 'bg-slate-950/95' : 'bg-white'}`}
      >

        {/* Toggle Theme */}
        <div className="flex justify-end mb-4">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260 }}
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition shadow-sm
              ${darkMode
                ? 'bg-slate-800 text-yellow-400'
                : 'bg-slate-200 text-slate-700'
              }`}
            aria-label="Cambiar tema"
          >
            <motion.div
              key={darkMode ? "sun" : "moon"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Logo */}
        <motion.img
          src={logoPanel}
          className="w-28 mx-auto mb-6"
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
        />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-2xl font-semibold text-center mb-6
            ${darkMode ? 'text-white' : 'text-slate-800'}`}
        >
          Iniciar sesión
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Usuario */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg transition shadow-sm outline-none
              ${darkMode
                ? 'bg-slate-800 text-white focus:ring-2 focus:ring-blue-500'
                : 'bg-slate-100 text-slate-800 border focus:ring-2 focus:ring-blue-500'
              }`}
            required
          />

          {/* Password */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg transition shadow-sm outline-none
              ${darkMode
                ? 'bg-slate-800 text-white focus:ring-2 focus:ring-blue-500'
                : 'bg-slate-100 text-slate-800 border focus:ring-2 focus:ring-blue-500'
              }`}
            required
          />

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280 }}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow-md cursor-pointer"
          >
            <motion.span
              key={loading ? "loading" : "text"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </motion.span>
          </motion.button>

        </form>

        {/* Link 
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/add-user"
            className="block text-center text-sm text-blue-400 mt-4 hover:underline transition"
          >
            Crear / resetear usuario
          </Link>
        </motion.div>
*/}
      </motion.div>
    </motion.div>
  )
}

export default Login