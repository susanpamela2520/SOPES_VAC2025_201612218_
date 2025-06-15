import express from "express";
import {getRam, hello} from "./ram.controller.js";

export const routeRAM = express.Router();

routeRAM.get("/hello", hello);
routeRAM.get("/ram", getRam);