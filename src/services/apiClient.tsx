import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient