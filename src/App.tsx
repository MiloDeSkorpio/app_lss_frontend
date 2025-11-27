import { Outlet } from "react-router-dom"
import NavBar from "./components/common/NavBar"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
export default App
