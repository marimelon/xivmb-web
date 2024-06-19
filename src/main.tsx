import React from 'react'

import { createTheme, ThemeProvider } from '@mui/material'
import { RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'

import { router } from './router'

import './index.css'

const mainTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#15202B',
      paper: '#15202B',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
