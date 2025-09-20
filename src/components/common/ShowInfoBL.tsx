import { useNavigate } from "react-router-dom"
import type { ListLNPayload, validationLNResult } from "../../types"
import { notify } from "../../utils/notifications"
import type { UseMutationResult } from "@tanstack/react-query"
import OrganismoLNRes from "./OrganismoLNRes"


interface ShowInfoBLProps {
  isOpen: boolean
  title?: string
  data: validationLNResult[]
  onClose: () => void
  uploadMutation: UseMutationResult<any, unknown, ListLNPayload>
}
// Define any props needed for ShowInfoBL component
const ShowInfoBL: React.FC<ShowInfoBLProps> = ({ isOpen, title = 'Resumen de Version', data, onClose, uploadMutation }) => {
  if (!isOpen) return null
  const result = data[0]
  const dataFinal = [result.altasFinal, result.bajasFinal]
  const resumeByOrg = result.resultsByOrg
  const navigate = useNavigate()
  const totalAltas = result.altasFinal.length
  const totalBajas = result.bajasFinal.length

  const handleUpload = () => {
    uploadMutation.mutate(
      {
        altasValidas: dataFinal[0],
        bajasValidas: dataFinal[1]
      },
      {
        onSuccess: () => {
          notify.success('Nueva Version Creada con Exito!')
          navigate('/tarjetas')
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
            <p>Registros Version <span className="font-semibold">{result.newVersion}</span>: <span className="font-semibold">{result.newRecordsCount}</span></p>
          </div>
          <div className="flex justify-center space-x-3">
            <p>Altas: <span className="font-semibold">{totalAltas}</span></p>
            <p>Bajas: <span className="font-semibold">{totalBajas}</span></p>
          </div>
        </div>
        <div className="grid grid-cols-3">
          {resumeByOrg.map((organismo,) => (
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
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Actualizar Versión
              </button>
            </div>
          )}
          <div>
            <button onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowInfoBL;