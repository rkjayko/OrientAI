const express = require('express');
const router = express.Router();
const db = require('../db');
const ai = require('../ai');
const construirPrompt = require('../ai/construirPrompt'); // ✅ agregado

router.get('/:id', async (req, res) => {
  const estudianteId = req.params.id;
  console.log(`📥 Solicitud para generar resultado vocacional del estudiante ID: ${estudianteId}`);

  try {
    const [respuestas] = await db.query(`
      SELECT r.respuesta, p.texto AS pregunta
      FROM respuestas r
      JOIN preguntas p ON r.pregunta_id = p.id
      WHERE r.estudiante_id = ?
    `, [estudianteId]);

    console.log(`🧾 Se encontraron ${respuestas.length} respuestas para el estudiante.`);

    if (respuestas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron respuestas para este estudiante.' });
    }

    const prompt = construirPrompt(respuestas); // ✅ nuevo prompt
    console.log('📤 Prompt enviado a la IA:\n', prompt);

    const respuestaIA = await ai.getIAResponse(prompt);

    if (!respuestaIA || respuestaIA.trim() === '') {
      return res.status(500).json({ error: 'La IA no pudo generar un resultado. Intenta más tarde.' });
    }

    res.json({ respuesta: respuestaIA.trim() });

  } catch (error) {
    console.error('❌ Error generando resultado vocacional:', error.message);
    console.error(error.stack); // para ver más detalle
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;