import { Outlet, useNavigate } from "react-router-dom"
import OperatorCard from "../../components/common/OperatorCard"
import { getLatestVersionWLCV } from "../../hooks/hooksWLCV"

const SamsView = () => {
  const navigate = useNavigate()
  const { data: samsCV, isLoading, error } = getLatestVersionWLCV()
  const totalSAMSCV = samsCV?.length || 0
  const lastVersionCV = samsCV?.[0]?.version || "N/A"

  const convertToCSV = (objArray: any[]) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray
    let str = ""

    // Encabezados
    const headers = Object.keys(array[0])
    str += headers.join(",") + "\r\n"

    // Datoss
    array.forEach((item: { [x: string]: string }) => {
      let line = ""
      headers.forEach((header) => {
        if (line !== "") line += ","
        line += item[header]
      })
      str += line + "\r\n"
    })

    return str
  }

  const getCurrentDateTime = () => {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")

    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const seconds = String(now.getSeconds()).padStart(2, "0")

    return `${year}${month}${day}_${hours}${minutes}${seconds}`
  }

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

  // Función auxiliar para descargar archivos
  const downloadFile = (data: string, filename: string, type: string) => {
    const blob = new Blob([data], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 0)
  }

  const countOperator = (op: string) =>
    samsCV?.filter((s: { operator: string }) => s.operator === op).length || 0

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
            handleDownloadCV(samsCV)
          }}
          onUpdate={() => navigate("/sams/update-cv")}
          onSearch={() => console.log("Buscar en CV")}
          onHistory={() => console.log("Ver histórico CV")}
        />

        {/* Este seria el inicio del componente */}
        <div className=" space-y-1 border-2 border-amber-50 p-4">
          <h2 className="font-bold">Lista Blanca CL</h2>
          <div className="flex space-y-2 space-x-3">
            <div className="">
              <p>Ultima Version: 2</p>
              <p>Registros: 14864</p>
              <p>STE: 14864</p>
              <p>STC: 14864</p>
              <p>MB: 14864</p>
              <p>ORT: 14864</p>
              <p>RTP: 14864</p>
              <button>Descargar</button>
            </div>
            <div className="flex flex-col space-y-3">
              <button>Actualizar</button>
              <button>Buscar</button>
              <button>Historico</button>
            </div>
          </div>
        </div>
        {/* Aqui termina el primer componente */}
        {/* Este seria el inicio del componente */}
        <div className=" space-y-1 border-2 border-amber-50 p-4">
          <h2 className="font-bold">Inventario</h2>
          <div className="flex space-y-2 space-x-3">
            <div className="">
              <p>Ultima Version: 2</p>
              <p>Registros: 14864</p>
              <p>STE: 14864</p>
              <p>STC: 14864</p>
              <p>MB: 14864</p>
              <p>ORT: 14864</p>
              <p>RTP: 14864</p>
              <button>Descargar</button>
            </div>
            <div className="flex flex-col space-y-3">
              <button>Actualizar</button>
              <button>Buscar</button>
              <button>Historico</button>
            </div>
          </div>
        </div>
        {/* Aqui termina el primer componente */}
      </div>
      <Outlet/>
    </div>
  )
}

export default SamsView
