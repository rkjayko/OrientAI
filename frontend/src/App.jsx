import React from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container } from '@mui/material';
import TestVocacional from './components/TestVocacional';

// 1. Creamos un tema oscuro minimalista.
// Puedes personalizar colores, tipografía y más aquí.
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Un azul suave para los elementos principales
    },
    background: {
      default: '#121212', // Un fondo oscuro profundo
      paper: '#1e1e1e',   // El color para superficies como las 'Cards'
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    // 2. Aplicamos el tema y reseteamos los estilos base del navegador
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TestVocacional />
    </ThemeProvider>
  );
}

export default App;