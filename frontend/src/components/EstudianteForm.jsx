import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Stack, TextField, Button, CircularProgress } from '@mui/material';
import { enviarEstudiante } from '../services/api';

function EstudianteForm({ onRegistro }) {
  const [name, setName] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !documentId.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await enviarEstudiante({ nombre: name, documento: documentId });
      // Pasamos el objeto de estudiante completo, que probablemente incluye el ID.
      onRegistro(response.data);
    } catch (err) {
      let errorMessage = 'Ocurrió un error al registrar.';
      if (err.response) {
        // El servidor respondió con un error (ej. 400, 409, 500)
        errorMessage = err.response.data.message || `Error del servidor: ${err.response.status}`;
      } else if (err.request) {
        // La petición se hizo pero no se recibió respuesta
        errorMessage = 'No se pudo conectar con el servidor. Intenta de nuevo.';
      } else {
        // Otro tipo de error
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Error al registrar estudiante:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ minWidth: 275, maxWidth: 500, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h2" component="h1" textAlign="center" gutterBottom>
            Bienvenido a OrientAI
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
            Por favor, ingresa tus datos para comenzar.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              <TextField
                label="Nombre Completo"
                variant="outlined"
                fullWidth
                value={name}
                disabled={isLoading}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                label="Documento de Identidad"
                variant="outlined"
                fullWidth
                disabled={isLoading}
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
                required
                error={!!error}
                helperText={error}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!name.trim() || !documentId.trim() || isLoading}
              >
                {isLoading ? <CircularProgress size={26} color="inherit" /> : 'Comenzar'}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EstudianteForm;