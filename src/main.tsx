import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'
import './global.css'
import MainRoutes from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey='vite-ui-theme'>
        <MainRoutes />
        <Toaster closeButton toastOptions={
          {
            closeButton: true,
            className: 'h-[3rem] p-3',
            classNames: {
              success: 'bg-green-500 text-black font-bold',
              info: 'bg-blue-500 text-black font-bold',
              warning: 'bg-yellow-500 text-black font-bold',
              error: 'bg-red-500 text-black font-bold',
          }
        }}/>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
