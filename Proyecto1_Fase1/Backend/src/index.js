import express from "express";
import {routeRAM} from "./ram/ram.route.js"
import {route} from "./cpu/cpu.route.js"
import cors from 'cors';

const PORT = 5002
const server = express();

server.use(cors());
server.use(express.json())
server.use("/api", routeRAM)
server.use("/api", route)

server.listen(PORT, () => {
    console.log("Servidor levantado en el puerto: ", PORT)
})