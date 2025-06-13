import type { SearchResult } from "../../types"
import { notify } from "../../utils/notifications"

interface ResComponentsProps {
  data?: SearchResult | SearchResult[]
  isLoading: boolean
  error: Error | null
  onClean: () => void
}

const Search = ({ data, isLoading, error, onClean }: ResComponentsProps) => {
  const results = Array.isArray(data) ? data : data ? [data] : []

  const handleClean = () => {
    onClean()
    notify.success("Limpieza Exitosa...")
  }

  if (isLoading) {
    return <p className="text-gray-500 text-center mt-6">Buscando...</p>
  }

  if (error) {
    return (
      <p className="text-red-600 text-center mt-6">Error: {error.message}</p>
    )
  }

  if (!results) {
    return (
      <p className="text-gray-400 text-center mt-6">No hay resultados aún.</p>
    )
  }

  return (
    <>
      <div className="border rounded mt-4 h-[250px] overflow-auto">
        <div className="min-w-full inline-block">
          <table className="min-w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Serial HEX
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Operador
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Location ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Estación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Estado
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {item.SERIAL_HEX}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.OPERATOR}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.LOCATION_ID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.ESTACION}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.ESTADO}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={handleClean}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        Limpiar Busqueda
      </button>
    </>
  )
}

export default Search
