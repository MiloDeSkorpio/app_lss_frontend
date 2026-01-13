import { useNavigate } from "react-router-dom"
import type { validationSMResult } from "../../types"
import { notify } from "../../utils/notifications"
import type { UseMutationResult } from "@tanstack/react-query"
import OrganismoSMRes from "./OrganismoSMRes"
import {  generateTxtSummaryFiltered, getCurrentDateTime } from "../../utils/FileHelpers"

interface ShowInfoSamsProps {
  isOpen: boolean
  title?: string
  data: validationSMResult
  onClose: () => void
  uploadMutation: UseMutationResult<any, unknown, any, unknown>
}
// Define any props needed for ShowInfoSams component
const ShowInfoSams: React.FC<ShowInfoSamsProps> = ({ isOpen, title = 'Resumen de Version', data, onClose, uploadMutation }) => {
  if (!isOpen) return null

  const newVersion = data.newVersion
  const altasValidas = data.altasValidas
  const navigate = useNavigate()

  const oldByOp: Record<string, any[]> = (data.oldByOp as unknown as Record<string, any[]>) || ({} as Record<string, any[]>)
  const validByOp: Record<string, any[]> = (data.validByOp as unknown as Record<string, any[]>) || ({} as Record<string, any[]>)
  const dupByOp: Record<string, any[]> = (data.dupByOp as unknown as Record<string, any[]>) || ({} as Record<string, any[]>)

  const handleUpload = () => {
    uploadMutation.mutate(
      { altasValidas, newVersion},
      {
        onSuccess: () => {
          notify.success('Nueva Version Creada con Exito!')
          const dateTime = getCurrentDateTime()
          const oldDataObj = oldByOp
          const newDataObj = validByOp
          const dupDataObj = dupByOp
          const resumen = [
            `Fecha: ${new Date().toLocaleString()}`,
            `Nueva versión ${newVersion} creada exitosamente`,
            `Total de altas: ${altasValidas.length}`,
            '',
            'Por Organismo:',
            '',
            generateTxtSummaryFiltered({
              oldData: oldDataObj,
              newData: newDataObj,
              dupData: dupDataObj
            })
          ].join('\n')

          const blob = new Blob([resumen], {
            type: 'text/plain;charset=utf-8'
          })

          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')

          link.href = url
          link.download =
            `resumen_version_${newVersion}_${dateTime}.txt`

          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          URL.revokeObjectURL(url)

          setTimeout(() => navigate('/sams'), 1500)
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
        <div className="space-y-1.5 my-2">
          <div className="flex justify-center space-x-3">
            <p>Registros Version <span className="font-semibold">{data.currentVersion}</span>: <span className="font-semibold">{data.currentVersionCount}</span></p>
            <p>Registros Version <span className="font-semibold">{data.newVersion}</span>: <span className="font-semibold">{data.newVersionRecordsCount}</span></p>
          </div>
          <div className="flex justify-center space-x-3">
            <p>Altas: <span className="font-semibold">{data.newVersionRecordsCount}</span></p>
            <p>Ignorados: <span className="font-semibold">{data.ignoredRows}</span></p>
          </div>
        </div>
        <div className="justify-center items-center mb-4">
          <OrganismoSMRes
            oldData={oldByOp}
            newData={validByOp}
            dupData={dupByOp}
          />
        </div>
        <div className="flex mt-2 justify-between">
          {(altasValidas.length !== 0) && (
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

export default ShowInfoSams