import type { ValidationError } from "../../types"

interface ErrorModalProps {
  isOpen: boolean
  title?: string
  errorsF: ValidationError[]
  onClose: () => void
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, title = 'Errores encontrados en los siguientes archivos:', errorsF, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900/40 bg-opacity-20 backdrop-blur-lg border border-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg overflow-auto max-h-[90vh]">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-xl font-semibold text-black">{title}</h2>
        </div>

        {errorsF
          .filter(file => file.fileErrors && file.fileErrors.length > 0)
          .map((filesError, index) => {
            return (
              <div key={index} className="mb-4 border-2 border-red-500 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600 p-2">
                  Archivo: {filesError.fileName}
                </h3>
                <ul className="text-red-600">
                  {filesError.fileErrors?.map((err, idx) => (
                    <li key={idx} className="border border-gray-500 p-1 mt-0.5">
                      {err.message}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}


        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

