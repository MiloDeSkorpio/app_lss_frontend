export type SearchResult = {
  SERIAL_DEC: number
  SERIAL_HEX: string
  CONFIG: string
  OPERATOR: string
  LOCATION_ID: string
  ESTACION: string
  VERSION: string
  ESTADO: string
}
export interface CompareVersionsParams {
  currentVers: number
  oldVersion: number
}