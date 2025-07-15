import type { UseMutationResult } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { notify } from "../../utils/notifications"
import type { AxiosError } from "axios"

type LoaderCSVProps = {
  uploadMutation: UseMutationResult<any, unknown, FormData>
  multerOpt: string
  maxFiles: number
  multiple: boolean
}
type ExtendedFile = File & {
  preview: string
}

const LoaderCSV: React.FC<LoaderCSVProps> = ({ uploadMutation, multerOpt, maxFiles, multiple }) => {
  const [files, setFiles] = useState<ExtendedFile[]>([])
  const handleUpload = () => {
    if (files.length > 0) {
      // Crear FormData y agregar todos los archivos
      const formData = new FormData()
      files.forEach((file) => {
        formData.append(`${multerOpt}`, file) // csvFiles es el mismo nombre que se utiliza en el backend desde multer "upload.array('csvFiles')"
      })

      // Usar mutationFn directamente si está configurada para FormData
      uploadMutation.mutate(formData, {
        onSuccess: () => {
          notify.success(`${files.length} archivo(s) subido(s) correctamente`)
          setFiles([])
        },
        onError: (error) => {
          const err = error as AxiosError<any> // <--- casting
          const message = err.response?.data?.error || err.message || 'Error desconocido'
          notify.error(`${ message }`
          )
        },
      })
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    )

    setFiles((prevFiles) => [...prevFiles, ...mappedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"], // Para compatibilidad con versiones antiguas
      "text/plain": [".csv"], // Algunos sistemas pueden reportar CSV como text/plain
    },
    maxFiles: maxFiles,
    multiple: multiple,
  })
  // Limpia las URLs de vista previa para evitar fugas de memoria
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  const removeFile = (index: number) => {
    const newFiles = [...files]
    URL.revokeObjectURL(newFiles[index].preview)
    newFiles.splice(index, 1)
    notify.success('Archivo Eliminado Correctamente')
    setFiles(newFiles)
  }
  return (
    <>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "bg-blue-50 border-blue-400"
            : "bg-white border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          {isDragActive ? (
            <p className="text-sm text-blue-500">Suelta los archivos aquí...</p>
          ) : (
            <>
              <p className="text-sm text-gray-500">
                Arrastra y suelta {maxFiles === 1 ? "el archivo" : "los archivos"} aquí, o haz clic para seleccionar
              </p>
              <p className="text-sm text-gray-500">
                Formato aceptado: CSV (Máx. {maxFiles} {maxFiles === 1 ? "archivo" : "archivos"})
              </p>
            </>
          )}
        </div>
      </div>

      {/* Vista previa de archivos */}
      {files.length > 0 && (
        <div className="mt-6 space-y-2.5">
          <h4 className="text-lg font-medium mb-3">Archivos seleccionados:</h4>
          <ul className="space-y-3">
            {files.map((file, index) => (
              <li
                key={file.name + index}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <div className="flex items-center space-x-3">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={file.preview}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Eliminar archivo"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              uploadMutation.isPending
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploadMutation.isPending ? "Subiendo..." : "Subir archivo"}
          </button>

          {uploadMutation.isError && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md">
              Error:{" "}
              {uploadMutation.error instanceof Error
                ? uploadMutation.error.response?.data?.error
                : "Error desconocido"}
            </div>
          )}

          {uploadMutation.isSuccess && (
            <div className="p-3 bg-green-50 text-green-600 rounded-md">
              Archivo subido correctamente
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default LoaderCSV
