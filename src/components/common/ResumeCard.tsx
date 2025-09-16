import React from "react"
import type { ResumeCardProps } from "../../types"

export const ResumeCard: React.FC<ResumeCardProps> = ({
  title,
  lastVersion,
  totalRecords,
  onDownload,
  onUpdate,
  onSearch,
  onHistory
}) => {
  return (
    <div className="border border-gray-200 p-6 rounded-xl shadow-sm bg-gray-300 hover:shadow-md transition-shadow duration-300 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <div className="text-black">
        <p>
          Última Versión: <span className="font-semibold">{lastVersion}</span>
        </p>
        <p>
          Registros: <span className="font-semibold">{totalRecords}</span>
        </p>
      </div>
      <div className="grid grid-cols-2">
        {onUpdate && (
          <button
            type="button"
            onClick={onUpdate}
            className="m-1 px-4 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            aria-label="Actualizar"
          >
            Actualizar
          </button>
        )}
        {onSearch && (
          <button
            type="button"
            onClick={onSearch}
            className="m-1 px-4 py-1.5 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
            aria-label="Buscar"
          >
            Buscar
          </button>
        )}
        {onDownload && (
          <button
            type="button"
            onClick={onDownload}
            className="m-1 px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            aria-label="Descargar datos"
          >
            Descargar
          </button>
        )}
        {onHistory && (
          <button
            type="button"
            onClick={onHistory}
            className="m-1 px-4 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
            aria-label="Histórico"
          >
            Histórico
          </button>
        )}
      </div>
    </div>
  )
}
