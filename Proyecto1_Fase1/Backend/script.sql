USE SOPES1;

-- Tabla para RAM
CREATE TABLE ram_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(5, 3),
    ramUso DECIMAL(5, 3),
    ramSinUso DECIMAL(5, 3),
    porcentaje DECIMAL(5, 3),
    porcetajeSinUso DECIMAL(5, 3),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para CPU
CREATE TABLE cpu_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cpuUso DECIMAL(5, 2),
    cpuSinUso DECIMAL(5, 2),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);