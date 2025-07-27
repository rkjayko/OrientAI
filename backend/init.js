const db = require('./db');

// Esperar a que MySQL esté disponible antes de ejecutar queries
async function esperarMySQL() {
  const RETRY_INTERVAL = 500;
  const MAX_RETRIES = 3;

  for (let intento = 1; intento <= MAX_RETRIES; intento++) {
    try {
      await db.query('SELECT 1');
      console.log('✅ MySQL está disponible');
      return;
    } catch (err) {
      console.log(`⏳ Esperando MySQL... (intento ${intento}). Error: ${err.code}`);
      await new Promise((res) => setTimeout(res, RETRY_INTERVAL));
    }
  }

  throw new Error('❌ No se pudo conectar a MySQL después de varios intentos.');
}

// Función principal de inicialización
async function initDatabase() {
  try {
    await esperarMySQL();

  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error.message);
    throw error;
  }
}

module.exports = initDatabase;