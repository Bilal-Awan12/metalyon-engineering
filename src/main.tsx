import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QuoteListProvider } from './context/QuoteListContext'
import App from './App'
import './styles/tokens.css'
import './styles/base.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <QuoteListProvider>
          <App />
        </QuoteListProvider>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
)
