function construirPrompt(respuestas) {
  const lista = respuestas
    .map(r => `- ${r.pregunta} → ${r.respuesta}`)
    .join('\n');

  return `
Actúas como un orientador vocacional experto.

Tu tarea es analizar las respuestas de un estudiante para recomendarle una carrera profesional que se ajuste a su perfil.

Debes entregar:
1. Una **carrera sugerida principal**.
2. **Otras carreras relacionadas** que podría considerar.
3. Una **justificación detallada** basada en sus respuestas.
4. Las **3 mejores universidades en Colombia** para estudiar esa carrera.
5. Algunos **posibles empleos o roles** a los que podría aspirar.

Responde en el siguiente formato:

Carrera sugerida: [Nombre de la carrera principal]

Otras opciones relacionadas:
- [Carrera 1]
- [Carrera 2]

Justificación:
[Texto explicando por qué esa carrera encaja con el perfil del estudiante.]

Mejores universidades en Colombia:
1. [Universidad 1]
2. [Universidad 2]
3. [Universidad 3]

Posibles empleos:
- [Empleo 1]
- [Empleo 2]
- [Empleo 3]
`.trim();
}

module.exports = construirPrompt;
