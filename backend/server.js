const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const initDatabase = require('./init');

async function startServer() {
  try {
    // 1. Esperar a que la base de datos se inicialice correctamente.
    await initDatabase();

    // 2. Configurar middlewares de Express.
    app.use(cors());
    app.use(express.json());

    // 3. Montar las rutas de la API.
    const preguntasRoutes = require('./routes/preguntas');
    const estudiantesRoutes = require('./routes/estudiantes');
    const respuestasRoutes = require('./routes/respuestas');
    const resultadosRoutes = require('./routes/resultados');

    app.use('/api/preguntas', preguntasRoutes);
    app.use('/api/estudiantes', estudiantesRoutes);
    app.use('/api/respuestas', respuestasRoutes);
    app.use('/api/resultados', resultadosRoutes);

    app.get('/api/health', (req, res) => {
      res.send('Backend working!');
    });

    // 4. Iniciar el servidor solo después de una conexión exitosa a la BD.
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', () =>
      console.log(`✅ Servidor corriendo en puerto ${PORT}`)
    );
  } catch (error) {
    console.error('❌ Falló el inicio del servidor:', error.message);
    process.exit(1); // Termina el proceso si la BD no está disponible.
  }
}

startServer();