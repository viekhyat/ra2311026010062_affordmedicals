import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App.jsx'

const theme = createTheme({
    palette: {
        primary: {
            main: '#4338ca',
        },
        secondary: {
            main: '#ec4899',
        },
        background: {
            default: '#f3f4f6',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h5: {
            fontWeight: 700,
        },
        subtitle1: {
            fontWeight: 600,
        }
    },
    shape: {
        borderRadius: 12,
    },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
  </StrictMode>,
)
