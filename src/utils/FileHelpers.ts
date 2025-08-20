import { notify } from "./notifications"
/**
 * Valida si el nombre de un archivo coincide con alguno de los patrones definidos.
 *
 * Los patrones aceptan nombres específicos para archivos CSV relacionados con:
 * - listanegra: listanegra_tarjetas_(altas|bajas|cambios)_<HEX2>_<TIMESTAMP14>.csv
 * - listablanca: listablanca_sams_(altas|bajas|cambios)_<HEX2>_<TIMESTAMP12>.csv
 * - listablanca_cv: listablanca_sams_cv_(altas|bajas|cambios)_<HEX2>_<TIMESTAMP12>.csv
 * - inventario: inventario_sams_(altas|bajas|cambios)_<HEX2>_<TIMESTAMP12>.csv
 * - sams: buscar_sams*.csv
 *
 * @param {string} filename - Nombre del archivo a validar.
 * @returns {boolean} Retorna `true` si el nombre del archivo coincide con alguno de los patrones válidos, `false` en caso contrario.
 */
export const validateFileName = (filename: string): boolean => {
  try {
    const patterns = {
      listanegra: /^listanegra_tarjetas_(altas|bajas|cambios)_[0-9A-Fa-f]{2}_\d{14}\.csv$/,
      listablanca: /^listablanca_sams_(altas|bajas|cambios)_[0-9A-Fa-f]{2}_\d{12}\.csv$/,
      listablanca_cv: /^listablanca_sams_cv_(altas|bajas|cambios)_[0-9A-Fa-f]{2}_\d{12}\.csv$/,
      inventario: /^inventario_sams_(altas|bajas|cambios)_[0-9A-Fa-f]{2}_\d{12}\.csv$/,
      sams: /^buscar_sams.*\.csv$/
    }

    const fileType = Object.entries(patterns).find(([, regex]) =>
      regex.test(filename)
    )?.[0]

    return !!fileType  
  } catch (error) {
    notify.error(`Error al validar nombre de archivo: ${filename}`)
    return false
  }
}

/**
 * Descarga un archivo en el navegador utilizando un objeto Blob.
 *
 * @param data - Contenido del archivo como cadena de texto (CSV).
 * @param filename - Nombre del archivo que se descargará (incluye extensión, como `datos.csv`).
 * @param type - Tipo MIME del archivo (por ejemplo, `text/csv`).
 */
export const downloadFile = (data: string, filename: string, type: string) => {
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
/**
 * Convierte un arreglo de objetos en una cadena con formato CSV.
 *
 * @param objArray - Arreglo de objetos a convertir. Cada objeto debe tener las mismas claves (columnas).
 * @returns Una cadena en formato CSV que incluye encabezados y filas separadas por comas.
 *
 * @example
 * const data = [{ name: "Ana", age: 30 }, { name: "Luis", age: 25 }]
 * const csv = convertToCSV(data)
 * // Resultado:
 * // name,age
 * // Ana,30
 * // Luis,25
 */
export const convertToCSV = (objArray: any[]) => {
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
/**
 * Obtiene la fecha y hora actual en formato compacto `YYYYMMDD_HHMMSS`.
 *
 * @returns Una cadena con la fecha y hora actual.
 *
 * @example
 * const timestamp = getCurrentDateTime()
 * // Resultado: '20250522_143015'
 */
export const getCurrentDateTime = () => {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")

  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")

  return `${year}${month}${day}_${hours}${minutes}${seconds}`
}
export const getCurrentDateTimeInputs = () => {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")

  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")

  return `${year}${month}${day}${hours}${minutes}`
}

/**
 * Genera y descarga tres archivos CSV con diferentes conjuntos de datos de la Whitelist:
 * 1. Dataset completo, 2. Solo seriales (dec/hex), 3. Solo seriales hexadecimales.
 * 
 * @export
 * @function handleDownloadWL
 * @param {Array<Object>} data - Datos originales de la Whitelist (array de objetos).
 * @returns {void} Efectos secundarios:
 *   - Descarga 3 archivos CSV con prefijo de timestamp.
 *   - Muestra notificación de éxito.
 * 
 * @throws {Error} Si:
 *   - `data` no es un array.
 *   - Fallo en la conversión CSV.
 *   - Error durante la descarga.
 * 
 * @example <caption>Descarga desde datos de Whitelist</caption>
 * const whitelistData = [
 *   {
 *     serial_dec: "12345",
 *     serial_hex: "3039",
 *     config: "A1B2",
 *     operator: "Operador X",
 *     location_id: "LOC-001",
 *     estacion: "EST-1"
 *   }
 * ]
 * handleDownloadWL(whitelistData)
 * // Descarga:
 * // - YYYYMMDD_HHMMSS_listablanca_cv_all.csv (dataset completo)
 * // - YYYYMMDD_HHMMSS_listablanca_cv_partial.csv (solo seriales)
 * // - YYYYMMDD_HHMMSS_listablanca_cv.csv (solo hex)
 * 
 * @example <caption>Manejo de errores</caption>
 * try {
 *   handleDownloadWL(null)
 * } catch (error) {
 *   console.error("Error en descarga:", error.message)
 *   notify.error("Falló la generación de archivos")
 * }
 */
export const handleDownloadWL = (data: any, name: string) => {
  const dateTime = getCurrentDateTime()

  // 1. Archivo completo
  const allData = data.map((item: any) => ({
    serial_dec: item.serial_dec,
    serial_hex: item.serial_hex,
    config: item.config,
    operator: item.operator,
    location_id: item.location_id,
    estacion: item.estacion,
  }))
  const fullCSV = convertToCSV(allData)
  downloadFile(fullCSV, `${dateTime}_${name}_all.csv`, "text/csv")

  // 2. Archivo solo con serial_dec y serial_hex
  const serialData = data.map((item: any) => ({
    serial_dec: item.serial_dec,
    serial_hex: item.serial_hex,
  }))
  const serialCSV = convertToCSV(serialData)
  downloadFile(
    serialCSV,
    `${dateTime}_${name}_partial.csv`,
    "text/csv"
  )

  // 3. Archivo solo con serial_hex
  const hexOnlyData = data.map((item: any) => ({
    serial_hex: item.serial_hex,
  }))
  const hexCSV = convertToCSV(hexOnlyData)
  downloadFile(hexCSV, `${dateTime}_${name}.csv`, "text/csv")
  notify.success('Descarga Exitosa!')
}
/**
 * Convierte datos a formato CSV, los descarga como archivo y notifica el éxito.
 * 
 * @export
 * @function handleDownloadFileEvent
 * @param {Array<Object>} data - Datos a convertir (array de objetos).
 * @param {string} fileName - Nombre del archivo destino (ej: "reporte.csv").
 * @returns {void} No retorna valor, genera efectos secundarios:
 *   1. Crea un CSV con los datos clonados.
 *   2. Dispara descarga automática en el navegador.
 *   3. Muestra notificación de éxito.
 * 
 * @throws {Error} Si:
 *   - `data` no es un array.
 *   - `fileName` no es una cadena válida.
 *   - Fallo en la conversión CSV o descarga.
 * 
 * @example <caption>Descarga datos simples</caption>
 * handleDownloadFileEvent(
 *   [{ id: 1, name: "Ejemplo" }],
 *   "ejemplo.csv"
 * )
 * // Resultado: Descarga "ejemplo.csv" y muestra notificación.
 * 
 * @example <caption>Manejo de errores</caption>
 * try {
 *   handleDownloadFileEvent(null, "error.csv")
 * } catch (error) {
 *   console.error("Falló la descarga:", error.message)
 * }
 */
export const handleDownloadFileEvent = (data: any, fileName: string) => {
  const dataFile = data.map((item: any) => ({ ...item }))
  const eventCSV = convertToCSV(dataFile)
  downloadFile(eventCSV, fileName, "text/csv")
  notify.success(`Descarga de ${fileName} con exito!`)
}
/**
 * Maneja la descarga de un archivo si el array de datos no está vacío,
 * de lo contrario muestra un mensaje informativo.
 * 
 * @function handleDownloadIfData
 * @param {Array<any>} dataArray - Array de datos que se evaluará para descargar.
 * @param {string} fileName - Nombre del archivo a generar (incluyendo extensión).
 * @param {string} message - Mensaje a mostrar si no hay datos para descargar.
 * @returns {void} No retorna ningún valor (solo ejecuta efectos secundarios).
 *
 * @example
 * // Ejemplo 1: Con datos disponibles
 * handleDownloadIfData(
 *   [{id: 1, name: 'Ejemplo'}],
 *   'datos_ejemplo.csv',
 *   'No hay datos para descargar'
 * )
 * // => Genera el archivo 'datos_ejemplo.csv'
 *
 * @example
 * // Ejemplo 2: Sin datos disponibles
 * handleDownloadIfData(
 *   [],
 *   'datos_vacios.csv',
 *   'No hay datos para descargar'
 * )
 * // => Muestra notificación "No hay datos para descargar"
 */
export const handleDownloadIfData = (dataArray: any[], fileName: string) => {
  const dateTime = getCurrentDateTimeInputs()
  const providerCodes = {
    "01": ['01', '02', '03', '04', '05', '06', '07'],
    "5A": ['5A', '3C'],
    "32": ['32'],
    "15": ['15'],
    "46": ['46']
  }
  Object.entries(providerCodes).forEach(([key, codes]) => {

    const filteredData = dataArray.filter(item =>
      codes.some(code => String(item.OPERATOR) === String(code)))

    if (filteredData.length > 0) {
      const finalFileName = `${fileName}_${key}_${dateTime}.csv`  
      handleDownloadFileEvent(filteredData, finalFileName)
    } 
  })
}