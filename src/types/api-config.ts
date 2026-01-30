import type { CardData, CardLNData, LSSData } from ".";
import { getLatestVersionInv, getLatestVersionWL, getLatestVersionWLCV, useUploadCV, useValidateCV, useUploadWL, useValidate, getSamCVByHexId, useUploadListCV, getResumeCV, useCompareVersionsCV, useRestoreVersionCV, getSamByHexId, useUploadListWl, getResume, useCompareVersions, useRestoreVersion, useValidateSams, useUploadSM, getSumaryVersionInv, useUploadSAMList } from "../hooks/SamsHooks";
import { getCardByHexId, getLatestVersionBL, getResumeBL, useCompareVersionsBL, useRestoreVersionBL, useUploadListBL, useUploadLN, useValidateLN } from "../hooks/CardHooks"
import { validateFileNameWithDetails } from "../utils/FileHelpers";
import ShowInfoBL from "../components/common/ShowInfoBL";
import ShowInfo from "../components/common/ShowInfo";
import ShowInfoSams from "../components/common/ShowInfoSams";
import ShowInfoLSS from "../components/common/ShowInfoLSS";
import { getSAMTimtByHexId, getSumaryVersionLssTIMT, useUploadLSSTIMT, useValidateLSSTIMT } from "../hooks/LssHooks";

export const API_CONFIGS = {
  '/sams': {
    title: 'Administración de SAMS',
    cards: {
      // samsCV: {
      //   titleCard: 'Lista Blanca CV',
      //   useData: getLatestVersionWLCV,
      //   nav: {
      //     update: "/sams/update-cv",
      //     search: "/sams/search-cv",
      //     history: "/sams/versions-cv"
      //   },
      //   downloadName: 'listablanca_cv',
      // },
      // samsWL: {
      //   titleCard: 'Lista Blanca CL',
      //   useData: getLatestVersionWL,
      //   nav: {
      //     update: "/sams/update",
      //     search: "/sams/search",
      //     history: "/sams/versions"
      //   },
      //   downloadName: 'listablanca',
      // },
      samsInv: {
        titleCard: 'Inventario',
        useData: getSumaryVersionInv,
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
      multerOpt: "csvFiles",
      maxFiles: 15,
      multiple: true,
      useValidate: useValidateCV,
      useUpload: useUploadCV,
      localFileValidator: (file: File) => validateFileNameWithDetails(file.name, location.pathname),
      SuccessComponent: ShowInfo
    }
  },
  '/sams/update': {
    update: {
      title: "Actualización de CL",
      multerOpt: "csvFiles",
      maxFiles: 15,
      multiple: true,
      useValidate: useValidate,
      useUpload: useUploadWL,
      localFileValidator: (file: File) => validateFileNameWithDetails(file.name, location.pathname),
      SuccessComponent: ShowInfo
    }
  },
  '/sams/update-inv': {
    update: {
      title: "Actualización de Inventario",
      multerOpt: "csvFile",
      maxFiles: 1,
      multiple: false,
      useValidate: useValidateSams,
      useUpload: useUploadSM,
      localFileValidator: (file: File) => validateFileNameWithDetails(file.name, location.pathname),
      SuccessComponent: ShowInfoSams
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
      localFileValidator: (file: File) => validateFileNameWithDetails(file.name, location.pathname)
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
      localFileValidator: (file: File) => validateFileNameWithDetails(file.name, location.pathname)
    }
  },
  '/sams/search-inv': {
    search: {
      title: "Buscar SAMS General",
      getById: getSamByHexId,
      useUploadList: useUploadSAMList,
      multerOpt: "csvFile",
      maxFiles: 1,
      multiple: false,
      queryKeyForClean: "sam",
      localFileValidator: (file: File) => validateFileNameWithDetails(file.name, location.pathname)
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
  '/tarjetas': {
    title: 'Administración de Tarjetas',
    cards: {
      blacklist: {
        titleCard: 'Lista Negra',
        useData: getLatestVersionBL,
        getSummary: (data: CardLNData | undefined) => ({
          total: data?.length || 0,
          version: data?.[0]?.version_ln || "N/A",
        }),
        nav: {
          update: "/tarjetas/update-ln",
          search: "/tarjetas/search-card",
          history: "/tarjetas/versions"
        },
        downloadName: 'listanegra_tarjetas',
      }
    }
  },
  '/tarjetas/update-ln': {
    update: {
      title: "Actualización de LN",
      multerOpt: "csvFiles",
      maxFiles: 15,
      multiple: true,
      useValidate: useValidateLN,
      useUpload: useUploadLN,
      localFileValidator: (file: File) => validateFileNameWithDetails(file.name, location.pathname),
      SuccessComponent: ShowInfoBL
    }
  },
  '/tarjetas/search-card': {
    search: {
      title: "Buscar Tarjeta",
      getById: getCardByHexId,
      useUploadList: useUploadListBL,
      multerOpt: "csvFile",
      maxFiles: 1,
      multiple: false,
      queryKeyForClean: "card",
      localFileValidator: (file: File) => validateFileNameWithDetails(file.name, location.pathname)
    }
  },
  '/tarjetas/versions': {
    versions: {
      title: "Control de Versiones Blacklist",
      getResume: getResumeBL,
      useCompareVersions: useCompareVersionsBL,
      useRestoreVersion: useRestoreVersionBL,
      fileName: "listanegra_tarjetas",
    }
  },
  '/listas-seguridad': {
    title: 'Administración de Listas de Seguridad',
    cards: {
      lssTIMT: {
        titleCard: 'Tren Interurbano México-Toluca',
        useData: getSumaryVersionLssTIMT,
        getSummary: (data: LSSData | undefined) => ({
          total: data?.totalRecords,
          version: data?.version
        }),
        nav: {
          update: "/listas-seguridad/update-timt",
          search: "/listas-seguridad/search-timt",
          history: "/listas-seguridad/versions-timt"
        },
        downloadName: 'listaseguridadtimt_sams_',
      }
    }
  },
  '/listas-seguridad/update-timt': {
    update: {
      title: "Actualización LSS-TIMT",
      multerOpt: "csvFiles",
      maxFiles: 3,
      multiple: true,
      useValidate: useValidateLSSTIMT,
      useUpload: useUploadLSSTIMT,
      localFileValidator: (file: File) => validateFileNameWithDetails(file.name, location.pathname),
      SuccessComponent: ShowInfoLSS
    }
  },
    '/listas-seguridad/search-timt': {
    search: {
      title: "Buscar Tarjeta",
      getById: getSAMTimtByHexId,
      useUploadList: useUploadListBL,
      multerOpt: "csvFile",
      maxFiles: 1,
      multiple: false,
      queryKeyForClean: "sam-timt",
      localFileValidator: (file: File) => validateFileNameWithDetails(file.name, location.pathname)
    }
  },
}