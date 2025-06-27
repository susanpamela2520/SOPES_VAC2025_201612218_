FROM node:20-alpine

WORKDIR /app/web

# Copia solo lo necesario primero
COPY package*.json ./

# ✅ Instala también devDependencies como vite
RUN npm install --include=dev

# Luego el resto del código
COPY . .

# Ejecuta el build
RUN npm run build

EXPOSE 5173

# Usa el modo dev para desarrollo, o sirve los archivos estáticos con nginx en producción
CMD ["npm", "run", "dev"]
