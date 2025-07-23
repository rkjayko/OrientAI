const db = require('./db');
const insertarPreguntasBase = require('./scripts/insertPreguntas');
const insertarRespuestasSimuladas = require('./scripts/insertRespuestasSimuladas');

// Esperar a que MySQL esté disponible antes de ejecutar queries
async function esperarMySQL() {
  const RETRY_INTERVAL = 2000; // ms
  const MAX_RETRIES = 15;

  for (let intento = 1; intento <= MAX_RETRIES; intento++) {
    try {
      await db.query('SELECT 1');
      console.log('✅ MySQL está disponible');
      return;
    } catch (err) {
      console.log(`⏳ Esperando MySQL... (intento ${intento})`);
      await new Promise((res) => setTimeout(res, RETRY_INTERVAL));
    }
  }

  throw new Error('❌ No se pudo conectar a MySQL después de varios intentos.');
}

// Crear tablas e insertar datos
async function initDatabase() {
  try {
    await esperarMySQL();

    await db.query(`
      CREATE TABLE IF NOT EXISTS estudiantes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        correo VARCHAR(100) NOT NULL UNIQUE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS preguntas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        texto TEXT NOT NULL,
        categoria VARCHAR(50)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS respuestas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        estudiante_id INT NOT NULL,
        pregunta_id INT NOT NULL,
        respuesta VARCHAR(10) NOT NULL,
        fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE,
        FOREIGN KEY (pregunta_id) REFERENCES preguntas(id) ON DELETE CASCADE
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS resultados_vocacionales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        estudiante_id INT NOT NULL,
        resultado TEXT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id)
      );
    `);

    console.log('✅ Tablas creadas (si no existían).');

    await insertarPreguntasBase();
    await insertarRespuestasSimuladas();

    console.log('✅ Datos insertados correctamente.');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error.message);
  }
}

module.exports = initDatabase;