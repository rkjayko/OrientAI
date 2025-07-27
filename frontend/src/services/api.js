// api.js
import apiClient from '../apiClient.js';

export const enviarPregunta = (pregunta) => {
  return apiClient.post('/orientacion', { pregunta });
};

export const enviarRespuesta = ({ estudiante_id, pregunta_id, respuesta }) => {
  return apiClient.post('/respuestas', {
    estudiante_id,
    pregunta_id,
    respuesta,
  });
};

export const obtenerPreguntas = () => {
  return apiClient.get('/preguntas');
};

export const enviarEstudiante = ({ nombre, documento }) => {
  return apiClient.post('/estudiantes', { nombre, documento });
};

export const obtenerResultado = (estudiante_id) => {
  return apiClient.get(`/resultados/${estudiante_id}`, {
    timeout: 180000  // Esperar hasta 180 segundos (3 minutos) por la respuesta de la IA
  });
};