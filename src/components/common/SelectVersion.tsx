
import type { FC } from "react"
import type { VersionLNRecords, VersionRecords } from "../../types"

interface SelectVersionProps {
  dataVersion?: VersionRecords[] | VersionLNRecords[]
  idName: string
  value: number | string
  disabled: boolean
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectVersion: FC<SelectVersionProps> = ({ dataVersion, idName, value, onChange, disabled }) => {
  return (
    <select
      id={idName}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-[220px] border border-gray-500 rounded-md p-2 disabled:border-gray-400 disabled:text-gray-400"
    >
      <option value="">Selecciona una versión</option>
      {dataVersion?.map((ver, idx) => {
        const version = (ver as any).VERSION || (ver as any).version_ln
        return (
          <option key={idx} value={version}>
            {version}
          </option>
        )
      })}
    </select>
  )
}

export default SelectVersion
