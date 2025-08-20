import VersionCard from "../../components/features/VersionCard"
import {  getResume, useCompareVersions, useRestoreVersion } from "../../hooks/SamsHooks"


const SamsVersions = () => {
  const  { data }  = getResume()
  const { mutate: compareVersions, error: errorCompare, data: dataVers, reset: resetCompare } = useCompareVersions()
  const { mutate: restoreVersion } = useRestoreVersion()
  
  return (
    <>
      <h1>Control de Versiones SAMS</h1>
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
        fileName={"listablanca_sams"} 
     />
    </>
  )
}

export default SamsVersions
