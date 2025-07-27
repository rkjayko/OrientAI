import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme'; // Usamos el tema estilo Mentimeter
import EstudianteForm from './components/EstudianteForm';
import QuestionView from './components/QuestionView';


function App() {
  const [estudiante, setEstudiante] = useState(null);

  const handleRegistro = (datosEstudiante) => {
    console.log('Estudiante registrado:', datosEstudiante);
    setEstudiante(datosEstudiante);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!estudiante ? (
        <EstudianteForm onRegistro={handleRegistro} />
      ) : (
        <QuestionView user={estudiante} />
      )}
    </ThemeProvider>
  );
}

export default App;