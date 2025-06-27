import express from 'express';
import http from 'http'
import cors from 'cors';

import route from './routes/route.js'

const PORT = 4000;
const app = express();
const server = http.createServer(app);

/* Middleware */
app.use(cors());
app.use(express.json())
app.use('/', route)


server.listen(PORT, () => {
    console.log('Servidor levantado en el puerto ', PORT);
});