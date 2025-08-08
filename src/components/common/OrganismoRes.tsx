
interface OrganismoResProps {
  data: any
  organismo: string
  codes: string[]
}

const OrganismoRes = ({ data, organismo, codes }: OrganismoResProps) => {

// Función de filtrado
  const filtrarPorOperador = (registros: any, codes: any) => {
    if (!registros || !Array.isArray(registros)) return []
    return registros.filter(registro => codes.includes(registro.OPERATOR))
  }

  // Aplicar filtro a cada tipo de registro
  const altas = filtrarPorOperador(data.altasValidas, codes).length
  const bajas = filtrarPorOperador(data.bajasValidas, codes).length
  const cambios = filtrarPorOperador(data.cambiosValidos, codes).length
  const altasDups = filtrarPorOperador(data.altasDuplicadas, codes).length
  const bajasDups = filtrarPorOperador(data.bajasInactivas, codes).length
  const sinCambios = filtrarPorOperador(data.sinCambios, codes).length
  
  return (
    <div className="flex flex-col border m-0.5">
      <h2>{organismo}</h2>
      <div>
        <p>Altas: {altas}</p>
        <p>Bajas: {bajas}</p>
        <p>Cambios: {cambios}</p>
        <p>Altas Duplicadas: {altasDups}</p>
        <p>Bajas Inactivas: {bajasDups}</p>
        <p>Sin Cambios: {sinCambios}</p>
      </div>
    </div>
  )
}

export default OrganismoRes;