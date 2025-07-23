import React, { useEffect, useState } from 'react';
import {
  obtenerPreguntas,
  enviarRespuesta,
  obtenerResultado
} from '../services/api'; // ✅ Importa función desde api.js

function PreguntaForm({ estudianteId, onResultado }) {
  const [preguntas, setPreguntas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [finalizado, setFinalizado] = useState(false);
  const [esperandoIA, setEsperandoIA] = useState(false);

  useEffect(() => {
    const cargarPreguntas = async () => {
      try {
        const response = await obtenerPreguntas();
        console.log('Preguntas recibidas:', response.data);
        setPreguntas(response.data);
      } catch (error) {
        console.error('❌ Error al cargar preguntas:', error);
        alert('No se pudieron cargar las preguntas. Intenta de nuevo más tarde.');
      } finally {
        setCargando(false);
      }
    };

    cargarPreguntas();
  }, []);

  const manejarRespuesta = async (respuesta) => {
    const preguntaActual = preguntas[indiceActual];

    if (!preguntaActual) {
      console.error('❌ No se encontró la pregunta actual.');
      return;
    }

    try {
      await enviarRespuesta({
        estudiante_id: estudianteId,
        pregunta_id: preguntaActual.id,
        respuesta,
      });

      const siguiente = indiceActual + 1;
      if (siguiente < preguntas.length) {
        setIndiceActual(siguiente);
      } else {
        setFinalizado(true);
        setEsperandoIA(true);
        await fetchResultadoIA();
      }
    } catch (error) {
      console.error('❌ Error al guardar la respuesta:', error);
      alert('Ocurrió un error al guardar tu respuesta. Intenta de nuevo.');
    }
  };

  const fetchResultadoIA = async () => {
    try {
      const response = await obtenerResultado(estudianteId); // ✅ Usa helper con timeout
      onResultado(response.data);
    } catch (error) {
      console.error('❌ Error al obtener el resultado de la IA:', error);
      onResultado({ respuesta: 'No se pudo generar un resultado. Intenta más tarde.' });
    }
  };

  if (cargando) return <p>Cargando preguntas...</p>;
  if (esperandoIA) return <p>🧠 Generando orientación vocacional... por favor espera unos segundos.</p>;
  if (preguntas.length === 0) return <p>No hay preguntas disponibles.</p>;

  const pregunta = preguntas[indiceActual];

  return (
    <div>
      <h3>Pregunta {indiceActual + 1} de {preguntas.length}</h3>
      <p><strong>{pregunta.texto}</strong></p>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => manejarRespuesta('Sí')}>Sí</button>
        <button onClick={() => manejarRespuesta('No')} style={{ marginLeft: '1rem' }}>No</button>
      </div>
    </div>
  );
}

export default PreguntaForm;