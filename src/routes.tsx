import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers/queryProvider'
import  SamsView  from './pages/sams/SamsView'
import App from './App'
import CardsView from './pages/cards/CardsView'
import TransactionView from './pages/TransactionView'
import SecurityView from './pages/SecurityView'
import GenericSearchView from './pages/sams/GenericSearchView'
import GenericVersionsView from './pages/sams/GenericVersionsView'
import GenericUpdateView from './pages/sams/GenericUpdateView'

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "sams",
    element: <SamsView />,
  },
  {
    path: "sams/update-cv",
    element: <GenericUpdateView />,
  },
  {
    path: "sams/update",
    element: <GenericUpdateView />,
  },
  {
    path: "sams/update-inv",
    element: <GenericUpdateView />,
  },
  {
    path: "sams/search-cv",
    element: <GenericSearchView />,
  },
  {
    path: "sams/search",
    element: <GenericSearchView />,
  },
  {
    path: "sams/search-inv",
    element: <GenericSearchView />,
  },
  {
    path: "sams/versions-cv",
    element: <GenericVersionsView />,
  },
  {
    path: "sams/versions",
    element: <GenericVersionsView />,
  },
  {
    path: "sams/versions-inv",
    element: <GenericVersionsView />,
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