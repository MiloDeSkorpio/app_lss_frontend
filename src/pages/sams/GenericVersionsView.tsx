import VersionCard from "../../components/features/VersionCard"
import { useRouteAwareApi } from "../../hooks/useRouteAwareApi"

const GenericVersionsView = () => {
  const config = useRouteAwareApi()

  // Type guard to ensure 'config' is a CardConfig and has the 'versions' property
  if (!config || !('versions' in config) || !config.versions) {
    return <div>Error: Configuración de versiones no encontrada para esta ruta.</div>
  }

  const { title, getResume, useCompareVersions, useRestoreVersion, fileName } = config.versions

  const { data } = getResume()
  const { mutate: compareVersions, error: errorCompare, data: dataVers, reset: resetCompare } = useCompareVersions()
  const { mutate: restoreVersion } = useRestoreVersion()

  return (
    <>
      <h1>{title}</h1>
      <VersionCard
        currentVersion={data?.currentVersion}
        currentRecordsV={data?.totalRecords}
        previousVersions={data?.versions}
        altasRecords={data?.altasDataV}
        bajasRecords={data?.bajasDataV}
        cambiosRecords={data?.cambiosDataV}
        compareVersions={compareVersions}
        restoreVersion={restoreVersion}
        compareData={dataVers}
        errorCompare={errorCompare}
        resetCompare={resetCompare}
        fileName={fileName}
      />
    </>
  )
}

export default GenericVersionsView
