import type { SearchResult } from "../../types";


interface ResComponentsProps {
  data?: SearchResult;
  isLoading: boolean;
  error: Error | null;
}


const Search = ({ data, isLoading, error }: ResComponentsProps) => {
  if (isLoading) {
    return <p className="text-gray-500 text-center mt-6">Buscando...</p>;
  }

  if (error) {
    return <p className="text-red-600 text-center mt-6">Error: {error.message}</p>;
  }

  if (!data) {
    return <p className="text-gray-400 text-center mt-6">No hay resultados aún.</p>;
  }

  return (
    <div className="divide-y divide-gray-200 border rounded overflow-hidden mt-4">
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
              Estación
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {data.SERIAL_HEX}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.OPERATOR}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.ESTACION}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.ESTADO}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Search
