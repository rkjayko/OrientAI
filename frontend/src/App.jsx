import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import EstudianteForm from './components/EstudianteForm';
import QuestionView from './components/QuestionView';
import Resultados from './components/Resultados.jsx';

function App() {
  const [estudiante, setEstudiante] = useState(null);
  const [resultado, setResultado] = useState(null);

  const handleRegistro = (datosEstudiante) => {
    console.log('Estudiante registrado:', datosEstudiante);
    setEstudiante(datosEstudiante);
  };

  const handleCuestionarioTerminado = (datosResultado) => {
    console.log('Resultado recibido:', datosResultado);
    setResultado(datosResultado);
  };

  const handleVolverAlInicio = () => {
    setEstudiante(null);
    setResultado(null);
  };

  let content;
  if (resultado && estudiante) {
    content = (
      <Resultados
        resultado={resultado.respuesta}
        nombreEstudiante={estudiante.nombre}
        onVolver={handleVolverAlInicio}
      />
    );
  } else if (estudiante) {
    content = <QuestionView user={estudiante} onTerminado={handleCuestionarioTerminado} />;
  } else {
    content = <EstudianteForm onRegistro={handleRegistro} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
}

export default App;