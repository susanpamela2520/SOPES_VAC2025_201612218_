FROM node:24-alpine3.22

WORKDIR /app/web

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"] 