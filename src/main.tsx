import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { QueryProvider } from "./providers/queryProvider.tsx"
import { Router } from "./routes.tsx"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Router />
       <ToastContainer />
    </QueryProvider>
  </StrictMode>
)
