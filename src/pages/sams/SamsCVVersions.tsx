import VersionCard from "../../components/features/VersionCard"
import {  getResumeCV, useCompareVersionsCV, useRestoreVersionCV } from "../../hooks/SamsHooks"


const SamsCVVersions = () => {
  const  { data }  = getResumeCV()
    const { mutate: compareVersions, error: errorCompare, data: dataVers, reset: resetCompare } = useCompareVersionsCV()
    const { mutate: restoreVersion } = useRestoreVersionCV()
  return (
    <>
      <h1>Control de Versiones SAMS CV</h1>
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
        fileName={"listablanca_sams_cv"}
      />
    </>
  )
}

export default SamsCVVersions
