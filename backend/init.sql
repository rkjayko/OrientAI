-- Este script se ejecutará automáticamente la primera vez que el contenedor de MySQL se inicie.

-- Crear la tabla de estudiantes
CREATE TABLE IF NOT EXISTS estudiantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE
);

-- Crear la tabla de preguntas
CREATE TABLE IF NOT EXISTS preguntas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  texto TEXT NOT NULL,
  categoria VARCHAR(50)
);

-- Crear la tabla de respuestas
CREATE TABLE IF NOT EXISTS respuestas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  estudiante_id INT NOT NULL,
  pregunta_id INT NOT NULL,
  respuesta VARCHAR(10) NOT NULL,
  fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE,
  FOREIGN KEY (pregunta_id) REFERENCES preguntas(id) ON DELETE CASCADE
);

-- Crear la tabla de resultados
CREATE TABLE IF NOT EXISTS resultados_vocacionales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  estudiante_id INT NOT NULL,
  resultado TEXT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id)
);

-- Insertar preguntas base. Usamos INSERT IGNORE para evitar errores si se ejecuta más de una vez.
INSERT IGNORE INTO `preguntas` (`id`, `texto`, `categoria`) VALUES
(1, 'Disfrutas trabajando con números y datos', 'Realista'),
(1, '¿Disfrutas trabajando con números y datos?', 'Realista'),
(2, '¿Te gusta construir o reparar cosas con tus manos?', 'Realista'),
(3, '¿Prefieres actividades al aire libre?', 'Realista'),
(4, '¿Te consideras una persona curiosa y analítica?', 'Investigador'),
(5, '¿Disfrutas resolviendo problemas complejos y abstractos?', 'Investigador'),
(6, '¿Te gusta leer sobre temas científicos o técnicos?', 'Investigador'),
(7, '¿Tienes una gran imaginación?', 'Artístico'),
(8, '¿Te gusta expresarte a través del arte, la música o la escritura?', 'Artístico'),
(9, '¿Prefieres trabajos que no tengan una rutina estricta?', 'Artístico'),
(10, '¿Disfrutas ayudando o enseñando a otros?', 'Social'),
(11, '¿Eres bueno escuchando y entendiendo los problemas de los demás?', 'Social'),
(12, '¿Te gusta trabajar en equipo?', 'Social');
