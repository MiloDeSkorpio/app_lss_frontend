import { useQuery, useMutation } from "@tanstack/react-query"
import apiClient from "../services/apiClient"
import type { RequestPayload, ResendPayload, ResetPayload, VerifyPayload } from "../types"

export const useMe = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await apiClient.get("/auth/me")
      return res.data
    },
    retry: false, 
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await apiClient.post("/auth/login", payload)
      return res.data
    }
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await apiClient.post("/auth/logout")
    }
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: {
      email: string
      password: string
      name: string
    }) => {
      const res = await apiClient.post("/auth/register", payload)
      return res.data
    },
  })
}

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async (payload: VerifyPayload) => {
      const { data } = await apiClient.post("/auth/verify", payload)
      return data
    }
  })
}

// Hook para reenviar el código
export const useResendCode = () => {
  return useMutation({
    mutationFn: async (payload: ResendPayload) => {
      const { data } = await apiClient.post("/auth/resend-code", payload)
      return data
    }
  })
}

// Hook para solicitar código de reseteo
export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: async (payload: RequestPayload) => {
      const { data } = await apiClient.post("/auth/request-reset", payload)
      return data
    }
  })
}

// Hook para verificar código recibido
export const useVerifyResetCode = () => {
  return useMutation({
    mutationFn: async (payload: VerifyPayload) => {
      const { data } = await apiClient.post("/auth/verify-reset", payload)
      return data
    }
  })
}

// Hook para cambiar la contraseña
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (payload: ResetPayload) => {
      const { data } = await apiClient.post("/auth/reset-password", payload)
      return data
    }
  })
}