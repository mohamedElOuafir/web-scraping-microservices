import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ActiveLinkProvider } from './context/ActiveLinkContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActiveLinkProvider>
      <App />
    </ActiveLinkProvider>
  </StrictMode>
)
