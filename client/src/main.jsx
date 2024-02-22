import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@/components/theme-provider'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './context/userContext.tsx'
import { ChatsContextProvider } from './context/chatsContext.tsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <ChatsContextProvider>
          <ThemeProvider
            defaultTheme="dark"
            storageKey="vite-ui-theme"
          >
            <App />
          </ThemeProvider>
        </ChatsContextProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>
)
