import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//ESTE ARCHIVO ES EL INDEX.JS, SOLO QUE EN VITE TIENE QUE SER MAIN.JSX
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
