import express from "express";
import {getCpu} from "./cpu.controller.js";

export const route = express.Router();

route.get("/cpu", getCpu);