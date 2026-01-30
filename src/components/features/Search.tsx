import type { SearchResult } from "../../types"

interface ResComponentsProps {
  data?: SearchResult | SearchResult[]
  isLoading: boolean
  error: Error | null
  onClean: () => void
  showAllFields?: boolean
}
const Search = ({
  data,
  isLoading,
  error,
  showAllFields = true,
  onClean,
}: ResComponentsProps) => {
  const results = Array.isArray(data)
    ? data.map(item => item)
    : data?.data
      ? [data.data]
      : []
  console.log(results)
  const columns = results.length > 0
    ? Object.keys(results[0]).map(key => ({
      key,
      label: key.replace(/_/g, ' '),
      show: true
    }))
    : []
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
      className={`border rounded mt-4 max-h-[250px] overflow-auto ${showAllFields ? "min-w-full" : "w-[250px]"
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
                        className={`px-6 py-4 whitespace-nowrap text-sm ${column.key === "SERIAL_HEX"
                          ? "text-black"
                          : "text-gray-500"
                          }`}
                      >
                        {(item as any)[column.key]}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={onClean}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Nueva Búsqueda
      </button>
    </div>
  )
}

export default Search
