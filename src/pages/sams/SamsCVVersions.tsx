import VersionCard from "../../components/features/VersionCard"
import {  getResumeCV } from "../../hooks/SamsHooks"


const SamsCVVersions = () => {
  const  { data }  = getResumeCV()
  
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
      />
    </>
  )
}

export default SamsCVVersions
