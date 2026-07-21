import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppThemeProvider from './theme/AppThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppThemeProvider />
  </StrictMode>,
)
