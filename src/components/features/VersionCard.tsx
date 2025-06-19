import React, { useEffect, useMemo, useState } from "react"
import SelectVersion from "../common/SelectVersion"
import Search from "./Search"
import { useCompareVersions } from "../../hooks/SamsHooks"
import type { VersionRecords } from "../../types"

interface VersionCardProps {
  currentVersion: number
  currentRecordsV: number
  previousVersions?: VersionRecords[]
  altasRecords?: number
  bajasRecords?: number
  cambiosRecords?: number
}

const VersionCard: React.FC<VersionCardProps> = ({
  currentVersion,
  currentRecordsV,
  previousVersions = [],
  altasRecords,
  bajasRecords,
  cambiosRecords,
}: VersionCardProps) => {
  const [currentVers, setCurrentVersion] = useState<number | null>(null)
  const [oldVersion, setOldVersion] = useState<number | null>(null)
  const [downloadSucces, setDownloadSuccess] = useState(false)
  const { mutate: compareVersions, error, data, reset } = useCompareVersions()

  const selectOldDisabled = !currentVers || data
  const selectCurDisabled = data
  const isCompareDisabled = !currentVers || !oldVersion || data
  const isRestoreDisabled = !downloadSucces
  const isCleanDisabled = !data
  const isDownloadDisabled = !data || downloadSucces
  
  const filteredOldVersions = useMemo(() => {
    if (!currentVers) return []
    return previousVersions.filter((v) => Number(v.VERSION) < currentVers)
  }, [currentVers, previousVersions])

  useEffect(() => {
    setOldVersion(null)
  }, [currentVers])

  const handleCompare = () => {
    if (!currentVers || !oldVersion) {
      alert("Por favor selecciona ambas versiones")
      return
    }
    compareVersions({
      currentVers,
      oldVersion,
    })
  }

  const handleClean = () => {
    if (data) {
      setCurrentVersion(null)
      setOldVersion(null)
      setDownloadSuccess(false)
      reset()
    }
  }

  const handleRestore = () => {
    console.log("Restaurnado la version Seleccionada")
  }

  const handleDownload = () => {
    console.log("descargando las diferencias entre versiones")
    setDownloadSuccess(true)
    console.log(downloadSucces)
  }
  
  return (
    <div className="border-2 border-blue-100 bg-gray-300 p-6 rounded-xl shadow-sm grid grid-cols-1 gap-4 text-black mt-4">
      {/* Columna actual */}
      <h2 className="text-lg font-bold text-blue-700">Versión Actual</h2>
      <div className="flex flex-col space-y-2 justify-center items-center">
        <div className="flex space-x-2">
          <p className="font-bold">
            <span className="font-medium">Versión:</span> {currentVersion}
          </p>
          <p className="font-bold">
            <span className="font-medium">Registros:</span> {currentRecordsV}
          </p>
        </div>
        <div className="flex space-x-2">
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
      </div>
      {/* Columna de comparación y acciones */}
      <h2 className="text-lg font-bold text-blue-700">Comparar Versiónes</h2>
      <div className="space-y-3 items-center justify-center">
        <div className="space-x-2">
          <SelectVersion
            dataVersion={previousVersions}
            idName="currentVersion"
            value={Number(currentVers)}
            onChange={(e) => setCurrentVersion(Number(e.target.value))}
            disabled={selectCurDisabled}
          />
          <SelectVersion
            dataVersion={filteredOldVersions}
            value={Number(oldVersion)}
            onChange={(e) => setOldVersion(Number(e.target.value))}
            disabled={selectOldDisabled}
            idName="oldVersion"
          />
        </div>
        <div className="space-x-2">
          <button
            onClick={handleClean}
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 ${isCleanDisabled ? "hidden" : ""
              }`}
          >
            Limpiar Busqueda
          </button>
          <button
            onClick={handleDownload}
            className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-300 ${isDownloadDisabled ? "hidden" : ""
              }`}
          >
            Descargar
          </button>
          <button
            onClick={handleCompare}
            className={`bg-blue-500 text-white w-[220px] py-2 rounded-md hover:bg-blue-600 transition ${isCompareDisabled ? "hidden" : ""
              }`}
          >
            Comparar versiónes
          </button>
          <button
            onClick={handleRestore}
            className={`bg-red-500 text-white w-[220px] py-2 rounded-md hover:bg-red-600 transition ${isRestoreDisabled ? "hidden" : ""
              }`}
          >
            Restaurar a la version: {oldVersion}
          </button>
        </div>
      </div>
      {data ? (
        <div className=" space-y-1 ">
          <div className="flex space-x-1">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-blue-700">
                Altas: {data.altasRes}
              </h2>
              <Search
                data={data.altasData}
                isLoading={false}
                error={error}
                onClean={handleClean}
                showAllFields={false}
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-blue-700">
                Bajas: {data.bajasRes}
              </h2>
              <Search
                data={data.bajasData}
                isLoading={false}
                error={error}
                onClean={handleClean}
                showAllFields={false}
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-blue-700">
                Cambios: {data.cambiosRes}
              </h2>
              <Search
                data={data.cambiosData}
                isLoading={false}
                error={error}
                onClean={handleClean}
                showAllFields={false}
              />
            </div>
          </div>
        </div>
      ) : (
        "En espera de resultados..."
      )}
    </div>
  )
}

export default VersionCard
