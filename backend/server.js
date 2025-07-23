const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const initDatabase = require('./init');
initDatabase();

app.use(cors());
app.use(express.json());

// Rutas bien montadas
const preguntasRoutes = require('./routes/preguntas');
const estudiantesRoutes = require('./routes/estudiantes');
const respuestasRoutes = require('./routes/respuestas');
const resultadosRoutes = require('./routes/resultados');

app.use('/api/preguntas', preguntasRoutes);        // ✅
app.use('/api/estudiantes', estudiantesRoutes);    // ✅
app.use('/api/respuestas', respuestasRoutes);      // ✅
app.use('/api/resultados', resultadosRoutes);      // ✅

app.get('/api/health', (req, res) => {
  res.send('Backend working!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Servidor corriendo en puerto ${PORT}`)
);