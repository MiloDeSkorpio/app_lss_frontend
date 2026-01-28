import { useNavigate } from "react-router-dom"
import OperatorCard from "../../components/common/OperatorCard"
import { handleDownload, handleDownloadWL } from "../../utils/FileHelpers"
import { useRouteAwareApi } from "../../hooks/useRouteAwareApi"
import type { CardConfig } from "../../types"

interface OperatorCardFromConfigProps {
  cardConfig: CardConfig
}

const OperatorCardFromConfig = ({ cardConfig }: OperatorCardFromConfigProps) => {
  const navigate = useNavigate()
  const { data, isLoading, error } = cardConfig.useData()

  if (isLoading) return <div>Cargando {cardConfig.titleCard}...</div>
  if (error) return <div>Error al cargar {cardConfig.titleCard}.</div>

  return (
    <OperatorCard
      title={cardConfig.titleCard}
      lastVersion={data.version}
      totalRecords={data.totalRecords}
      operators={data.recordsByOrg}
      onDownload={(e) => {
        e.preventDefault()
        handleDownloadWL(data.records, cardConfig.downloadName, data.version)
      }}
      onUpdate={() => navigate(cardConfig.nav.update)}
      onSearch={() => navigate(cardConfig.nav.search)}
      onHistory={() => navigate(cardConfig.nav.history)}
    />
  )
}

const SamsView = () => {
  const config = useRouteAwareApi()
  if (!config || !('cards' in config) || !config.cards) {
    return <div>Cargando configuración de la ruta...</div>
  }

  const { title, cards } = config

  return (
    <div className="space-y-4">
      <h1 className="font-bold">{title}</h1>
      <div className="flex flex-wrap space-x-2">
        {(Object.values(cards) as CardConfig[]).map((config) => ( 
          <OperatorCardFromConfig
            key={config.titleCard}
            cardConfig={config}
          />
        ))}
      </div>
    </div>
  )
}

export default SamsView
