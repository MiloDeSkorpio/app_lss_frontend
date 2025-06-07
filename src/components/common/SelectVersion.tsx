import { useState, type FC } from "react"
import type { VersionRecords } from "../features/VersionCard"

interface SelectVersionProps {
  dataVersion?: VersionRecords[]
  idName: string
}

const SelectVersion: FC<SelectVersionProps> = ({ dataVersion, idName }) => {
  const [selectedVersion, setSelectedVersion] = useState("")
  const handleVersionChange = (version: React.SetStateAction<string>) => {
    setSelectedVersion(version) 
  }
  return (
    <>
      <select
        id={idName}
        value={selectedVersion}
        onChange={(e) => handleVersionChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">Selecciona una versión</option>
        {dataVersion?.map((ver) => (
          <option key={ver.VERSION} value={ver.VERSION}>
            {ver.VERSION}
          </option>
        ))}
      </select>
    </>
  )
}

export default SelectVersion
