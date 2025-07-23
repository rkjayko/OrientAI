const db = require('../db');

const preguntas = [
  ["¿Disfrutas resolver problemas matemáticos o lógicos?", "Ingeniería, Matemáticas, Ciencias"],
  ["¿Te interesa cómo funciona el cuerpo humano?", "Medicina, Enfermería, Fisioterapia"],
  ["¿Te gustaría trabajar ayudando a otras personas en momentos difíciles?", "Psicología, Trabajo Social"],
  ["¿Te sientes cómodo hablando en público o liderando grupos?", "Derecho, Educación, Administración"],
  ["¿Te llama la atención crear dibujos, diseños o piezas artísticas?", "Diseño Gráfico, Artes Visuales"],
  ["¿Te interesa cómo se construyen los edificios o infraestructuras?", "Arquitectura, Ingeniería Civil"],
  ["¿Te gustaría programar o crear aplicaciones tecnológicas?", "Ingeniería de Software, Desarrollo Web"],
  ["¿Te interesan los animales y su cuidado?", "Veterinaria, Biología"],
  ["¿Te gusta leer sobre historia, política o filosofía?", "Ciencias Sociales, Derecho, Historia"],
  ["¿Te sientes motivado al enseñar o explicar temas a otros?", "Educación, Pedagogía"]
];

async function insertarPreguntasBase() {
  try {
    await db.query('DELETE FROM preguntas');

    for (const [texto, categoria] of preguntas) {
      await db.query(
        'INSERT INTO preguntas (texto, categoria) VALUES (?, ?)',
        [texto, categoria]
      );
    }

    console.log('✅ Nuevas 10 preguntas insertadas correctamente.');
  } catch (error) {
    console.error('❌ Error al insertar preguntas:', error.message);
  }
}

module.exports = insertarPreguntasBase;

if (require.main === module) {
  insertarPreguntasBase().then(() => process.exit());
}