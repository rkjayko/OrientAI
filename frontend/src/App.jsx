import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme'; // Usamos el tema estilo Mentimeter
import EstudianteForm from './components/EstudianteForm';
import QuestionView from './components/QuestionView';
import Resultados from './components/Resultados.jsx'; // 1. Importamos el nuevo componente con la extensión correcta

function App() {
  const [estudiante, setEstudiante] = useState(null);
  const [resultado, setResultado] = useState(null); // 2. Añadimos el estado para el resultado

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

  // 3. Lógica de renderizado con tres estados
  let content;
  if (resultado && estudiante) {
    // Estado 3: Mostrar resultados
    content = (
      <Resultados
        resultado={resultado.respuesta}
        nombreEstudiante={estudiante.nombre}
        onVolver={handleVolverAlInicio}
      />
    );
  } else if (estudiante) {
    // Estado 2: Mostrar cuestionario
    content = <QuestionView user={estudiante} onTerminado={handleCuestionarioTerminado} />;
  } else {
    // Estado 1: Mostrar formulario de registro
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