// api.js
import axios from 'axios';

const API_BASE = '/api'; // ⬅️ Ya no tiene IP ni puerto

export const enviarPregunta = (pregunta) => {
  return axios.post(`${API_BASE}/orientacion`, { pregunta });
};

export const enviarRespuesta = ({ estudiante_id, pregunta_id, respuesta }) => {
  return axios.post(`${API_BASE}/respuestas`, {
    estudiante_id,
    pregunta_id,
    respuesta,
  });
};

export const obtenerPreguntas = () => {
  return axios.get(`${API_BASE}/preguntas`);
};

export const enviarEstudiante = ({ nombre, documento }) => {
  return axios.post(`${API_BASE}/estudiantes`, { nombre, documento });
};

export const obtenerResultado = (estudiante_id) => {
  return axios.get(`${API_BASE}/resultados/${estudiante_id}`, {
    timeout: 180000  // Esperar hasta 60 segundos por la respuesta de la IA
  });
};