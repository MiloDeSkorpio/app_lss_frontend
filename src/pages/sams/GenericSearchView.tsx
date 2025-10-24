import { useMemo, useState } from "react"
import Search from "../../components/features/Search"
import LoaderCSV from "../../components/features/LoaderCSV"
import { useQueryClient } from "@tanstack/react-query"
import { notify } from "../../utils/notifications"
import { useRouteAwareApi } from "../../hooks/useRouteAwareApi"

const GenericSearchView = () => {
  const queryClient = useQueryClient()
  const config = useRouteAwareApi()

  // Type guard to ensure 'config' is a CardConfig and has the 'search' property
  if (!config || !('search' in config) || !config.search) {
    return <div>Error: Configuración de búsqueda no encontrada para esta ruta.</div>
  }

  const { title, getById, useUploadList, multerOpt, maxFiles, multiple, queryKeyForClean } = config.search
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSearchTerm, setActiveSearchTerm] = useState("")
  const { data: singleData, isLoading, error } = getById(activeSearchTerm)
  const uploadMutation = useUploadList()
  const multipleData = uploadMutation.data

  const allResults = useMemo(() => {
    if (multipleData) return multipleData
    if (singleData) return [singleData]
    return []
  }, [singleData, multipleData])

  const handleClean = () => {
    if (singleData) {
      queryClient.removeQueries({
        queryKey: [queryKeyForClean, activeSearchTerm],
      })
      setActiveSearchTerm("")
      setSearchTerm("")
    }
    if (allResults) {
      uploadMutation.reset()
    }
  }

  const handleSearch = () => {
    const hexRegex = /^[0-9A-F]{8}$/
    if (!searchTerm) {
      notify.warning("Ingresa un código hexadecimal.")
      return
    }

    if (!hexRegex.test(searchTerm)) {
      notify.error("Formato inválido. Debe ser 8 caracteres (ej: AE10D275, AE10D276).")
      return
    }
    if (!searchTerm.trim()) return
    setActiveSearchTerm(searchTerm.trim())
  }

  return (
    <div className="space-y-1.5">
      <h1>{title}</h1>
      {allResults.length > 0 ? (
        <Search
          data={allResults}
          isLoading={isLoading}
          error={error}
          onClean={handleClean}
        />
      ) : (
        <>
          <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded shadow-md">
            <div className="flex space-x-2 mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                placeholder="Buscar por Hexadecimal"
                className="flex-1 border border-gray-300 rounded px-4 py-2 text-black"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                maxLength={8}
              />
              <button
                onClick={handleSearch}
                disabled={isLoading || !!error || !searchTerm}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
              >
                {isLoading ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>
          <LoaderCSV
            uploadMutation={uploadMutation}
            multerOpt={multerOpt}
            maxFiles={maxFiles}
            multiple={multiple}
          />
        </>
      )}
    </div>
  )
}

export default GenericSearchView
