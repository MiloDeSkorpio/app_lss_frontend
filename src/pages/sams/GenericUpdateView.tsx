import { useState } from 'react'
import LoaderCSV from '../../components/features/LoaderCSV'
import { useRouteAwareApi } from '../../hooks/useRouteAwareApi'


const GenericUpdateView = () => {
  const config = useRouteAwareApi()

  if (!config || !('update' in config) || !config.update) {
    return <div>Error: Configuración de actualización no encontrada para esta ruta.</div>
  }

  const { 
    title, 
    multerOpt, 
    maxFiles, 
    multiple,
    useValidate, 
    useUpload, 
    localFileValidator, 
    SuccessComponent   
  } = config.update

  const validateMutation = useValidate()
  const uploadMutation = useUpload() 

  const [modalData, setModalData] = useState<any>(null) 
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleValidationSuccess = (data: any) => {
    setModalData(data)
    setIsModalOpen(true)
  }

  const handleLocalFileValidate = (file: File) => {
    return localFileValidator(file)
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <LoaderCSV<any> 
        validateMutation={validateMutation}
        onValidationSuccess={handleValidationSuccess} 
        validateLocalFile={handleLocalFileValidate}   
        multerOpt={multerOpt}
        maxFiles={maxFiles}
        multiple={multiple}
      />
      {SuccessComponent && modalData && (
        <SuccessComponent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={modalData}
          uploadMutation={uploadMutation}
        />
      )}
    </div>
  )
}

export default GenericUpdateView