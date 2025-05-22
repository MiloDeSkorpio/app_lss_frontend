import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../services/apiClient.tsx'


// Ejemplo para obtener datos (GET)
export const getLatestVersionWLCV = () => {
  return useQuery({
    queryKey: ['whitelist'],
    queryFn: async () => {
      const response = await apiClient.get('/whitelist/last-version-cv')
      return response.data
    },
  })
}

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

