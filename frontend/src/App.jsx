import { useState } from 'react'
import axios from 'axios'
import EstudianteForm from './components/EstudianteForm'
import PreguntaForm from './components/PreguntaForm'
import ResultadoView from './components/ResultadoView'

function App() {
  const [resultado, setResultado] = useState(null)
  const [estudianteId, setEstudianteId] = useState(null)

  const reiniciar = () => {
    setResultado(null)
    setEstudianteId(null)
  }

  const eliminarEstudiantes = async () => {
    const confirmar = confirm("¿Estás seguro de eliminar TODOS los estudiantes?");
    if (!confirmar) return;
    try {
      const res = await axios.delete('/api/estudiantes');
      alert(res.data.mensaje);
      reiniciar(); // Opcional: reiniciar estado del frontend
    } catch (err) {
      console.error("Error al eliminar estudiantes", err);
      alert("❌ Ocurrió un error eliminando estudiantes");
    }
  };

  return (
    <div className="App" style={{ position: 'relative', padding: '2rem' }}>
      <h1>OrientAI - Evaluación Vocacional</h1>

      {/* Botón eliminar en esquina superior derecha */}
      <button
        onClick={eliminarEstudiantes}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        🗑 Eliminar Estudiantes
      </button>

      {resultado ? (
        <ResultadoView resultado={resultado} onVolver={reiniciar} />
      ) : estudianteId ? (
        <PreguntaForm estudianteId={estudianteId} onResultado={setResultado} />
      ) : (
        <EstudianteForm onRegistro={setEstudianteId} />
      )}
    </div>
  )
}

export default App