import { useEffect, useRef, useState } from "react"
import { useAuthContext } from "../../providers/AuthProvider"
import { useLogout } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/icoMI_gris.png"

const NavBar = () => {
  const { user } = useAuthContext()
  const logoutMutation = useLogout()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null);
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      navigate("/login")
    } catch (error: any) {
      console.error("Error al cerrar sesión", error)
    }
  }
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && e.target instanceof Node && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsMenuOpen]);
  return (
    <nav className="bg-gray-300 shadow-lg px-6 h-16 flex justify-between items-center text-gray-800">
      {/* LOGO */}
      <button
        type="button"
        className="flex items-center group cursor-pointer"
        onClick={() => navigate("/")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate("/");
          }
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="h-14 w-14 mr-2 transition-transform duration-200 group-hover:scale-105"
        />
      </button>

      {/* PROFILE MENU */}
      <div className="relative" ref={menuRef}>
        <button
          className="flex items-center space-x-2 px-3 py-2 rounded-lg border hover:bg-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="font-medium">{user?.name}</span>

          {/* ICON ANIMADO */}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : "rotate-0"
              }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* DROPDOWN */}
        {isMenuOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-gray-300 border rounded-xl shadow-xl z-20 
                        animate-fadeIn overflow-hidden"
            role="menu"
          >
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-400 transition-colors"
              onClick={() => {
                navigate("/perfil");
                setIsMenuOpen(false);
              }}
              role="menuitem"
            >
              Perfil
            </button>

            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-400 transition-colors text-red-600"
              onClick={handleLogout}
              role="menuitem"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
