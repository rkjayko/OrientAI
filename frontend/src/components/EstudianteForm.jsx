import React, { useState } from 'react';
import { enviarEstudiante } from '../services/api';

function EstudianteForm({ onRegistro }) {
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await enviarEstudiante({ nombre, documento });

      // ✅ Validación segura del ID
      const id = response?.data?.id;

      if (id) {
        console.log('✅ ID recibido del backend:', id);
        onRegistro(id);
      } else {
        console.error('❌ No se recibió un ID válido:', response.data);
        alert('No se pudo obtener tu ID de estudiante. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('❌ Error al registrar estudiante:', error);
      alert('Hubo un error al registrar tus datos. Intenta de nuevo.');
    }
  };

  return (
    <div>
      <h2>Iniciar evaluación vocacional</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Documento:</label>
          <input
            type="text"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
          />
        </div>
        <button type="submit">Comenzar</button>
      </form>
    </div>
  );
}

export default EstudianteForm;