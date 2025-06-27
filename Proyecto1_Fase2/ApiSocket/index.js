import express from 'express';
import { createServer } from 'node:http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import cors from 'cors';
import { getDatafromDB } from './src/getDatadb.js'; 

dotenv.config();

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', (socket) => {
  const intervalo = setInterval(async () => {
    const datos = await getDatafromDB();
    console.log('Datos enviados al cliente:', datos);
    socket.emit('datos_actualizados', datos);
  }, 1000);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
    clearInterval(intervalo);
  });
});

server.listen(3000, () => {
  console.log('server running at port 3000');
});