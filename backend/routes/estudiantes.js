const express = require('express');
const router = express.Router();
const db = require('../db');

// Registrar estudiante
router.post('/', async (req, res) => {
  const { nombre, documento } = req.body;
  console.log('📥 Solicitud de registro recibida:', { nombre, documento });

  if (!nombre || !documento) {
    console.warn('Faltan campos obligatorios');
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const [rows] = await db.query(
      'SELECT id FROM estudiantes WHERE correo = ?', [documento]
    );

    if (rows.length > 0) {
      console.log(`Estudiante ya existe con ID: ${rows[0].id}`);
      return res.status(200).json({
        message: 'El estudiante ya está registrado',
        id: rows[0].id
      });
    }

    const MAX_INTENTOS = 2;
    let intento = 0;
    let insertado = false;
    let insertId = null;

    while (intento < MAX_INTENTOS && !insertado) {
      try {
        const result = await db.query(
          'INSERT INTO estudiantes (nombre, correo) VALUES (?, ?)',
          [nombre, documento]
        );
        insertado = true;
        insertId = result[0].insertId;
        console.log(`Estudiante insertado con ID: ${insertId}`);
      } catch (err) {
        intento++;
        console.error(`Error en intento ${intento}:`, err.message);
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    if (insertado) {
      return res.status(201).json({
        message: 'El estudiante fue registrado correctamente',
        id: insertId
      });
    } else {
      console.error('No se pudo registrar el estudiante tras varios intentos');
      return res.status(500).json({ error: 'No se pudo registrar el estudiante' });
    }

  } catch (error) {
    console.error('Se presento un error al registrar el estudiante:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Eliminar todos los estudiantes y sus datos relacionados (con transacción)
router.delete('/', async (req, res) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    console.log('Eliminando resultados...');
    await connection.query('DELETE FROM resultados_vocacionales');

    console.log('Eliminando respuestas...');
    await connection.query('DELETE FROM respuestas');

    console.log('Eliminando estudiantes...');
    await connection.query('DELETE FROM estudiantes');

    await connection.commit();
    console.log('Todos los datos de estudiantes eliminados correctamente');
    res.status(200).json({ mensaje: 'Todos los estudiantes fueron eliminados' });
  } catch (error) {
    await connection.rollback();
    console.error('Error eliminando estudiantes:', error.message);
    res.status(500).json({ error: 'Error eliminando estudiantes' });
  } finally {
    connection.release();
  }
});

module.exports = router;