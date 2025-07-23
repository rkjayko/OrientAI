const axios = require('axios');

async function getIAResponse(prompt) {
  try {
    const response = await axios.post('http://ollama-service.default.svc.cluster.local:11434/api/generate', {
      model: 'tinyllama',
      prompt: prompt,
      stream: false
    });

    return response.data.response;
  } catch (err) {
    console.error('Error usando Ollama:', err.message);
    throw err;
  }
}

module.exports = { getIAResponse };
