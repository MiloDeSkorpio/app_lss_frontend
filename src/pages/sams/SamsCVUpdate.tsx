import { useUploadCV } from "../../hooks/SamsHooks"
import LoaderCSV from "../../components/features/LoaderCSV"


const SamsCVUpdate = () => {
  const uploadMutation = useUploadCV()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Actualización de CV</h1>
      <LoaderCSV uploadMutation={uploadMutation} />
    </div>
  )
}

export default SamsCVUpdate
