import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, isAuthenticated, onLoginRequired }) {
  if (!isAuthenticated) {
    onLoginRequired()
    return <Navigate to="/" replace />
  }

  return children
}
