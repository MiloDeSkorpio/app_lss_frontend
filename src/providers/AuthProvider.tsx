import { createContext, useContext } from "react";
import { useMe } from "../hooks/useAuth";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useMe();
  return (
    <AuthContext.Provider value={{ user: data?.user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
