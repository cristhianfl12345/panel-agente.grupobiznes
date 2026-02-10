import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const KeepAliveContext = createContext()

export function KeepAliveProvider({ children }) {
  const navigate = useNavigate()
  const [secondsLeft, setSecondsLeft] = useState(300)
  const timerRef = useRef(null)
  const pingRef = useRef(null)

  const getUserId = () => localStorage.getItem('id_usuario')


  const resetTimer = () => {
    setSecondsLeft(300)
  }

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  // contador visual
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          logout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [])

  // ping backend
  useEffect(() => {
  pingRef.current = setInterval(async () => {
    const id_usuario = localStorage.getItem('id_usuario')
    if (!id_usuario) return

    try {
      const res = await fetch(
        'http://localhost:3001/api/auth/keepalive',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_usuario }),
        }
      )

      if (res.status === 401 || res.status === 440) {
        logout()
      }
    } catch {
      // no cerrar sesión por errores de red
    }
  }, 30000)

  return () => clearInterval(pingRef.current)
}, [])

  // detectar actividad
  useEffect(() => {
    const events = ['click', 'mousemove', 'keydown']

    const activity = () => resetTimer()

    events.forEach(e =>
      window.addEventListener(e, activity)
    )

    return () =>
      events.forEach(e =>
        window.removeEventListener(e, activity)
      )
  }, [])

  return (
    <KeepAliveContext.Provider value={{ secondsLeft }}>
      {children}
    </KeepAliveContext.Provider>
  )
}

export const useKeepAlive = () => useContext(KeepAliveContext)
