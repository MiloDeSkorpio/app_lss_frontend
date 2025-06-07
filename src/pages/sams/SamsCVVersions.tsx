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
        onRestore={() => console.log("Restaurar versión")}
        onCompare={() => console.log("Comparando versión")}
      />
    </>
  )
}

export default SamsCVVersions
