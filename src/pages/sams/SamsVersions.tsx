import VersionCard from "../../components/features/VersionCard"
import {  getResume } from "../../hooks/SamsHooks"


const SamsVersions = () => {
  const  { data }  = getResume()
  
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

export default SamsVersions
