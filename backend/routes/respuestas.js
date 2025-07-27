// backend/routes/respuestas.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/respuestas
router.post('/', async (req, res) => {
  const { estudiante_id, pregunta_id, respuesta } = req.body;

  if (!estudiante_id || !pregunta_id || !respuesta) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const query = `INSERT INTO respuestas (estudiante_id, pregunta_id, respuesta) VALUES (?, ?, ?)
    `;
    await db.query(query, [estudiante_id, pregunta_id, respuesta]);

    res.status(201).json({ mensaje: 'Respuesta guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar respuesta:', error);
    res.status(500).json({ error: 'Error al guardar la respuesta' });
  }
});

module.exports = router;