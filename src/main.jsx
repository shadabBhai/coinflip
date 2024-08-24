import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WalletContext from "./utils/WalletContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WalletContext>
      <App />
    </WalletContext>
  </StrictMode>,
)
