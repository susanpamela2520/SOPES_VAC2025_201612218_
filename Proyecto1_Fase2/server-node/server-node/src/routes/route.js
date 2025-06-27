import express from "express";
import { insert, hello } from '../controllers/mysql.js'

const route = express.Router();

route.post("/insert", insert)
route.post("/hello", hello)

export default route;