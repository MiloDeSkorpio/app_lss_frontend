import { useNavigate } from "react-router-dom";
import { useRouteAwareApi } from "../../hooks/useRouteAwareApi";
import type { CardLNConfig } from "../../types";
import { handleDownloadWL } from "../../utils/FileHelpers";
import { ResumeCard } from "../../components/common/ResumeCard";

interface ResumeCardFromConfigProps {
  cardLNConfig: CardLNConfig
}

const ResumeCardFromConfig = ({ cardLNConfig }: ResumeCardFromConfigProps) => {
  const navigate = useNavigate()
  const { data, isLoading, error } = cardLNConfig.useData()
  const { total, version } = cardLNConfig.getSummary(data)
  
  if (isLoading) return <div>Cargando {cardLNConfig.titleCard}...</div>
  if (error) return <div>Error al cargar {cardLNConfig.titleCard}.</div>

  return (
    <ResumeCard
      title={cardLNConfig.titleCard}
      lastVersion={version}
      totalRecords={total}
      onDownload={(e) => {
        e.preventDefault()
        handleDownloadWL(data, cardLNConfig.downloadName)
      }}
      onUpdate={() => navigate(cardLNConfig.nav.update)}
      onSearch={() => navigate(cardLNConfig.nav.search)}
      onHistory={() => navigate(cardLNConfig.nav.history)}
    />
  )
}
const CardsView = () => {
  const config = useRouteAwareApi()
    if (!config || !('cards' in config) || !config.cards) {
    return <div>Cargando configuración de la ruta...</div>
  }
  const { title, cards} = config
  return (
    <div className="space-y-4">
      <h1 className="font-bold">{title}</h1>
      <div className="flex flex-wrap sapce-x-2">
      {(Object.values(cards) as CardLNConfig[]).map((config) => (
        <ResumeCardFromConfig
          key={config.titleCard}
          cardLNConfig={config}
        />
      ))}
      </div>
    </div>
  )
}




export default CardsView;