<img width="839" height="389" alt="image" src="https://github.com/user-attachments/assets/4c2e36d1-f34a-483c-ba19-00fa9adb86bb" />


# OrientAi
🚀 PASO A PASO PARA SUBIR TODO EL PROYECTO ORIENTAI DESDE CERO
✅ 1. Docker desktop habilitado con kubernetes

✅ 2. Instalar dependencias del backend

cd backend

npm install

✅ 3. Volver a construir la imagen del backend. Estando en el directorio raíz del proyecto (/OrientAI):

docker build -t orientai-backend ./backend

✅ 4. Aplicar los archivos de Kubernetes (YAMLs)

kubectl apply -f mysql-init-configmap.yaml

kubectl apply -f mysql-deployment.yaml

kubectl apply -f mysql-secret.yaml 

kubectl apply -f mysql-service.yaml

kubectl apply -f ollama-deployment.yaml

kubectl apply -f ollama-service.yaml

kubectl apply -f backend-deployment.yaml

kubectl apply -f backend-service.yaml


✅ 5. Verifica que los pods estén ejecutándose

kubectl get pods

kubectl logs deployment/backend

✅ 8. Redirige el puerto del backend al host local(Esto te permitirá comunicar el frontend con el backend)

kubectl port-forward service/backend-service 3000:3000

✅ 9. Instalar dependencias del frontend

cd frontend

npm install

✅ 10. Ejecutar el frontend

npm run dev

Abre el navegador en:

http://localhost:5173

✅ 12. Verifica el flujo completo

Ingresa una pregunta como: "¿Qué carrera me recomiendas si me gusta la biología?"

El backend debe responder correctamente usando el modelo IA desde Ollama.


