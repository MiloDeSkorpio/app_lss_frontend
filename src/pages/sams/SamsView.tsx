import { useNavigate } from "react-router-dom"
import OperatorCard from "../../components/common/OperatorCard"
import { getLatestVersionInv, getLatestVersionWL, getLatestVersionWLCV } from "../../hooks/SamsHooks"
import { convertToCSV, downloadFile, getCurrentDateTime } from "../../utils/FileHelpers"

const SamsView = () => {
  const navigate = useNavigate()
  
  const { data: samsCV, isLoading, error } = getLatestVersionWLCV()
  const totalSAMSCV = samsCV?.length || 0
  const lastVersionCV = samsCV?.[0]?.version || "N/A"

  const { data: samsWL} = getLatestVersionWL()
  const totalSAMS = samsWL?.length || 0
  const lastVersion = samsWL?.[0]?.version || "N/A"

  const { data: samsInv} = getLatestVersionInv()
  const totalSAMSInv = samsInv?.length || 0
  const lastFecha = samsInv?.[0]?.fecha_produccion || "N/A"

  const handleDownloadCV = (samsCV: any) => {
    const dateTime = getCurrentDateTime()
    
    // 1. Archivo completo
    const allSamsCV = samsCV.map((item: any) => ({
      serial_dec: item.serial_dec,
      serial_hex: item.serial_hex,
      config: item.config,
      operator: item.operator,
      location_id: item.location_id,
      estacion: item.estacion,
    }))
    const fullCSV = convertToCSV(allSamsCV)
    downloadFile(fullCSV, `${dateTime}_listablanca_cv_all.csv`, "text/csv")

    // 2. Archivo solo con serial_dec y serial_hex
    const serialData = samsCV.map((item: any) => ({
      serial_dec: item.serial_dec,
      serial_hex: item.serial_hex,
    }))
    const serialCSV = convertToCSV(serialData)
    downloadFile(
      serialCSV,
      `${dateTime}_listablanca_cv_partial.csv`,
      "text/csv"
    )

    // 3. Archivo solo con serial_hex
    const hexOnlyData = samsCV.map((item: any) => ({
      serial_hex: item.serial_hex,
    }))
    const hexCSV = convertToCSV(hexOnlyData)
    downloadFile(hexCSV, `${dateTime}_listablanca_cv.csv`, "text/csv")
  }

  const countOperatorCV = (op: string) =>
    samsCV?.filter((s: { operator: string }) => s.operator === op).length || 0
  const countOperator = (op: string) =>
    samsWL?.filter((s: { operator: string }) => s.operator === op).length || 0
  const countOperatorInv = (op: string) =>
    samsInv?.filter((s: { provider_code: string }) => s.provider_code === op).length || 0

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <div className="space-y-4">
      <h1 className="font-bold">SAMS</h1>
      <div className="flex flex-wrap space-x-2">
        <OperatorCard
          title="Lista Blanca CV"
          lastVersion={lastVersionCV}
          totalRecords={totalSAMSCV}
          operators={[
            { label: "STE", value: countOperatorCV("3C") + countOperatorCV("5A") },
            { label: "STC", value: countOperatorCV("32") },
            {
              label: "MB",
              value:
                countOperatorCV("01") +
                countOperatorCV("02") +
                countOperatorCV("03") +
                countOperatorCV("04") +
                countOperatorCV("05") +
                countOperatorCV("06") +
                countOperatorCV("07"),
            },
            { label: "ORT", value: countOperatorCV("15") },
            { label: "RTP", value: countOperatorCV("46") },
          ]}
          onDownload={(e) => {
            e.preventDefault()
            handleDownloadCV(samsCV)
          }}
          onUpdate={() => navigate("/sams/update-cv")}
          onSearch={() => navigate("/sams/search-cv")}
          onHistory={() => navigate("/sams/versions-cv")}
        />
        <OperatorCard
          title="Lista Blanca"
          lastVersion={lastVersion}
          totalRecords={totalSAMS}
          operators={[
            { label: "STE", value: countOperator("3C") + countOperator("5A") },
            { label: "STC", value: countOperator("32") },
            {
              label: "MB",
              value:
                countOperator("01") +
                countOperator("02") +
                countOperator("03") +
                countOperator("04") +
                countOperator("05") +
                countOperator("06") +
                countOperator("07"),
            },
            { label: "ORT", value: countOperator("15") },
            { label: "RTP", value: countOperator("46") },
          ]}
          onDownload={(e) => {
            e.preventDefault()
            handleDownloadCV(samsWL)
          }}
          onUpdate={() => navigate("/sams/update")}
          onSearch={() => navigate("/sams/search")}
          onHistory={() => navigate("/sams/versions")}
        />
        <OperatorCard
          title="Inventario de SAMS"
          lastVersion={lastFecha}
          totalRecords={totalSAMSInv}
          operators={[
            { label: "STE", value: countOperatorInv("3C") + countOperatorInv("5A") },
            { label: "STC", value: countOperatorInv("32") },
            {
              label: "MB",
              value:
                countOperatorInv("01") +
                countOperatorInv("02") +
                countOperatorInv("03") +
                countOperatorInv("04") +
                countOperatorInv("05") +
                countOperatorInv("06") +
                countOperatorInv("07"),
            },
            { label: "ORT", value: countOperatorInv("15") },
            { label: "RTP", value: countOperatorInv("46") },
          ]}
          onDownload={(e) => {
            e.preventDefault()
            handleDownloadCV(samsWL)
          }}
          onUpdate={() => navigate("/sams/update")}
          onSearch={() => navigate("/sams/search")}
          onHistory={() => navigate("/sams/versions")}
        />

        
      </div>
      
    </div>
  )
}

export default SamsView
