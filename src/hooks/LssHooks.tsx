import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../services/apiClient.tsx'
import type { ListLssPayload, SearchResult } from '../types/index.ts'


// LSS TIMT Hooks
export const getSumaryVersionLssTIMT = () => {
  return useQuery({
    queryKey: ['summarytimt'],
    queryFn: async () => {
      const response = await apiClient.get('/lss/get-summary-timt')
      return response.data
    },
  })
}

export const useValidateLSSTIMT = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/lss/validate-timt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    }
  })
}
export const useUploadLSSTIMT = () => {
  return useMutation({
    mutationFn: async (payload: ListLssPayload) => {
      const response = await apiClient.post('/lss/new-version-timt', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    }
  })
}
export const getSAMTimtByHexId = (hexId: string) => {
  return useQuery<SearchResult, Error>({
    queryKey: ['sam-timt', hexId],
    queryFn: async () => {
      const response = await apiClient.get(`/lss/find-timt/${hexId}`)
      return response.data
    },
    enabled: !!hexId, 
    retry: false,
  })
}
export const useUploadListLSSTIMT = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/lss/find-by-file-timt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }) 
      return response.data
    }
  })
}