import React from 'react'

interface OperatorCardProps {
  title: string
  lastVersion: string
  totalRecords: number
  operators: {
    label: string
    value: number
  }[]
  onDownload?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onUpdate?: (event: React.MouseEvent<HTMLButtonElement>) => void
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
    <div className="space-y-1 border-2 border-amber-50 p-4 rounded-lg  shadow-sm">
      <h2 className="font-bold text-lg">{title}</h2>
      <div className="flex space-x-3">
        {/* Columna de estadísticas */}
        <div className="flex-1 space-y-2">
          <p>Última Versión: <span className="font-semibold">{lastVersion}</span></p>
          <p>Registros: <span className="font-semibold">{totalRecords}</span></p>
          
          {operators.map((operator) => (
            <p key={operator.label}>
              {operator.label}: <span className="font-semibold">{operator.value}</span>
            </p>
          ))}
          
          <button 
            onClick={onDownload}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Descargar
          </button>
        </div>

        {/* Columna de acciones */}
        <div className="flex flex-col space-y-2">
          <button 
            onClick={onUpdate}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Actualizar
          </button>
          <button 
            onClick={onSearch}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
          >
            Buscar
          </button>
          <button 
            onClick={onHistory}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
          >
            Histórico
          </button>
        </div>
      </div>
    </div>
  )
}

export default OperatorCard