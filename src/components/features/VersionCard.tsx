import React from 'react'

interface VersionInfo {
  version: string
  date: string
  recordCount: number
}

interface VersionCardProps {
  currentVersion: VersionInfo
  previousVersions: VersionInfo[]
  selectedVersion: string
  onVersionChange: (version: string) => void
  onRestore: () => void
}

const VersionCard: React.FC<VersionCardProps> = ({
  currentVersion,
  previousVersions,
  selectedVersion,
  onVersionChange,
  onRestore,
}) => {
  return (
    <div className="border-2 border-blue-100 bg-gray-300 p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 text-black mt-4">
      {/* Columna actual */}
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-blue-700">Versión Actual</h2>
        <p>
          <span className="font-medium">Versión:</span> {currentVersion.version}
        </p>
        <p>
          <span className="font-medium">Fecha:</span> {currentVersion.date}
        </p>
        <p>
          <span className="font-medium">Registros:</span> {currentVersion.recordCount}
        </p>
      </div>

      {/* Columna de comparación y acciones */}
      <div className="space-y-3">
        <div>
          <label htmlFor="versionSelect" className="block text-sm font-medium mb-1">
            Comparar con versión anterior:
          </label>
          <select
            id="versionSelect"
            value={selectedVersion}
            onChange={(e) => onVersionChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>Selecciona una versión</option>
            {previousVersions.map((ver) => (
              <option key={ver.version} value={ver.version}>
                {ver.version} - {ver.date}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onRestore}
          className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition"
        >
          Restaurar a esta versión
        </button>
      </div>
    </div>
  )
}

export default VersionCard
