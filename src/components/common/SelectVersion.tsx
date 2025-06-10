import { type FC } from "react"
import type { VersionRecords } from "../features/VersionCard"

interface SelectVersionProps {
  dataVersion?: VersionRecords[]
  idName: string
  value: number
  disabled: boolean
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectVersion: FC<SelectVersionProps> = ({ dataVersion, idName, value,onChange, disabled }) => {

  return (
    <>
      <select
        id={idName}
        value={value}
        onChange={onChange}
        disabled={disabled}
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
