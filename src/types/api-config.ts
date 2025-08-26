import type { CardData } from ".";
import { getLatestVersionInv, getLatestVersionWL, getLatestVersionWLCV, useUploadCV, useValidateCV, useUploadWL, useValidate } from "../hooks/SamsHooks";

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
        update: {
          title: "Actualización de CV",
          useValidate: useValidateCV,
          useUpload: useUploadCV,
        }
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
        update: {
          title: "Actualización de CL",
          useValidate: useValidate,
          useUpload: useUploadWL,
        }
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
        update: {
          title: "Actualización de Inventario",
          useValidate: useValidate,
          useUpload: useUploadWL,
        }
      },
    }
  }
}