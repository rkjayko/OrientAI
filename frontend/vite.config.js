// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:59832', // ✅ URL local desde minikube service
        changeOrigin: true
        // No es necesario usar rewrite si el backend ya responde en /api/*
      }
    }
  }
});