import mysql from 'mysql'

const db = mysql.createConnection({
    host: "34.42.182.227",
    port: 3306,
    user: "root",
    password: "Hola.123",
    database: "sopes1"
});

db.connect(err => {
    if (err) console.log(err);
});

export const insert = (req, res) => {
    const {
    id,
    total,
    libre,
    uso,
    porcentaje,
    porcentaje_cpu,
    total_processes,
    running_processes,
    sleeping_processes,
    zombie_processes,
    stopped_processes,
    cpu_cores,
    timestamp,
  } = req.body;
  const api = "NodeJS"

  const sql = `
    INSERT INTO metricas (
      id, total, libre, uso, porcentaje, porcentaje_cpu,
      total_processes, running_processes, sleeping_processes,
      zombie_processes, stopped_processes, cpu_cores, timestamp, api
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    id, total, libre, uso, porcentaje, porcentaje_cpu,
    total_processes, running_processes, sleeping_processes,
    zombie_processes, stopped_processes, cpu_cores, timestamp, api
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar métrica:', err);
      return res.status(500).json({ error: 'Error al insertar los datos' });
    }

    res.status(201).json({ mensaje: 'Métrica insertada correctamente' });
  });
}

export const hello = (req, res) => {
    res.status(201).json({ mensaje: 'Métrica insertada correctamente' });
}