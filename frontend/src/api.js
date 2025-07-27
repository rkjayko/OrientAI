import axios from 'axios';

// Centralizamos la configuración de Axios para toda la aplicación.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;