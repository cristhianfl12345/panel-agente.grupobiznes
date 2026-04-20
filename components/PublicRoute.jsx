import { Navigate, useLocation } from 'react-router-dom'

function PublicRoute({ children }) {

  const isAuth = localStorage.getItem('auth')
  const location = useLocation()

  const params = new URLSearchParams(window.location.search)
  const embedKey = params.get("embedKey")

  // 🟢 SI ES EMBED → permitir acceso libre
  if (embedKey) {
    return children
  }

  // 🔴 BLOQUEO NORMAL SI YA ESTÁ LOGUEADO
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