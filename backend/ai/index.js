require('dotenv').config();

let aiProvider;

switch (process.env.AI_PROVIDER) {
  case 'openai':
    aiProvider = require('./providerOpenAI');
    break;
  case 'ollama':
    aiProvider = require('./providerOllama');
    break;
  default:
    throw new Error('AI provider not supported');
}

module.exports = aiProvider;