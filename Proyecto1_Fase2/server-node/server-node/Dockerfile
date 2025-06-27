FROM node:20

WORKDIR /api

COPY package*.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"] 