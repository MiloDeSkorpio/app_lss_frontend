import VersionCard from "../../components/features/VersionCard";

const SamsCVVersions = () => {
 
  return (
  <>
  <h1>Control de Versiones SAMS CV</h1>
<VersionCard
  currentVersion={{
    version: "v5.2",
    date: "2025-05-01",
    recordCount: 1234,
  }}
  previousVersions={[
    { version: "v5.1", date: "2025-04-20", recordCount: 1200 },
    { version: "v5.0", date: "2025-04-01", recordCount: 1180 },
  ]}
  selectedVersion={"v5.1"}
  onVersionChange={(v) => console.log("Selected:", v)}
  onRestore={() => console.log("Restaurar versión")}
/>

  </>
)
}


export default SamsCVVersions;