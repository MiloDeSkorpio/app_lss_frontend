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
 * const data = [{ name: "Ana", age: 30 }, { name: "Luis", age: 25 }];
 * const csv = convertToCSV(data);
 * // Resultado:
 * // name,age
 * // Ana,30
 * // Luis,25
 */
export  const convertToCSV = (objArray: any[]) => {
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
 * const timestamp = getCurrentDateTime();
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

