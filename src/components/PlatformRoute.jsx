import { Navigate } from 'react-router-dom'
import { canAccess } from '../config/platformAccess'

function PlatformRoute({ feature, children }) {
  if (!canAccess(feature)) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default PlatformRoute
