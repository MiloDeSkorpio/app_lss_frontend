import type { SearchResult } from "../../types"

interface ResComponentsProps {
  data?: SearchResult | SearchResult[]
  isLoading: boolean
  error: Error | null
  onClean: () => void
  showAllFields?: boolean // Nuevo prop para controlar los campos
}

const Search = ({
  data,
  isLoading,
  error,
  showAllFields = true,
}: ResComponentsProps) => {
  const results = Array.isArray(data) ? data : data ? [data] : []

  // Configuración dinámica de columnas
  const columns = [
    { key: "SERIAL_HEX", label: "Serial HEX", show: true },
    { key: "OPERATOR", label: "Operador", show: true },
    { key: "LOCATION_ID", label: "Location ID", show: showAllFields },
    { key: "ESTACION", label: "Estación", show: showAllFields },
    { key: "ESTADO", label: "Estado", show: showAllFields },
  ]

  if (isLoading) {
    return <p className="text-gray-500 text-center mt-6">Buscando...</p>
  }

  if (error) {
    return (
      <p className="text-red-600 text-center mt-6">Error: {error.message}</p>
    )
  }

  if (!results.length) {
    return (
      <p className="text-gray-600 text-center mt-6 p-2">No hay resultados.</p>
    )
  }

  return (
    <div
      className={`border rounded mt-4 max-h-[250px] overflow-auto ${
        showAllFields ? "min-w-full" : "w-[250px]"
      }`}
    >
      <div className="inline-block min-w-full">
        <table className="min-w-full">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {columns.map(
                (column) =>
                  column.show && (
                    <th
                      key={column.key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map(
                  (column) =>
                    column.show && (
                      <td
                        key={`${index}-${column.key}`}
                        className={`px-6 py-4 whitespace-nowrap text-sm ${
                          column.key === "SERIAL_HEX"
                            ? "text-black"
                            : "text-gray-500"
                        }`}
                      >
                        {item[column.key as keyof SearchResult]}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Search
