import { createContext, useContext, useMemo } from "react"
import { useMe } from "../hooks/useAuth"

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useMe()
  const user = isError ? null : data?.user
  const value = useMemo(() => ({ user, isLoading }), [user, isLoading])
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)