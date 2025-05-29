import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../services/apiClient.tsx'
import type { SearchResult } from '../types.ts'


// Ejemplo para obtener datos (GET)
export const getLatestVersionWLCV = () => {
  return useQuery({
    queryKey: ['whitelistcv'],
    queryFn: async () => {
      const response = await apiClient.get('/whitelist/last-version-cv')
      return response.data
    },
  })
}
export const getSamCVByHexId = (hexId: string) => {
return useQuery<SearchResult, Error>({
    queryKey: ['samcv', hexId],
    queryFn: async () => {
      const response = await apiClient.get(`/whitelist/cv/${hexId}`)
      return response.data
    },
    enabled: !!hexId,
    retry: false,
  })
}
export const getLatestVersionWL = () => {
  return useQuery({
    queryKey: ['whitelist'],
    queryFn: async () => {
      const response = await apiClient.get('/whitelist/last-version')
      console.log(response)
      return response.data
    },
  })
}
export const getLatestVersionInv = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const response = await apiClient.get('/sams/all-records')
      console.log(response)
      return response.data
    },
  })
}
// Ejemplo para enviar datos (POST)
export const useUploadCV = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      console.log(formData)
      const response = await apiClient.post('/whitelist/new-version-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    }
  })
}
export const useUploadListCV = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      console.log(formData)
      const response = await apiClient.post('/whitelist/sams-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    }
  })
}

