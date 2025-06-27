import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "34.42.182.227",
  user: "root",
  password: "Hola.123",
  database: "sopes1",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
