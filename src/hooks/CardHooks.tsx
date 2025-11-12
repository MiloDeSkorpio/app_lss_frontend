import { useMutation, useQuery } from "@tanstack/react-query"
import apiClient from "../services/apiClient"
import type { ListLNPayload, SearchResult, VersionsParams } from "../types"

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
export const useUploadLN = () => {
  return useMutation({
    mutationFn: async (payload: ListLNPayload) => {
      const response = await apiClient.post('/blacklist/new-version', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    }
  })
}
export const getCardByHexId = (hexId: string) => {
  return useQuery<SearchResult, Error>({
    queryKey: ['card', hexId],
    queryFn: async () => {
      const response = await apiClient.get('/blacklist/find-card', {
        params: { hexId }
      })
      return response.data
    },
    enabled: !!hexId, 
    retry: false,
  })
}
export const useUploadListBL = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/blacklist/cards-bl', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }) 
      return response.data
    }
  })
}
export const getResumeBL = () => {
  return useQuery({
    queryKey: ['resumebl'],
    queryFn: async () => {
      const response = await apiClient.get('/blacklist/resume')
      return response.data
    },
  })
}
export const useCompareVersionsBL = () => {
  return useMutation({
    mutationFn: async ({ currentVers, oldVersion}: VersionsParams) => {
      const payload = {
        currentVersion: currentVers,
        oldVersion: oldVersion
      }
      
      const response = await apiClient.post('/blacklist/compare-bl-versions', payload, {
        headers: {
          'Content-Type': 'application/json', // Cambiado a JSON ya que parece que solo envías IDs
        },
      })
      return response.data
    }
  })
}
export const useRestoreVersionBL = () => {
  return useMutation({
    mutationFn: async ( oldVersion: number) => {
      const payload = {
        oldVersion: oldVersion
      }
      
      const response = await apiClient.post('/blacklist/restore-version-bl', payload, {
        headers: {
          'Content-Type': 'application/json', // Cambiado a JSON ya que parece que solo envías IDs
        },
      })
      return response.data
    }
  })
}