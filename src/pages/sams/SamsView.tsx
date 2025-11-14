import { useNavigate } from "react-router-dom"
import OperatorCard from "../../components/common/OperatorCard"
import { handleDownloadWL } from "../../utils/FileHelpers"
import { useRouteAwareApi } from "../../hooks/useRouteAwareApi"
import type { CardConfig } from "../../types"

// Define the props type for the sub-component
interface OperatorCardFromConfigProps {
  cardConfig: CardConfig
}

// Sub-component to manage state and logic for each card from the configuration
const OperatorCardFromConfig = ({ cardConfig }: OperatorCardFromConfigProps) => {
  const navigate = useNavigate()
  const { data, isLoading, error } = cardConfig.useData()
  const { total, version } = cardConfig.getSummary(data)

  // A more sophisticated loading/error handling strategy could be implemented here
  if (isLoading) return <div>Cargando {cardConfig.titleCard}...</div>
  if (error) return <div>Error al cargar {cardConfig.titleCard}.</div>
  return (
    <OperatorCard
      title={cardConfig.titleCard}
      lastVersion={version}
      totalRecords={total}
      operators={[
        { label: "STE", value: cardConfig.getOperatorCount(data, "3C") + cardConfig.getOperatorCount(data, "5A") },
        { label: "STC", value: cardConfig.getOperatorCount(data, "32") },
        {
          label: "MB",
          value:
            cardConfig.getOperatorCount(data, "01") +
            cardConfig.getOperatorCount(data, "02") +
            cardConfig.getOperatorCount(data, "03") +
            cardConfig.getOperatorCount(data, "04") +
            cardConfig.getOperatorCount(data, "05") +
            cardConfig.getOperatorCount(data, "06") +
            cardConfig.getOperatorCount(data, "07"),
        },
        { label: "ORT", value: cardConfig.getOperatorCount(data, "15") },
        { label: "RTP", value: cardConfig.getOperatorCount(data, "46") },
      ]}
      onDownload={(e) => {
        e.preventDefault()
        handleDownloadWL(data, cardConfig.downloadName,version)
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
