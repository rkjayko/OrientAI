function construirPrompt(respuestas) {
  const lista = respuestas
    .map(r => `- ${r.pregunta} → ${r.respuesta}`)
    .join('\n');

  return `
Eres un orientador vocacional experto.

Con base en las siguientes respuestas del estudiante, sugiere una carrera profesional adecuada y una justificación breve.

Sigue exactamente este formato:

Carrera sugerida: Ingeniería de Sistemas  
Justificación: El estudiante mostró interés por resolver problemas lógicos y programar, lo que sugiere afinidad con el desarrollo de software.

Ahora genera el resultado para este caso:

${lista}
`.trim();
}

module.exports = construirPrompt; // <- ✅ Esto debe estar al final