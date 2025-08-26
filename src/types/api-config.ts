import { getLatestVersionInv, getLatestVersionWL, getLatestVersionWLCV } from "../hooks/SamsHooks";

export const API_CONFIGS = {
  '/sams': {
    title: 'Administración de SAMS',
    cards: {
      samsCV: {
        titleCard: 'Lista Blanca CV',
        useData: getLatestVersionWLCV,
        getSummary: (data: any) => ({
          total: data?.length || 0,
          version: data?.[0]?.version || "N/A",
        }),
        getOperatorCount: (data: any, op: string) =>
          data?.filter((s: { operator: string }) => s.operator === op).length || 0,
        nav: {
          update: "/sams/update-cv",
          search: "/sams/search-cv",
          history: "/sams/versions-cv"
        },
        downloadName: 'listablanca_cv'
      },
      samsWL: {
        titleCard: 'Lista Blanca CL',
        useData: getLatestVersionWL,
        getSummary: (data: any) => ({
          total: data?.length || 0,
          version: data?.[0]?.version || "N/A",
        }),
        getOperatorCount: (data: any, op: string) =>
          data?.filter((s: { operator: string }) => s.operator === op).length || 0,
        nav: {
          update: "/sams/update",
          search: "/sams/search",
          history: "/sams/versions"
        },
        downloadName: 'listablanca'
      },
      samsInv: {
        titleCard: 'Inventario',
        useData: getLatestVersionInv,
        getSummary: (data: any) => ({
          total: data?.length || 0,
          version: data?.[0]?.fecha_produccion || "N/A",
        }),
        getOperatorCount: (data: any, op: string) =>
          data?.filter((s: { provider_code: string }) => s.provider_code === op).length || 0,
        nav: {
          update: "/sams/update-inv",
          search: "/sams/search-inv",
          history: "/sams/versions-inv"
        },
        downloadName: 'inventario'
      },
    },
    // Mantenemos el resto de la configuración por si se usa en otro lado
    queryKey: 'samsCV',
    validate: 'Validar CV',
    upload: 'Subir CV',
    download: 'Descargar CV',
    getById: 'getSamCVByHexId',
    getSamsByFile: 'getSamsCVByFile',
    compareVersions: 'compareVersionsCV',
    restoreVersion: 'restoreVersionCV',
    downloadDiferences: 'downloadDifferencesCV',
  }
};
