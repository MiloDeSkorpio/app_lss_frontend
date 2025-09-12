import { useQuery } from "@tanstack/react-query"
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