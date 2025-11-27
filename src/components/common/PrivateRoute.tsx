import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../../providers/AuthProvider"


const PrivateRoute = () => {
  const { user, loading } = useAuthContext()
  if (loading) return <p>Cargando...</p>

  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
