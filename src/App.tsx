import { useNavigate } from "react-router-dom";
import './App.css'

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex space-x-2">
        <button onClick={() => navigate("/sams")}>SAMS</button>
        <button onClick={() => navigate("/tarjetas")}>Tarjetas</button>
        <button onClick={() => navigate("/listas-seguridad")}>
          Listas de Seguridad
        </button>
        <button onClick={() => navigate("/transacciones")}>
          Transacciones
        </button>
      </div>
    </>
  );
}
export default App;
