import React, { useRef, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Función para corregir la codificación de caracteres desde el frontend.
function decodeUtf8FromLatin1(str) {
  if (!str) return '';
  // Convierte el string (interpretado como latin1) a bytes y luego lo decodifica como UTF-8.
  const bytes = new Uint8Array([...str].map(c => c.charCodeAt(0)));
  return new TextDecoder('utf-8').decode(bytes);
}

function Resultados({ resultado, nombreEstudiante, onVolver }) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const resultsRef = useRef(null); // Ref para el contenido a exportar

  const handleDownloadPDF = async () => {
    if (!resultsRef.current) return;

    setIsGeneratingPdf(true);
    setPdfError('');

    try {
      const canvas = await html2canvas(resultsRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`resultado-orientacion-${(nombreEstudiante || 'estudiante').replace(/\s/g, '_')}.pdf`);

    } catch (error) {
      console.error("Error al generar el PDF:", error);
      setPdfError('No se pudo generar el PDF. Inténtalo de nuevo.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, my: 4 }}>
      {/* Este es el contenedor que se convertirá en PDF */}
      <Card ref={resultsRef} sx={{ width: '100%', maxWidth: '800px', p: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Resultado de Orientación Vocacional
          </Typography>
          <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
            Para: {nombreEstudiante || 'Estudiante'}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {decodeUtf8FromLatin1(resultado)}
          </Typography>
        </CardContent>
      </Card>

      {/* Botón de descarga y mensaje de error */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDownloadPDF}
          disabled={isGeneratingPdf}
          startIcon={isGeneratingPdf ? <CircularProgress size={24} color="inherit" /> : <PictureAsPdf />}
        >
          {isGeneratingPdf ? 'Generando PDF...' : 'Descargar como PDF'}
        </Button>

        <Button
          variant="outlined"
          onClick={onVolver}
          disabled={isGeneratingPdf}
        >
          Volver al inicio
        </Button>
        {pdfError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {pdfError}
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default Resultados;