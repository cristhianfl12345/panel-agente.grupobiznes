import { Navigate } from 'react-router-dom'
import { canAccess } from '../config/platformAccess'

function PlatformRoute({ feature, children }) {

  const params = new URLSearchParams(window.location.search)
  const embedKey = params.get("embedKey")

  // 🟢 BYPASS TOTAL PARA EMBED
  if (embedKey) {
    return children
  }

  // 🔴 FLUJO NORMAL
  if (!canAccess(feature)) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default PlatformRoute