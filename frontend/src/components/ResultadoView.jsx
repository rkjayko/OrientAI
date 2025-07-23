function ResultadoView({ resultado, onVolver }) {
  return (
    <div>
      <h2>Resultado vocacional</h2>
      <p>{resultado.respuesta}</p>
      <button onClick={onVolver} style={{ marginTop: '1rem' }}>
        Volver al inicio
      </button>
    </div>
  )
}

export default ResultadoView;