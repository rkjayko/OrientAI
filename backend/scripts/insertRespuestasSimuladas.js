const db = require('../db');

async function insertarRespuestasSimuladas() {
  try {
    // 1. Insertar estudiante solo si no existe
    const [estudiantes] = await db.query(
      "SELECT id FROM estudiantes WHERE correo = ?",
      ['laura@example.com']
    );

    let estudianteId;
    if (estudiantes.length > 0) {
      estudianteId = estudiantes[0].id;
      console.log('ℹ️ Estudiante ya existe con ID:', estudianteId);
    } else {
      const result = await db.query(
        "INSERT INTO estudiantes (nombre, correo) VALUES (?, ?)",
        ['Laura Pérez', 'laura@example.com']
      );
      estudianteId = result[0].insertId;
      console.log('✅ Estudiante creado con ID:', estudianteId);
    }

    // 2. Verificar si ya hay respuestas para ese estudiante
    const [respuestas] = await db.query(
      "SELECT COUNT(*) AS total FROM respuestas WHERE estudiante_id = ?",
      [estudianteId]
    );

    if (respuestas[0].total === 0) {
      // Insertar respuestas ficticias
      const respuestasEjemplo = [
        { pregunta_id: 1, respuesta: 'Sí' },
        { pregunta_id: 2, respuesta: 'Sí' },
        { pregunta_id: 3, respuesta: 'No' },
        { pregunta_id: 4, respuesta: 'Sí' },
        { pregunta_id: 5, respuesta: 'Sí' }
      ];

      for (const r of respuestasEjemplo) {
        await db.query(
          "INSERT INTO respuestas (estudiante_id, pregunta_id, respuesta) VALUES (?, ?, ?)",
          [estudianteId, r.pregunta_id, r.respuesta]
        );
      }
      console.log('✅ Respuestas simuladas insertadas.');
    } else {
      console.log('ℹ️ Ya existen respuestas para este estudiante.');
    }

    // 3. Verificar si ya tiene resultado vocacional
    const [resultados] = await db.query(
      "SELECT * FROM resultados_vocacionales WHERE estudiante_id = ?",
      [estudianteId]
    );

    if (resultados.length === 0) {
      await db.query(
        "INSERT INTO resultados_vocacionales (estudiante_id, resultado) VALUES (?, ?)",
        [estudianteId, 'Ingeniería en Sistemas']
      );
      console.log('✅ Resultado vocacional simulado insertado.');
    } else {
      console.log('ℹ️ El estudiante ya tiene un resultado vocacional.');
    }

  } catch (err) {
    console.error('❌ Error insertando datos simulados:', err.message);
  }
}

module.exports = insertarRespuestasSimuladas;

// Ejecutar desde consola directamente
if (require.main === module) {
  insertarRespuestasSimuladas().then(() => process.exit());
}