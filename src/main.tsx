import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { QueryProvider } from "./providers/queryProvider.tsx"
import { Router } from "./routes.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <Router />
    </QueryProvider>
  </StrictMode>
)
