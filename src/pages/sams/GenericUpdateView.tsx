import LoaderCSV from "../../components/features/LoaderCSV"
import { useRouteAwareApi } from "../../hooks/useRouteAwareApi"

const GenericUpdateView = () => {
  const config = useRouteAwareApi()

  if (!config || !('update' in config) || !config.update) {
    return <div>Error: Configuración de actualización no encontrada para esta ruta.</div>
  }
  const { title, useValidate, useUpload } = config.update
  const validateMutation = useValidate()
  const uploadMutation = useUpload()

  const multerOpt = "csvFiles"
  const maxFiles = 15
  const multiple = true

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <LoaderCSV
        validateMutation={validateMutation}
        uploadMutation={uploadMutation}
        multerOpt={multerOpt}
        maxFiles={maxFiles}
        multiple={multiple}
      />
    </div>
  )
}

export default GenericUpdateView
