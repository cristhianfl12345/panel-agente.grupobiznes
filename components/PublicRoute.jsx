import { Navigate, useLocation } from 'react-router-dom'

function PublicRoute({ children }) {
  const isAuth = localStorage.getItem('auth')
  const location = useLocation()

  // Si hay sesión activa, bloquear acceso a login
  if (isAuth) {
    return (
      <Navigate
        to="/home"
        replace
        state={{ from: location }}
      />
    )
  }

  return children
}

export default PublicRoute
