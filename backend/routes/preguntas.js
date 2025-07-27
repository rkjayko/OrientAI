const express = require('express');
const router = express.Router();
const ai = require('../ai');
const db = require('../db');

// Ruta para obtener preguntas desde la base de datos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, texto, categoria FROM preguntas');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener preguntas:', err.message);
    res.status(500).json({ error: 'Error al obtener preguntas' });
  }
});

// Ruta para enviar una pregunta a la IA
router.post('/orientacion', async (req, res) => {
  const { pregunta } = req.body;

  try {
    const respuesta = await ai.getIAResponse(pregunta);
    res.json({ respuesta });
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

module.exports = router;