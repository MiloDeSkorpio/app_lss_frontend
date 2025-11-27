import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

export const useMe = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await apiClient.get("/auth/me");
      return res.data;
    },
    retry: false, // evita reintentos si no hay sesión
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await apiClient.post("/auth/login", payload);
      return res.data;
    }
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/logout");
    }
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
      name: string;
    }) => {
      const res = await apiClient.post("/auth/register", payload);
      return res.data;
    },
  });
};
