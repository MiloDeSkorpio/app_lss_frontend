import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import "./App.css"
import { QueryProvider } from "./providers/queryProvider.tsx"
import { Router } from "./routes.tsx"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "./providers/AuthProvider.tsx"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
      <ToastContainer />
    </QueryProvider>
  </StrictMode>
)
