import { useLocation } from "react-router-dom";
import { API_CONFIGS } from "../types/api-config";

// hooks/useRouteAwareApi.ts
export const useRouteAwareApi = () => {
  const location = useLocation();
  const config = API_CONFIGS[location.pathname as keyof typeof API_CONFIGS];
  return config;
};