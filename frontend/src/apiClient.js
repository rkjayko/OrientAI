import axios from 'axios';

// Centralizamos la configuración de Axios para toda la aplicación.
const apiClient = axios.create({
  baseURL: '/api', // Usamos la ruta relativa que el proxy de Vite interceptará.
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;