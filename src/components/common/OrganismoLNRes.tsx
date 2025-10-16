interface OrganismoLNResProps {
  organismoData: Record<string, {
    altasValidas: any[]
    altasDuplicadas: any[]
    altasInactivas: any[]
    bajasValidas: any[]
    bajasInStolen: any[]
    bajasInactivas: any[]
    bajasSinRegistro: any[]
  }>
}
const OrganismoLNRes = ({ organismoData }: OrganismoLNResProps) => {
  const [key, value] = Object.entries(organismoData)[0]

  return (
    <div className="flex flex-col border m-0.5">
      <h2 className="font-bold">{key.toUpperCase()}</h2>
      <p>Altas: {value.altasValidas.length}</p>
      <p>Altas Duplicadas: {value.altasDuplicadas.length}</p>
      <p>Altas Inactivas: {value.altasInactivas.length}</p>
      <p>Bajas: {value.bajasValidas.length}</p>
      <p>Bajas Robadas: {value.bajasInStolen.length}</p>
      <p>Bajas Inactivas: {value.bajasInactivas.length}</p>
      <p>Bajas Sin Registro: {value.bajasSinRegistro.length}</p>
    </div>
  )
}

export default OrganismoLNRes