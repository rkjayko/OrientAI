import { createTheme } from '@mui/material/styles';

// Paleta de colores inspirada en una estética limpia y moderna.
const palette = {
  primary: {
    main: '#3D4F7A', // Un azul corporativo y sereno
    light: '#6C7B9B',
    dark: '#1B2A49',
  },
  secondary: {
    main: '#57C4E5', // Un color de acento vibrante
  },
  background: {
    default: '#F4F6F8', // Un fondo ligeramente gris para que las tarjetas resalten
    paper: '#FFFFFF',   // El color de las tarjetas y superficies
  },
  text: {
    primary: '#212121',
    secondary: '#616161',
  },
};

// Creación del tema de MUI
export const theme = createTheme({
  palette,
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    button: {
      textTransform: 'none', // Los botones en Mentimeter no suelen estar en mayúsculas
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, // Bordes más redondeados para un look más suave
  },
  components: {
    // Estilo por defecto para todos los botones
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
        },
      },
    },
    // Estilo por defecto para las tarjetas
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Una sombra muy sutil
        },
      },
    },
  },
});