import { pool } from "../db/db.js"

export const hello = (req, res) => {
    res.status(200).send("Hola sopes1")
}

export const getRam = async (req, res) => {
    const url = "http://api-go:3000/ram";
    /* const url = "http://localhost:3000/ram"; */
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("data ram ", data);

        const newData = {
            tipo: "ram",
            total: (data.total/1000),
            libre: data.libre,
            uso: (data.uso/1000),
            sinUso: ((data.total - data.uso)/1000),
            porcentaje: data.porcentaje,
            porcetajeSinUso: (100 - data.porcentaje)
        }

        const result = await pool.query(
            "INSERT INTO ram_metrics(total, ramUso, ramSinUso, porcentaje, porcetajeSinUso, fecha) VALUES (?, ?, ?, ?, ?, CONVERT_TZ(NOW(), '+00:00', '-06:00'));",
            [newData.total, newData.uso, newData.sinUso, newData.porcentaje, newData.porcetajeSinUso]
        );

        res.status(200).send(newData);
    } catch (error) {
        console.log(error);
    }
}