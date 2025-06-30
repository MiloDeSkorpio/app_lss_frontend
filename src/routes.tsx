import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers/queryProvider'
import  SamsView  from './pages/sams/SamsView'
import App from './App'
import CardsView from './pages/CardsView'
import TransactionView from './pages/TransactionView'
import SecurityView from './pages/SecurityView'
import SamsCVUpdate from './pages/sams/SamsCVUpdate'
import SamsCVSearch from './pages/sams/SamsCVSearch'
import SamsCVVersions from './pages/sams/SamsCVVersions'
import SamsSearch from './pages/sams/SamsSearch'
import SamsUpdate from './pages/sams/SamsUpdate'
import SamsVersions from './pages/sams/SamsVersions'

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "sams",
    element: <SamsView />,
  },
  {
    path: "sams/update-cv",
    element: <SamsCVUpdate />,
  },
  {
    path: "sams/update",
    element: <SamsUpdate />,
  },
  {
    path: "sams/search-cv",
    element: <SamsCVSearch />,
  },
  {
    path: "sams/search",
    element: <SamsSearch />,
  },
  {
    path: "sams/versions-cv",
    element: <SamsCVVersions />,
  },
  {
    path: "sams/versions",
    element: <SamsVersions />,
  },
  {
    path: "tarjetas",
    element: <CardsView />,
  },
  {
    path: "listas-seguridad",
    element: <SecurityView />,
  },
  {
    path: "transacciones",
    element: <TransactionView />,
  },
  // Puedes agregar más rutas aquí
])

export function Router() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}