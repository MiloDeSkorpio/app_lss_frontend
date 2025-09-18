import { useMutation, useQuery } from "@tanstack/react-query"
import apiClient from "../services/apiClient"

export const getLatestVersionBL = () => {
  return useQuery({
    queryKey: ['blacklist'],
    queryFn: async () => {
      const response = await apiClient.get('/blacklist/last-version')
      return response.data
    }
  })
}
export const getResumeLastVersion = () => {
  return useQuery({
    queryKey: ['blacklist'],
    queryFn: async () => {
      const response = await apiClient.get('/blacklist/resume-last-ver')
      return response.data
    }
  })
}
export const useValidateLN = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/blacklist/validate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    }
  })
}