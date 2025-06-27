CREATE DATABASES sopes1;

USE sopes1;

CREATE TABLE metricas (
  id INT PRIMARY KEY,
  total INT,
  libre BIGINT,
  uso INT,
  porcentaje INT,
  porcentaje_cpu INT,
  total_processes INT,
  running_processes INT,
  sleeping_processes INT,
  zombie_processes INT,
  stopped_processes INT,
  cpu_cores INT,
  timestamp DATETIME,
  api VARCHAR(100)
);
