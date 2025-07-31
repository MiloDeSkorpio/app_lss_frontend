import { useValidateCV } from "../../hooks/SamsHooks"
import LoaderCSV from "../../components/features/LoaderCSV"

const SamsCVUpdate = () => {
  const multerOpt = "csvFiles"
  const maxFiles = 15
  const multiple = true
  const uploadMutation = useValidateCV()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Actualización de CV</h1>
      <LoaderCSV
        uploadMutation={uploadMutation}
        multerOpt={multerOpt}
        maxFiles={maxFiles}
        multiple={multiple}
      />
    </div>
  )
}

export default SamsCVUpdate
