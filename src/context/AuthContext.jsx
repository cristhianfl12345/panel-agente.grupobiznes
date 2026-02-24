import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  // 🔁 Restaurar sesión al recargar
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // 🔐 Login
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // 🚪 Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('auth')
    localStorage.removeItem('nombre')
    localStorage.removeItem('plataforma')
    localStorage.removeItem('id_plataforma')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado
export const useAuth = () => useContext(AuthContext)
