import React from "react"

interface OperatorCardProps {
  title: string
  lastVersion: string
  totalRecords: number
  operators: { label: string ;value: number }[]
  onDownload?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onUpdate?: () => void
  onSearch?: () => void
  onHistory?: () => void
}

const OperatorCard: React.FC<OperatorCardProps> = ({
  title,
  lastVersion,
  totalRecords,
  operators,
  onDownload,
  onUpdate,
  onSearch,
  onHistory,
}) => {
  return (
    <div className="border border-gray-200 p-6 rounded-xl shadow-sm bg-gray-300 hover:shadow-md transition-shadow duration-300 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>

      <div className="flex justify-between gap-6">
        {/* Estadísticas */}
        <div className="space-y-1 text-gray-700 text-sm">
          <p>
            Última Versión: <span className="font-semibold">{lastVersion}</span>
          </p>
          <p>
            Registros: <span className="font-semibold">{totalRecords}</span>
          </p>

          {operators.map((operator) => (
            <p key={operator.label}>
              {operator.label}:{" "}
              <span className="font-semibold">{operator.value}</span>
            </p>
          ))}

          {onDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="mt-3 px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              aria-label="Descargar datos"
            >
              Descargar
            </button>
          )}
        </div>

        {/* Acciones */}
        <div className="flex flex-col justify-between space-y-2">
          {onUpdate && (
            <button
              type="button"
              onClick={onUpdate}
              className="px-4 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              aria-label="Actualizar"
            >
              Actualizar
            </button>
          )}
          {onSearch && (
            <button
              type="button"
              onClick={onSearch}
              className="px-4 py-1.5 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              aria-label="Buscar"
            >
              Buscar
            </button>
          )}
          {onHistory && (
            <button
              type="button"
              onClick={onHistory}
              className="px-4 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
              aria-label="Histórico"
            >
              Histórico
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OperatorCard
