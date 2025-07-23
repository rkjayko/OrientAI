# OrientAi
🚀 PASO A PASO PARA SUBIR TODO EL PROYECTO ORIENTAI DESDE CERO
✅ 1. Iniciar Minikube desde cero con más memoria

minikube stop
minikube delete
minikube start --memory=6144 --driver=docker

✅ 2. Configurar Docker para trabajar dentro de Minikube

& minikube -p minikube docker-env | Invoke-Expression

✅ 3. Instalar dependencias del backend

cd backend
npm install
npm install cors

✅ 4. Verifica que server.js tenga cors habilitado
Asegúrate de que el archivo backend/server.js contenga:

const cors = require('cors');
app.use(cors());

✅ 5. Volver a construir la imagen del backend
Estando en el directorio raíz del proyecto (/OrientAI):

docker build -t orientai-backend ./backend

✅ 6. Aplicar los archivos de Kubernetes (YAMLs)

kubectl apply -f mysql-secret.yaml
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-service.yaml

kubectl apply -f backend/backend-deployment.yaml
kubectl apply -f backend/backend-service.yaml

kubectl apply -f ollama-deployment.yaml
kubectl apply -f ollama-service.yaml

✅ 7. Verifica que los pods estén ejecutándose

kubectl get pods
Todos deben estar en estado Running. Si alguno falla, revisa con:

kubectl logs deployment/backend
✅ 8. Redirige el puerto del backend al host local
Esto te permitirá comunicar el frontend con el backend:

kubectl port-forward service/backend-service 55683:3000

🧪 FRONTEND - MODO DESARROLLO
✅ 9. Instalar dependencias del frontend

cd ../frontend
npm install

✅ 10. Editar la URL en api.js

// frontend/src/api.js
export const enviarPregunta = (pregunta) => {
  return axios.post('http://127.0.0.1:55683/api/orientacion', { pregunta });
};

✅ 11. Ejecutar el frontend

npm run dev
Abre el navegador en:

http://localhost:5173

✅ 12. Verifica el flujo completo
Ingresa una pregunta como: "¿Qué carrera me recomiendas si me gusta la biología?"

El backend debe responder correctamente usando el modelo IA desde Ollama.


