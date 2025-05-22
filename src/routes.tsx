import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers/queryProvider'
import  SamsView  from './pages/sams/SamsView'
import App from './App'
import CardsView from './pages/CardsView'
import TransactionView from './pages/TransactionView'
import SecurityView from './pages/SecurityView'
import SamsCVUpdate from './pages/sams/SamsCVUpdate'

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