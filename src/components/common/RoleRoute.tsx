import { Navigate } from "react-router-dom"
import { useAuthContext } from "../../providers/AuthProvider"
import type { JSX } from "react"

interface RoleRouteProps {
  children: JSX.Element
  allowedRoles: string[] 
}

export const RoleRoute = ({ children, allowedRoles }: RoleRouteProps) => {
  const { user, isLoading } = useAuthContext()

  if (isLoading) return <p>Cargando...</p>
  if (!user || !allowedRoles.includes(user.role?.name)) {
    return <Navigate to="/" replace />
  }

  return children
}
