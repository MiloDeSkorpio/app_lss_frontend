import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../providers/AuthProvider"

const PublicRoute = () => {
  const { user, isLoading } = useAuthContext()
  if (isLoading) return <p>Cargando...</p>
  return user ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute