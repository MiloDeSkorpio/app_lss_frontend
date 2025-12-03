import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryProvider } from './providers/queryProvider'
import SamsView from './pages/sams/SamsView'
import CardsView from './pages/cards/CardsView'
import TransactionView from './pages/TransactionView'
import SecurityView from './pages/SecurityView'
import GenericSearchView from './pages/sams/GenericSearchView'
import GenericVersionsView from './pages/sams/GenericVersionsView'
import GenericUpdateView from './pages/sams/GenericUpdateView'
import { AuthProvider } from './providers/AuthProvider'
import LoginView from './pages/LoginView'
import DashboardHome from './pages/DashboardHome'
import DashboardLayout from './components/layouts/DashboardLayout'
import PrivateRoute from './components/common/PrivateRoute'
import RegisterView from './pages/RegisterView'
import VerifyEmailView from './pages/VerifyEmailView'
import ResendCodeView from './pages/ResendCodeView'
import ResetPasswordView from './pages/ResetPasswordView'

const router = createBrowserRouter([
  { path: "/login", element: <LoginView /> },
  { path: "/register", element: <RegisterView /> },
  { path: "/verify-account", element: <VerifyEmailView /> },
  { path: "/resend-code-account", element: <ResendCodeView /> },
  { path: "/recuperar-password", element: <ResetPasswordView /> },

  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          { path: "", element: <DashboardHome /> },
          { path: "sams", element: <SamsView /> },
          { path: "sams/update-cv", element: <GenericUpdateView /> },
          { path: "sams/update", element: <GenericUpdateView /> },
          { path: "sams/update-inv", element: <GenericUpdateView /> },
          { path: "sams/search-cv", element: <GenericSearchView /> },
          { path: "sams/search", element: <GenericSearchView /> },
          { path: "sams/search-inv", element: <GenericSearchView /> },
          { path: "sams/versions-cv", element: <GenericVersionsView /> },
          { path: "sams/versions", element: <GenericVersionsView /> },
          { path: "sams/versions-inv", element: <GenericVersionsView /> },
          { path: "tarjetas", element: <CardsView /> },
          { path: "tarjetas/update-ln", element: <GenericUpdateView /> },
          { path: "tarjetas/search-card", element: <GenericSearchView /> },
          { path: "tarjetas/versions", element: <GenericVersionsView /> },
          { path: "listas-seguridad", element: <SecurityView /> },
          { path: "transacciones", element: <TransactionView /> },
        ],
      },
    ],
  },
])

export function Router() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryProvider>
  )
}