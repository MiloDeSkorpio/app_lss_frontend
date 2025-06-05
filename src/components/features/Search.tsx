import type { SearchResult } from "../../types";

interface ResComponentsProps {
  data?: SearchResult | SearchResult[]
  isLoading: boolean;
  error: Error | null;
  onClean: () => void
}

const Search = ({ data, isLoading, error, onClean  }: ResComponentsProps) => {
  const results = Array.isArray(data) ? data : data ? [data] : [];
  
  const handleClean = () => {
    onClean()
    alert('Limpieza Exitosa...')
  }

  if (isLoading) {
    return <p className="text-gray-500 text-center mt-6">Buscando...</p>;
  }

  if (error) {
    return (
      <p className="text-red-600 text-center mt-6">Error: {error.message}</p>
    );
  }

  if (!results) {
    return (
      <p className="text-gray-400 text-center mt-6">No hay resultados aún.</p>
    );
  }

  return (
    <>
    
    <div className="divide-y divide-gray-200 border rounded overflow-scroll mt-4">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Serial HEX
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Operador
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estación
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((item,index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.SERIAL_HEX}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.OPERATOR}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.LOCATION_ID}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.ESTACION}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.ESTADO}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <button 
      onClick={handleClean}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        Limpiar Busqueda
      </button>
    </>
  );
};

export default Search;
