import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../services/apiClient.tsx'
import type { ListCVPayload, SearchResult, VersionsParams } from '../types/index.ts'

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

export const getResumeCV = () => {
  return useQuery({
    queryKey: ['resumecv'],
    queryFn: async () => {
      const response = await apiClient.get('/whitelist/resume-cv')
      return response.data
    },
  })
}
export const getResume = () => {
  return useQuery({
    queryKey: ['resumecv'],
    queryFn: async () => {
      const response = await apiClient.get('/whitelist/resume')
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
export const getSamByHexId = (hexId: string) => {
return useQuery<SearchResult, Error>({
    queryKey: ['samcv', hexId],
    queryFn: async () => {
      const response = await apiClient.get(`/whitelist/first/${hexId}`)
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
      return response.data
    },
  })
}

export const getLatestVersionInv = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const response = await apiClient.get('/sams/all-records')
      return response.data
    },
  })
}

// Ejemplo para enviar datos (POST)
export const useUploadCV = () => {
  return useMutation({
    mutationFn: async (payload: ListCVPayload) => {
      const response = await apiClient.post('/whitelist/new-version-cv', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    }
  })
}

// Ejemplo para enviar datos (POST)
export const useValidateSams = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/sams/validate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    }
  })
}
export const useValidateCV = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/whitelist/validate-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    }
  })
}
export const useValidate = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/whitelist/validate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    }
  })
}
export const useUploadWL = () => {
return useMutation({
    mutationFn: async (payload: ListCVPayload) => {
      const response = await apiClient.post('/whitelist/new-version', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.data
    }
  })
}
export const useUploadListCV = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/whitelist/sams-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }) 
      return response.data
    }
  })
}
export const useUploadListWl = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.post('/whitelist/sams-wl', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }) 
      return response.data
    }
  })
}
export const useCompareVersionsCV = () => {
  return useMutation({
    mutationFn: async ({ currentVers, oldVersion}: VersionsParams) => {
      const payload = {
        currentVersion: currentVers,
        oldVersion: oldVersion
      }
      
      const response = await apiClient.post('/whitelist/compare-cv-versions', payload, {
        headers: {
          'Content-Type': 'application/json', // Cambiado a JSON ya que parece que solo envías IDs
        },
      })
      return response.data
    }
  })
}
export const useCompareVersions = () => {
  return useMutation({
    mutationFn: async ({ currentVers, oldVersion}: VersionsParams) => {
      const payload = {
        currentVersion: currentVers,
        oldVersion: oldVersion
      }
      
      const response = await apiClient.post('/whitelist/compare-versions', payload, {
        headers: {
          'Content-Type': 'application/json', // Cambiado a JSON ya que parece que solo envías IDs
        },
      })
      return response.data
    }
  })
}
export const useRestoreVersionCV = () => {
  return useMutation({
    mutationFn: async ( oldVersion: number) => {
      const payload = {
        oldVersion: oldVersion
      }
      
      const response = await apiClient.post('/whitelist/restore-version-cv', payload, {
        headers: {
          'Content-Type': 'application/json', // Cambiado a JSON ya que parece que solo envías IDs
        },
      })
      return response.data
    }
  })
}

export const useRestoreVersion = () => {
  return useMutation({
    mutationFn: async ( oldVersion: number) => {
      const payload = {
        oldVersion: oldVersion
      }
      
      const response = await apiClient.post('/whitelist/restore-version', payload, {
        headers: {
          'Content-Type': 'application/json', // Cambiado a JSON ya que parece que solo envías IDs
        },
      })
      return response.data
    }
  })
}

