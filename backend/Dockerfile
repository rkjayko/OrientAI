FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Ejecutar init.js antes de iniciar el backend
CMD ["sh", "-c", "node init.js && node server.js"]