import { useState, useEffect } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useNavigate, Link } from 'react-router-dom'
import logoPanel from '/src/assets/logo_panel.png'

function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [darkMode, setDarkMode] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  //  leer tema al cargar
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light') setDarkMode(false)
    else setDarkMode(true)
  }, [])

  //  toggle + persistencia
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

      //  si falla → NO guardes nada
      if (!res.ok) {
        setError(data.message || 'Error al iniciar sesión')
        return
      }

      //  SOLO SI ES OK
      localStorage.setItem('auth', 'true')
      localStorage.setItem('nombre', data.nombre)
      localStorage.setItem('id_usuario', data.id_usuario)
      localStorage.setItem('plataforma', data.plataforma)

      navigate('/home')
    } catch (err) {
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center
        ${darkMode ? 'bg-slate-900' : 'bg-slate-100'}`}
    >
      <div
        className={`w-full max-w-sm p-8 rounded-2xl shadow-lg
          ${darkMode ? 'bg-slate-950' : 'bg-white'}`}
      >
        {/* Dark / Light */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition
              ${darkMode
                ? 'bg-slate-800 text-yellow-400'
                : 'bg-slate-200 text-slate-700'
              }`}
            aria-label="Cambiar tema"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>

        <img src={logoPanel} className="w-28 mx-auto mb-6" />

        <h2
          className={`text-2xl font-semibold text-center mb-6
            ${darkMode ? 'text-white' : 'text-slate-800'}`}
        >
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className={`w-full px-4 py-2 rounded
              ${darkMode
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-800 border'
              }`}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded
              ${darkMode
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-800 border'
              }`}
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer "
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <Link
          to="/add-user"
          className="block text-center text-sm text-blue-400 mt-4"
        >
          Crear / resetear usuario
        </Link>
      </div>
    </div>
  )
}

export default Login
