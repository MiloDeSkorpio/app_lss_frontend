import type { UseMutationResult } from "@tanstack/react-query"
import type { validationLSSResult, } from "../../types"
import { getCurrentDateTime } from "../../utils/FileHelpers"
import { notify } from "../../utils/notifications"
import { useNavigate } from "react-router-dom"

interface ShowInfoLSSProps {
  isOpen: boolean
  title?: string
  data: validationLSSResult
  onClose: () => void
  uploadMutation: UseMutationResult<any, unknown, any, unknown>
}

const ShowInfoLSS: React.FC<ShowInfoLSSProps> = ({ isOpen, title = 'Resumen de Version', data, onClose, uploadMutation }) => {
  if (!isOpen) return null
  const { lastVersion,
    lastVersionRecords,
    newVersion,
    newRecords,
    newRecordsCount,
    altasValidas,
    altasDuplicadas,
    bajasInactivas,
    bajasValidas,
    cambiosValidos,
    sinCambios } = data

  const navigate = useNavigate()
  const totalAltas = newRecordsCount
  const totalBajas = bajasValidas.length
  const totalCambios = cambiosValidos.length
  const totalAltasInvalid = altasDuplicadas.length
  const totalBajasInvalid = bajasInactivas.length
  const totalCambiosInvalid = sinCambios.length

  const handleUpload = () => {
    uploadMutation.mutate(
      {
        altasValidas,
        bajasValidas,
        cambiosValidos,
        newVersion
      },
      {
        onSuccess: () => {
          notify.success('Nueva Version Creada con Exito!')
          const dateTime = getCurrentDateTime()

          const resumen = [
            `📅 Fecha: ${new Date().toLocaleString()}`,
            `✅ Nueva versión ${newVersion} creada exitosamente`,
            '',
            `Altas realizadas: ${totalAltas}`,
            `Bajas realizadas: ${totalBajas}`,
            `Cambios realizadas: ${totalCambios}`,
            '',
          ].join('\n')

          // 💾 Crear y descargar archivo .txt
          const blob = new Blob([resumen], { type: 'text/plain;charset=utf-8' })
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `resumen_version_${newVersion}_${dateTime}.txt`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)

          setTimeout(() => {
            navigate('/listas-seguridad')
          }, 1500)
        },
        onError: (error) => {
          console.error(error)
        }
      }
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-900/40 bg-opacity-20 backdrop-blur-lg border border-opacity-10 flex items-center justify-center z-50 text-black">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg overflow-auto max-h-[90vh]">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-xl font-semibold ">{title}</h2>
        </div>
        <div className="space-y-1.5 my-2 p-1">
          <div className="flex justify-center space-x-3">
            <p>Registros Version <span className="font-semibold">{lastVersion}</span>: <span className="font-semibold">{lastVersionRecords.length}</span></p>
            <p>Registros Version <span className="font-semibold">{newVersion}</span>: <span className="font-semibold">{newRecordsCount}</span></p>
          </div>
          <div className="flex justify-between">
            <div>
              <p>Altas</p>
              <div className="border p-2">
                <p>Altas: <span className="font-semibold">{totalAltas}</span> </p>
                <p>Altas Duplicadas: <span className="font-semibold">{totalAltasInvalid}</span> </p>
              </div>
            </div>
            <div>
              <p>Bajas</p>
              <div className="border p-2">
                <p>Bajas: <span className="font-semibold">{totalBajas}</span> </p>
                <p>Bajas Inactivas: <span className="font-semibold">{totalBajasInvalid}</span> </p>
              </div>
            </div>
            <div>
              <p>Cambios</p>
              <div className="border p-2">
                <p>Cambios: <span className="font-semibold">{totalCambios}</span> </p>
                <p>Cambios Duplicadas: <span className="font-semibold">{totalCambiosInvalid}</span> </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-2 justify-between">
          {(totalAltas !== 0) && (
            <div>
              <button
                onClick={handleUpload}
                disabled={uploadMutation.isPending}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${uploadMutation.isPending
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                {uploadMutation.isPending ? "Actualizando..." : "Actualizar Versión"}
              </button>
            </div>
          )}
          <div>
            <button
              onClick={onClose}
              disabled={uploadMutation.isPending}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${uploadMutation.isPending
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
                }`}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



export default ShowInfoLSS;