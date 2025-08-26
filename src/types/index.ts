/**
 * Valores disponibles para el campo ESTADO en modelos con altas y bajas
 */
type VersionStatus = 'ACTIVO' | 'INACTIVO'
/**
 * Representa el resultado de búsqueda de un registro de WL en el sistema
 * @property SERIAL_DEC - Número de serie en formato decimal
 * @property SERIAL_HEX - Número de serie en formato hexadecimal
 * @property CONFIG - Configuracion del registro de WL
 * @property OPERATOR - Provider Code el organismo
 * @property LOCATION_ID - Nomenclatura de ubicacion del registro 
 * @property ESTACION - Estacion dentro de la Linea del organismo
 * @property VERSION - Version del registro
 * @property ESTADO - Estado actual del registro de WL (ACTIVO/INACTIVO)
 */
export type SearchResult = {
  SERIAL_DEC: number
  SERIAL_HEX: string
  CONFIG: string
  OPERATOR: string
  LOCATION_ID: string
  ESTACION: string
  VERSION: number
  ESTADO: VersionStatus
}
/**
 * Valores disponibles para el campo ESTADO en modelos con altas y bajas
 * @property currentVers - version actual o más reciente 
 * @property oldVersion - version menor a la version actual
 */
export interface VersionsParams {
  currentVers: number
  oldVersion: number
}
/**
 * Disponible para llenar los selects con las versiones disponibles segun el modelo
  * @property VERSION - valor de la version
 */
export interface VersionRecords {
  VERSION: string
}

export type CompareVersionsData = {
  altasData: SearchResult[]
  cambiosData: SearchResult[]
  bajasData: SearchResult[]
  altasRes: number
  cambiosRes: number
  bajasRes: number
}
export interface validationResult {
  success: boolean
  newVersion: number
  currentVersion: number
  currentVersionCount: number
  newRecordsCount: number
  newRecordsVersion: SearchResult[]
  altasDuplicadas: any[]
  bajasInactivas: any[]
  sinCambios: any[]
  bajasValidas: any[]
  cambiosValidos: any[]
  altasValidas: any[]
}
export interface ValidationErrorItem {
  message?: string
}

export interface ValidationError {
  fileName?: string
  fileErrors?: ValidationErrorItem[]
}

export interface ValidationFileResult {
  isValid: boolean;
  errorMessage?: string;
}

export interface CardConfig {
  titleCard: string;
  useData: () => {
    data: any;
    isLoading: boolean;
    error: Error | null;
  };
  getSummary: (data: any) => {
    total: number;
    version: string;
  };
  getOperatorCount: (data: any, op: string) => number;
  nav: {
    update: string;
    search: string;
    history: string;
  };
  downloadName: string;
}