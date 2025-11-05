import { useNavigate } from "react-router-dom"
import type {  validationLNResult } from "../../types"
import { notify } from "../../utils/notifications"
import type { UseMutationResult } from "@tanstack/react-query"
import OrganismoLNRes from "./OrganismoLNRes"
import { getCurrentDateTime } from "../../utils/FileHelpers"


interface ShowInfoBLProps {
  isOpen: boolean
  title?: string
  data: validationLNResult[]
  onClose: () => void
  uploadMutation: UseMutationResult<any, unknown, any, unknown>
}
// Define any props needed for ShowInfoBL component
const ShowInfoBL: React.FC<ShowInfoBLProps> = ({ isOpen, title = 'Resumen de Version', data, onClose, uploadMutation }) => {
  if (!isOpen) return null
  const result = data[0]
  const { altasFinal, bajasFinal, resultsByOrg, newVersion } = result
  const navigate = useNavigate()
  const totalAltas = altasFinal.length
  const totalBajas = bajasFinal.length

  const handleUpload = () => {
    uploadMutation.mutate(
      {
        altasValidas: altasFinal,
        bajasValidas: bajasFinal
      },
      {
        onSuccess: () => {
          notify.success('Nueva Version Creada con Exito!')
          const dateTime = getCurrentDateTime()
          const resumenPorOrg = resultsByOrg
            .map((orgObj) => {
              const orgKey = Object.keys(orgObj)[0]
              const data = orgObj[orgKey]

              const totalAltas = data.altasValidas?.length || 0
              const totalDuplicadas = data.altasDuplicadas?.length || 0
              const totalInactivas = data.altasInactivas?.length || 0
              const totalBajas = data.bajasValidas?.length || 0
              const totalBajasinStolen = data.bajasInStolen?.length || 0
              const totalBajasInactivas = data.bajasInactivas?.length || 0
              const totalBajasSinReg = data.bajasSinRegistro?.length || 0

              // 🧠 Construir bloque dinámico solo con valores > 0
              const bloque = [
                `Organización: ${orgKey.toUpperCase()}`,
                '',
                totalAltas > 0 && `Altas válidas: ${totalAltas}`,
                totalDuplicadas > 0 && `Altas duplicadas: ${totalDuplicadas}`,
                totalInactivas > 0 && `Altas inactivas: ${totalInactivas}`,
                totalBajas > 0 && `Bajas válidas: ${totalBajas}`,
                totalBajasinStolen > 0 && `Bajas Robadas: ${totalBajasinStolen}`,
                totalBajasInactivas > 0 && `Bajas inactivas: ${totalBajasInactivas}`,
                totalBajasSinReg > 0 && `Bajas sin registro: ${totalBajasSinReg}`
              ]
                // Eliminar valores "false" o "undefined"
                .filter(Boolean)
                .join('\n')

              // 🔹 Solo mostrar organizaciones con al menos un valor distinto de cero
              const totalGeneral =
                totalAltas +
                totalDuplicadas +
                totalInactivas +
                totalBajas +
                totalBajasinStolen +
                totalBajasInactivas +
                totalBajasSinReg

              if (totalGeneral === 0) return null 

              return bloque
            })

            .filter(Boolean)
            .join('\n-------------------------------------\n')

          const resumen = [
            `📅 Fecha: ${new Date().toLocaleString()}`,
            `✅ Nueva versión ${newVersion} creada exitosamente`,
            '',
            `Altas realizadas: ${altasFinal.length}`,
            `Bajas realizadas: ${bajasFinal.length}`,
            '',
            resumenPorOrg
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
            navigate('/tarjetas') 
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
        <div className="space-y-1.5 my-2">
          <div className="flex justify-center space-x-3">
            <p>Registros Version <span className="font-semibold">{result.currentVersion}</span>: <span className="font-semibold">{result.currentVersionCount}</span></p>
            <p>Registros Version <span className="font-semibold">{result.newVersion}</span>: <span className="font-semibold">{result.newVersionRecordsCount}</span></p>
          </div>
          <div className="flex justify-center space-x-3">
            <p>Altas: <span className="font-semibold">{totalAltas}</span></p>
            <p>Bajas: <span className="font-semibold">{totalBajas}</span></p>
          </div>
        </div>
        <div className="grid grid-cols-3">
          {resultsByOrg.map((organismo) => (
            <OrganismoLNRes
              organismoData={organismo}
            />
          ))}
        </div>
        <div className="flex mt-2 justify-between">
          {(totalAltas !== 0 || totalBajas !== 0) && (
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

export default ShowInfoBL