import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {

  const isAuth = localStorage.getItem('auth')

  const params = new URLSearchParams(window.location.search)
  const embedKey = params.get("embedKey")

  // 🟢 PERMITIR ACCESO SI ES EMBED
  if (embedKey) {
    return children
  }

  // 🔴 FLUJO NORMAL
  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return children
}