import CardButton from "../components/common/CardButton"

const DashboardHome = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-6xl mx-auto">
      <CardButton
        to="/sams"
        label="SAMS"
        color="blue"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 9h6v6H9z"
            />
          </svg>
        }
      />
      <CardButton
        to="/tarjetas"
        label="Tarjetas"
        color="green"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect
              x="3"
              y="4"
              width="18"
              height="16"
              rx="2"
              ry="2"
              strokeWidth="2"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 8c1.5 1.5 1.5 6 0 7.5"
            />
          </svg>
        }
      />
      <CardButton
        to="/listas-seguridad"
        label="Listas de Seguridad"
        color="yellow"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 6h14M5 12h14M5 18h14"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 6l2 2 2-2"
            />
          </svg>
        }
      />
      <CardButton
        to="/transacciones"
        label="Transacciones"
        color="purple"
        icon={
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m0 0L5 6m3-3l3 3M16 17v4m0 0l3-3m-3 3l-3-3"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 12h16"
            />
          </svg>
        }
      />
    </div>
  )
}




export default DashboardHome