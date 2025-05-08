import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryProvider } from './providers/queryProvider';
import  SamsView  from './pages/SamsView';
import App from './App';
import CardsView from './pages/CardsView';
import TransactionView from './pages/TransactionView';
import SecurityView from './pages/SecurityView';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/sams",
    element: <SamsView />,
    children: [
      
    ]
  },
  {
    path: "/tarjetas",
    element: <CardsView />,
  },
  {
    path: "/listas-seguridad",
    element: <SecurityView />,
  },
  {
    path: "/transacciones",
    element: <TransactionView />,
  },
  // Puedes agregar más rutas aquí
]);

export function Router() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}