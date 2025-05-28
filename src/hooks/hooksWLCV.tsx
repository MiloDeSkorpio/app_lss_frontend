import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../services/apiClient.tsx'


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
  console.log(hexId)
  return useQuery({
    queryKey: ['samcv'],
    queryFn: async () => {
      const response = await apiClient.get(`/whitelist/cv/${hexId}`)
      console.log(response)
      return response.data
    },
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
      const response = await apiClient.post('/whitelist/new-version-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    }
  });
};

