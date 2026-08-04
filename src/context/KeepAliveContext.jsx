import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const KeepAliveContext = createContext()

export function KeepAliveProvider({ children }) {
  const navigate = useNavigate()

  const [secondsLeft, setSecondsLeft] = useState(900)

  const timerRef = useRef(null)
  const pingRef = useRef(null)
  const logoutExecuted = useRef(false)

  const getUserId = () =>
    JSON.parse(localStorage.getItem('user') || '{}')?.id_usuario

  const resetTimer = () => {
    if (!logoutExecuted.current) {
      setSecondsLeft(900)
    }
  }

  const logout = () => {
    if (logoutExecuted.current) return

    logoutExecuted.current = true

    clearInterval(timerRef.current)
    clearInterval(pingRef.current)

    localStorage.clear()

    navigate('/login', { replace: true })
  }

  // contador visual
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [])

  // cerrar sesión cuando llegue a 0
  useEffect(() => {
    if (secondsLeft === 0) {
      logout()
    }
  }, [secondsLeft])

  // ping backend
  useEffect(() => {
    pingRef.current = setInterval(async () => {
      const id_usuario = getUserId()

      if (!id_usuario) return

      try {
        const token = localStorage.getItem('token')
        const res = await fetch(
          'https://agente.bizapp.pe/api/auth/keepalive',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario }),
          }
        )
          

        if (res.status === 401 || res.status === 440) {
          logout()
        }
      } catch (error) {
        console.error('Error keepalive:', error)
      }
    }, 30000)

    return () => clearInterval(pingRef.current)
  }, [])

  // detectar actividad
  useEffect(() => {
    const events = ['click', 'mousemove', 'keydown']

    const activity = () => {
      resetTimer()
    }

    events.forEach(event =>
      window.addEventListener(event, activity)
    )

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, activity)
      )
    }
  }, [])

  return (
    <KeepAliveContext.Provider value={{ secondsLeft }}>
      {children}
    </KeepAliveContext.Provider>
  )
}

export const useKeepAlive = () => useContext(KeepAliveContext)