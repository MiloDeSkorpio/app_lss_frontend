/**
 * Valores disponibles para el campo ESTADO en modelos con altas y bajas
 */
// type VersionStatus = 'ACTIVO' | 'INACTIVO'

import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query"

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
  success: boolean
  data: any[] | SearchSummary
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
export interface VersionLNRecords {
    version_ln: string 
}

export type CompareVersionsData = {
  altasData: SearchResult[]
  cambiosData: SearchResult[]
  bajasData: SearchResult[]
  altasRes: number
  cambiosRes: number
  bajasRes: number
}
export type validationProps = validationResult[] | validationLNResult[]
export interface validationResult {
  success: boolean
  newVersion: number
  currentVersion: number
  currentRecordsCount: number
  newRecordsCount: number
  newRecordsVersion: SearchResult[]
  altasDuplicadas: any[]
  bajasInactivas: any[]
  sinCambios: any[]
  bajasValidas: any[]
  cambiosValidos: any[]
  altasValidas: any[]
}
export interface validationLNResult {
  success: boolean
  newVersion: number
  currentVersion: any[]
  currentVersionCount: number
  newVersionRecordsCount: number
  newRecordsCount: number
  altasFinal: any[]
  bajasFinal: any[]
  resultsByOrg: any[]
}
export interface ValidationErrorItem {
  message?: string
}

export interface ValidationError {
  fileName?: string
  fileErrors?: ValidationErrorItem[]
}

export interface ValidationFileResult {
  isValid: boolean
  errorMessage?: string
}

// A generic type for the records returned by the list/version hooks
export type VersionDataRecord = {
  version?: number | string
  operator?: string
  fecha_produccion?: string
  provider_code?: string
  [key: string]: any
}

export type CardData = VersionDataRecord[]

export type VersionDataLNRecord = {
  totalRecords?: number 
  lastVersion?: string
}

export type CardLNData = VersionDataLNRecord

export type ListCVPayload = {
  altasValidas: any[],
  bajasValidas: any[],
  cambiosValidos: any[]
}
export type ListLNPayload = {
  altasValidas: any[],
  bajasValidas: any[]
}
export type uploadPayload = ListCVPayload | ListLNPayload
// New interfaces for nested configurations
export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any; 
  uploadMutation: UseMutationResult<any, unknown, any, unknown>
}
export interface UpdateConfig {
  title: string
  useValidate: () => any 
  useUpload: () => any 
  localFileValidator: (file: File) => { isValid: boolean, errorMessage?: string };
  SuccessComponent: React.ComponentType<SuccessModalProps>;
}

export interface SearchConfig {
  title: string;
  getById: (id: string) => UseQueryResult<any, unknown>;
  useUploadList: () => UseMutationResult<any, unknown, FormData, unknown>;
  multerOpt: string;
  maxFiles: number;
  multiple: boolean;
  queryKeyForClean: string;
  localFileValidator: (file: File) => { isValid: boolean, errorMessage?: string };
}

export interface VersionsConfig {
  title: string
  getResume: () => any // Consider more specific type if possible
  useCompareVersions: () => any // Consider more specific type if possible
  useRestoreVersion: () => any // Consider more specific type if possible
  fileName: string
}

export interface CardConfig {
  titleCard: string
  useData: () => {
    data: CardData | undefined // data can be undefined while loading
    isLoading: boolean
    error: Error | null
  }
  getSummary: (data: CardData | undefined) => {
    total: number
    version: string
  }
  getOperatorCount: (data: CardData | undefined, op: string) => number
  nav: {
    update: string
    search: string
    history: string
  }
  downloadName: string
  update?: UpdateConfig // Use the new interface
  search?: SearchConfig // Use the new interface
  versions?: VersionsConfig // Use the new interface
}
export interface CardLNConfig {
  titleCard: string
  useData: () => {
    data: CardLNData | undefined // data can be undefined while loading
    isLoading: boolean
    error: Error | null
  }
  getSummary: (data: CardLNData | undefined) => {
    total: number
    version: string
  }
  nav: {
    update: string
    search: string
    history: string
  }
  downloadName: string
  update?: UpdateConfig // Use the new interface
  search?: SearchConfig // Use the new interface
  versions?: VersionsConfig // Use the new interface
}

export interface MainRouteConfig {
  title: string
  cards: {
    [key: string]: CardConfig
  }
  queryKey?: string
  validate?: string
  upload?: string
  download?: string
  getById?: string
  getSamsByFile?: string
  compareVersions?: string
  restoreVersion?: string
  downloadDiferences?: string
}

export type UseRouteAwareApiReturn = MainRouteConfig | CardConfig | null

export interface ResumeCardProps {
  title: string
  lastVersion: string
  totalRecords: number
  onDownload?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onUpdate?: () => void
  onSearch?: () => void
  onHistory?: () => void
}

export type ExtendedFile = File & {
  preview: string
}

export type LoaderCSVProps<TValidationResult> = {
  validateMutation: UseMutationResult<TValidationResult, unknown, FormData>
  validateLocalFile: (file: File) => { isValid: boolean, errorMessage?: string }
  onValidationSuccess: (data: TValidationResult) => void
  multerOpt: string
  maxFiles: number
  multiple: boolean
}

export type SearchSummary = {
  recordsFound: any[]
  recordsNotFound: string[]
}