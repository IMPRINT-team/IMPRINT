import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  /* StrictMode is a helper tool that highlights potential problems in your code during development */
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
