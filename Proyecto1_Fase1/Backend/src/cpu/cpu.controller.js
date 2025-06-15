import { pool } from "../db/db.js"

export const getCpu = async (req, res) => {
    const url = "http://api-go:3000/cpu";
    /* const url = "http://localhost:3000/cpu"; */
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const newData = {
            tipo: "cpu",
            porcentaje: (data.porcentaje),
            porcetajeSinUso: (100 - data.porcentaje),
        }

        const result = await pool.query(
            "INSERT INTO cpu_metrics(cpuUso, cpuSinUso, fecha) VALUES (?, ?, CONVERT_TZ(NOW(), '+00:00', '-06:00'));",
            [newData.porcentaje, newData.porcetajeSinUso]
        );

        res.status(200).send(newData);
    } catch (error) {
        console.log(error);
    }
}