import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import OptionButton from './OptionButton';
import { obtenerPreguntas, enviarRespuesta, obtenerResultado } from '../services/api';

// Función para corregir la codificación de caracteres desde el frontend.
function decodeUtf8FromLatin1(str) {
  if (!str) return '';
  // Convierte el string (interpretado como latin1) a bytes y luego lo decodifica como UTF-8.
  const bytes = new Uint8Array([...str].map(c => c.charCodeAt(0)));
  return new TextDecoder('utf-8').decode(bytes);
}

const QuestionView = ({ user, onTerminado }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWaitingForResult, setIsWaitingForResult] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await obtenerPreguntas();
        const formattedQuestions = response.data.map(q => ({
          ...q,
          texto: decodeUtf8FromLatin1(q.texto), 
          options: (q.opciones || 'Sí,No').split(',').map(op => ({ id: op.trim(), texto: op.trim() }))
        }));
        setQuestions(formattedQuestions);
      } catch (err) {
        setError('No se pudieron cargar las preguntas. Intenta de nuevo más tarde.');
        console.error('Error al cargar preguntas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const fetchFinalResult = async () => {
    try {
      const response = await obtenerResultado(user.id);
      onTerminado(response.data);
    } catch (err) {
      console.error('Error al obtener el resultado de la IA:', err);
      setError('No se pudo generar un resultado. Intenta más tarde.');
    } finally {
      setIsWaitingForResult(false);
    }
  };

  const handleAnswer = async (optionId) => {
    const questionId = questions[currentQuestionIndex].id;
    const newAnswers = [
      ...answers,
      { questionId, optionId },
    ];
    setAnswers(newAnswers);

    await enviarRespuesta({ estudiante_id: user.id, pregunta_id: questionId, respuesta: optionId });

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // Cuestionario completado
      setIsWaitingForResult(true);
      await fetchFinalResult();
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando preguntas...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (isWaitingForResult) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Card sx={{ minWidth: 275, maxWidth: 600, width: '100%', p: 4, textAlign: 'center' }}>
          <Typography variant="h2">🧠 Generando tu orientación...</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>Esto puede tardar unos segundos. Por favor, espera.</Typography>
          <CircularProgress sx={{ mt: 3 }} />
        </Card>
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Card sx={{ minWidth: 275, maxWidth: 600, width: '100%', p: 4, textAlign: 'center' }}>
          <Typography variant="h2">¡Todo listo!</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>No hay preguntas para mostrar en este momento.</Typography>
        </Card>
      </Box>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const { texto, options } = currentQuestion;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ minWidth: 275, maxWidth: 600, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h2" component="h1" textAlign="center" gutterBottom>
            {texto}
          </Typography>
          <Stack spacing={2} sx={{ mt: 4 }}>
            {options.map((option) => (
              <OptionButton key={option.id} onClick={() => handleAnswer(option.id)}>
                {option.texto}
              </OptionButton>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuestionView;