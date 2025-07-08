import React, { useEffect, useMemo, useState } from "react"
import SelectVersion from "../common/SelectVersion"
import Search from "./Search"
import type { CompareVersionsData, VersionRecords } from "../../types"
import { handleDownloadIfData } from "../../utils/FileHelpers"
import { notify } from "../../utils/notifications"
import { useNavigate } from "react-router-dom"

interface VersionCardProps {
  currentVersion: number
  currentRecordsV: number
  previousVersions?: VersionRecords[]
  altasRecords?: number
  bajasRecords?: number
  cambiosRecords?: number
  compareVersions: (params: { currentVers: number; oldVersion: number }) => void
  restoreVersion: (version: number) => void
  compareData: CompareVersionsData
  errorCompare: any
  resetCompare: () => void
  fileName: string
}

const VersionCard: React.FC<VersionCardProps> = ({
  currentVersion,
  currentRecordsV,
  previousVersions = [],
  altasRecords,
  bajasRecords,
  cambiosRecords,
  compareVersions,
  restoreVersion,
  compareData,
  errorCompare,
  resetCompare,
  fileName
}: VersionCardProps) => {
  const navigate = useNavigate()
  const [currentVers, setCurrentVersion] = useState<number | null>(null)
  const [oldVersion, setOldVersion] = useState<number>(0)
  const [downloadSucces, setDownloadSuccess] = useState(false)
  
  //Estos mutate se pasan como props
  const selectOldDisabled = !currentVers || !!compareData
  const selectCurDisabled = !!compareData
  const isCompareDisabled = !currentVers || !oldVersion || !!compareData
  const isRestoreDisabled = !downloadSucces
  const isCleanDisabled = !compareData
  const isDownloadDisabled = !compareData || downloadSucces

  const filteredOldVersions = useMemo(() => {
    if (!currentVers) return []
    return previousVersions.filter((v) => Number(v.VERSION) < currentVers)
  }, [currentVers, previousVersions])

  useEffect(() => {
    setOldVersion(0)
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
    if (compareData) {
      setCurrentVersion(null)
      setOldVersion(0)
      setDownloadSuccess(false)
      resetCompare()
    }
  }

  const handleRestore = () => {
    restoreVersion(oldVersion)
    navigate('/sams')
    notify.success('Version restaurada con exito')
  }

  const handleDownload = () => {
    if(!compareData) { return }
    handleDownloadIfData(
      compareData.altasData,
      `${fileName}_altas`
    )
    handleDownloadIfData(
      compareData.cambiosData,
      `${fileName}_cambios`
    )
    handleDownloadIfData(
      compareData.bajasData,
      `${fileName}_bajas`
    )
    setDownloadSuccess(true)
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
      {compareData ? (
        <div className=" space-y-1 ">
          <div className="flex space-x-1">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-blue-700">
                Altas: {compareData.altasRes}
              </h2>
              <Search
                data={compareData.altasData}
                isLoading={false}
                error={errorCompare}
                onClean={handleClean}
                showAllFields={false}
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-blue-700">
                Bajas: {compareData.bajasRes}
              </h2>
              <Search
                data={compareData.bajasData}
                isLoading={false}
                error={errorCompare}
                onClean={handleClean}
                showAllFields={false}
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-blue-700">
                Cambios: {compareData.cambiosRes}
              </h2>
              <Search
                data={compareData.cambiosData}
                isLoading={false}
                error={errorCompare}
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
