import React, { useState, useEffect } from 'react';
import apiClient from '../api'; // Importar el cliente de API centralizado
import {
  Container,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function TestVocacional() {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar las preguntas desde el backend cuando el componente se monta
  useEffect(() => {
    const fetchPreguntas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get('/preguntas');
        setPreguntas(response.data);
      } catch (err) {
        // Axios proporciona errores más detallados
        if (err.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          setError(`Error del servidor: ${err.response.status} ${err.response.data.message || ''}`);
        } else if (err.request) {
          // La solicitud se hizo pero no se recibió respuesta (ej. el backend no está corriendo)
          setError('No se pudo conectar con el servidor. Verifica que el backend esté funcionando.');
        } else {
          // Algo sucedió al configurar la solicitud
          setError(`Error al configurar la solicitud: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, []);

  const handleRespuestaChange = (event) => {
    const preguntaId = preguntas[preguntaActual].id;
    setRespuestas({
      ...respuestas,
      [preguntaId]: event.target.value,
    });
  };

  const handleSiguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      // Lógica para finalizar el test
      console.log('Test finalizado. Respuestas:', respuestas);
      alert('¡Has completado el test!');
      // Aquí llamarías a la API para enviar las respuestas
    }
  };

  // --- Renderizado ---

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="error">Error: {error}</Alert>
      </Container>
    );
  }

  const pregunta = preguntas[preguntaActual];
  const isUltimaPregunta = preguntaActual === preguntas.length - 1;

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
      <Card sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Test Vocacional
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Pregunta {preguntaActual + 1} de {preguntas.length}
          </Typography>

          <Typography variant="h6" component="p" sx={{ mb: 3 }}>
            {pregunta.texto}
          </Typography>

          <RadioGroup
            aria-label="respuesta"
            name="respuesta"
            value={respuestas[pregunta.id] || ''}
            onChange={handleRespuestaChange}
          >
            <FormControlLabel value="si" control={<Radio />} label="Sí" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={handleSiguientePregunta}
              disabled={!respuestas[pregunta.id]} // Deshabilitar si no se ha respondido
            >
              {isUltimaPregunta ? 'Finalizar Test' : 'Siguiente'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default TestVocacional;