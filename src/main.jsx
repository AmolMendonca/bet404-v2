import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { wireAuthExchange } from './lib/supabase' // import it

// Call this once so login/refresh sends token to backend
wireAuthExchange()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
