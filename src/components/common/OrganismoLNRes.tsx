interface OrganismoLNResProps {
  organismoData: Record<string, {
    altasValidas: any[];
    altasDuplicadas: any[];
    bajasValidas: any[];
    bajasInStolen: any[];
    bajasInactivas: any[];
  }>
}
const OrganismoLNRes = ({ organismoData }: OrganismoLNResProps) => {
  const [key, value] = Object.entries(organismoData)[0]

  console.log(organismoData)
  return (
    <div className="flex flex-col border m-0.5">
      <h2 className="font-bold">{key.toUpperCase()}</h2>
      <p>Altas: {value.altasValidas.length}</p>
      <p>Altas Duplicadas: {value.altasDuplicadas.length}</p>
      <p>Bajas: {value.bajasValidas.length}</p>
      <p>Bajas Robadas: {value.bajasInStolen.length}</p>
      <p>Bajas Inactivas: {value.bajasInactivas.length}</p>
    </div>
  )
}

export default OrganismoLNRes;