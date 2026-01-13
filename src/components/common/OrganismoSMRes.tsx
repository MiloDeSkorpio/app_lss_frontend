import type { SummaryData } from "../../types"

const OrganismoRes = ({ oldData, newData, dupData }: SummaryData) => {

  const organismos = Object.keys({
    ...oldData,
    ...newData,
    ...dupData
  })

  return (
    <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
      {organismos.map((organismo) => {
        
        const oldRecords = oldData[organismo] || []
        const newRecords = newData[organismo] || []
        const dupRecords = dupData[organismo] || []

        const totalRegistros =
          oldRecords.length +
          newRecords.length 

        if (totalRegistros === 0) return null

        return (
          <div
            key={organismo}
            className="border m-0.5"
          >
            <h2 className="font-bold">{organismo}</h2>
            <div className="border-t">
              <p>Anteriores: {oldRecords.length}</p>
              <p>Altas: {newRecords.length}</p>
              <p>Duplicadas: {dupRecords.length}</p>
              <p className="font-bold">Total registros: {totalRegistros}</p>
            </div>

          </div>
        )
      })}
    </div>
  )
}

export default OrganismoRes
