import React from "react"
import SelectVersion from "../common/SelectVersion"

export interface VersionRecords {
  VERSION: string
}
interface VersionCardProps {
  currentVersion: number
  currentRecordsV: number
  previousVersions?: VersionRecords[]
  altasRecords?: number
  bajasRecords?: number
  cambiosRecords?: number
  onRestore: () => void
  onCompare: () => void
}

const VersionCard: React.FC<VersionCardProps> = ({
  currentVersion,
  currentRecordsV,
  previousVersions,
  altasRecords,
  bajasRecords,
  cambiosRecords,
  onRestore,
  onCompare,
}) => {

  return (
    <div className="border-2 border-blue-100 bg-gray-300 p-6 rounded-xl shadow-sm grid grid-cols-1 gap-4 text-black mt-4">
      {/* Columna actual */}
      <h2 className="text-lg font-bold text-blue-700">Versión Actual</h2>
      <div className=" flex space-x-2 justify-center items-center">
        <p className="font-bold">
          <span className="font-medium">Versión:</span> {currentVersion}
        </p>
        <p className="font-bold">
          <span className="font-medium">Registros:</span>{" "}
          {currentRecordsV}
        </p>
        <p className="font-bold">
          <span className="font-medium">Altas:</span> {altasRecords}
        </p>
        <p className="font-bold">
          <span className="font-medium">Cambios:</span> {cambiosRecords}
        </p>
        <p className="font-bold">
          <span className="font-medium">Bajas:</span> {bajasRecords}
        </p>
      </div>
      {/* Columna de comparación y acciones */}
      <h2 className="text-lg font-bold text-blue-700">Comparar Versiónes</h2>
      <div className=" flex space-x-3">
        <div>
          <SelectVersion
            dataVersion={previousVersions}
            idName="currentVersion"
          />
          <button
            onClick={onCompare}
            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition"
          >
            Comparar versiónes
          </button>
        </div>
        <div>
          <SelectVersion
            dataVersion={previousVersions}
            idName="oldVersion"
          />

          <button
            onClick={onRestore}
            className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition"
          >
            Restaurar a esta versión
          </button>
        </div>
      </div>
    </div>
  )
}

export default VersionCard
