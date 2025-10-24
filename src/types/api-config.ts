import type { CardData, CardLNData } from ".";
import { getLatestVersionInv, getLatestVersionWL, getLatestVersionWLCV, useUploadCV, useValidateCV, useUploadWL, useValidate, getSamCVByHexId, useUploadListCV, getResumeCV, useCompareVersionsCV, useRestoreVersionCV, getSamByHexId, useUploadListWl, getResume, useCompareVersions, useRestoreVersion } from "../hooks/SamsHooks";
import { getCardByHexId, getResumeLastVersion, useUploadLN, useValidateLN } from "../hooks/CardHooks"

export const API_CONFIGS = {
  '/sams': {
    title: 'Administración de SAMS',
    cards: {
      samsCV: {
        titleCard: 'Lista Blanca CV',
        useData: getLatestVersionWLCV,
        getSummary: (data: CardData | undefined) => ({
          total: data?.length || 0,
          version: data?.[0]?.version || "N/A",
        }),
        getOperatorCount: (data: CardData | undefined, op: string) =>
          data?.filter((s) => s.operator === op).length || 0,
        nav: {
          update: "/sams/update-cv",
          search: "/sams/search-cv",
          history: "/sams/versions-cv"
        },
        downloadName: 'listablanca_cv',
      },
      samsWL: {
        titleCard: 'Lista Blanca CL',
        useData: getLatestVersionWL,
        getSummary: (data: CardData | undefined) => ({
          total: data?.length || 0,
          version: data?.[0]?.version || "N/A",
        }),
        getOperatorCount: (data: CardData | undefined, op: string) =>
          data?.filter((s) => s.operator === op).length || 0,
        nav: {
          update: "/sams/update",
          search: "/sams/search",
          history: "/sams/versions"
        },
        downloadName: 'listablanca',
      },
      samsInv: {
        titleCard: 'Inventario',
        useData: getLatestVersionInv,
        getSummary: (data: CardData | undefined) => ({
          total: data?.length || 0,
          version: data?.[0]?.fecha_produccion || "N/A",
        }),
        getOperatorCount: (data: CardData | undefined, op: string) =>
          data?.filter((s) => s.provider_code === op).length || 0,
        nav: {
          update: "/sams/update-inv",
          search: "/sams/search-inv",
          history: "/sams/versions-inv"
        },
        downloadName: 'inventario',
      },
    }
  },
  '/sams/update-cv': {
    update: {
      title: "Actualización de CV",
      useValidate: useValidateCV,
      useUpload: useUploadCV,
    }
  },
  '/sams/update': {
    update: {
      title: "Actualización de CL",
      useValidate: useValidate,
      useUpload: useUploadWL,
    }
  },
  '/sams/update-inv': {
    update: {
      title: "Actualización de Inventario",
      useValidate: useValidateCV,
      useUpload: useUploadCV,
    }
  },
  '/sams/search-cv': {
    search: {
      title: "Buscar SAMS CV",
      getById: getSamCVByHexId,
      useUploadList: useUploadListCV,
      multerOpt: "csvFile",
      maxFiles: 1,
      multiple: false,
      queryKeyForClean: "samcv",
    }
  },
  '/sams/search': {
    search: {
      title: "Buscar SAMS",
      getById: getSamByHexId,
      useUploadList: useUploadListWl,
      multerOpt: "csvFile",
      maxFiles: 1,
      multiple: false,
      queryKeyForClean: "sam",
    }
  },
  '/sams/search-inv': {
    search: {
      title: "Buscar SAMS General",
      getById: getSamByHexId,
      useUploadList: useUploadListWl,
      multerOpt: "csvFile",
      maxFiles: 1,
      multiple: false,
      queryKeyForClean: "sam",
    }
  },
  '/sams/versions-cv': {
    versions: {
      title: "Control de Versiones SAMS CV",
      getResume: getResumeCV,
      useCompareVersions: useCompareVersionsCV,
      useRestoreVersion: useRestoreVersionCV,
      fileName: "listablanca_sams_cv",
    }
  },
  '/sams/versions': {
    versions: {
      title: "Control de Versiones SAMS",
      getResume: getResume,
      useCompareVersions: useCompareVersions,
      useRestoreVersion: useRestoreVersion,
      fileName: "listablanca_sams",
    }
  },
  '/sams/versions-inv': {
    versions: {
      title: "Control de Versiones SAMS",
      getResume: getResume,
      useCompareVersions: useCompareVersions,
      useRestoreVersion: useRestoreVersion,
      fileName: "listablanca_sams",
    }
  },
  '/tarjetas':{
    title: 'Administración de Tarjetas',
    cards: {
      blacklist: {
        titleCard: 'Lista Negra',
        useData: getResumeLastVersion,
        getSummary: (data: CardLNData | undefined) => ({
          total: data?.totalRecords || 0,
          version: data?.lastVersion || "N/A",
        }),
        nav: {
          update: "/tarjetas/update-ln",
          search: "/tarjetas/search-card",
          history: "/tarjetas/versions-cv"
        },
        downloadName: 'listanegra_tarjetas',
      }
    }
  },
  '/tarjetas/update-ln': {
    update: {
      title: "Actualización de LN",
      useValidate: useValidateLN,
      useUpload: useUploadLN,
    }
  },
  '/tarjetas/search-card': {
    search: {
      title: "Buscar Tarjeta",
      getById: getCardByHexId,
      useUploadList: useUploadListWl,
      multerOpt: "csvFile",
      maxFiles: 1,
      multiple: false,
      queryKeyForClean: "card",
    }
  }
}