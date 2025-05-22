
import type { FC, ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface CardButtonProps {
  to: string
  icon: ReactNode
  label: string
  color: string 
}

const colorMap: Record<string, string> = {
  blue: "border-blue-400 text-blue-500 group-hover:text-blue-600",
  green: "border-green-400 text-green-500 group-hover:text-green-600",
  yellow: "border-yellow-400 text-yellow-500 group-hover:text-yellow-600",
  purple: "border-purple-400 text-purple-500 group-hover:text-purple-600",
}

const CardButton: FC<CardButtonProps> = ({ to, icon, label, color }) => {
  const navigate = useNavigate()
  const styles = colorMap[color] || colorMap.blue

  return (
    <button
      onClick={() => navigate(to)}
      className={`w-48 h-48 flex flex-col items-center justify-center border rounded-xl shadow-md bg-gray-300 hover:shadow-xl transition-all duration-300 group ${styles.split(" ")[0]}`}
    >
      <div className={`w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110 ${styles.split(" ").slice(1).join(" ")}`}>
        {icon}
      </div>
      <span className={`text-lg font-semibold text-gray-700 transition-colors duration-300 group-hover:${styles.split(" ")[2]}`}>
        {label}
      </span>
    </button>
  )
}

export default CardButton
