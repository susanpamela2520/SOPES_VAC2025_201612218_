# Monitor-Linux

## Descripción

Monitor-Linux es una plataforma de monitoreo de recursos del sistema (CPU y RAM) desarrollada con una arquitectura de microservicios. Incluye módulos en C para la obtención de métricas, un backend en Node.js, un servicio en Go, una base de datos MySQL y una interfaz web en React.

## Estructura del Proyecto

```
Monitor-Linux/
├── Backend/           # API REST en Node.js
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── script.sql
├── Frontend/
│   └── Web/           # Aplicación web en React
│       ├── src/
│       ├── Dockerfile
│       └── ...
├── Modulos/
│   ├── Cpu/           # Módulo kernel para CPU (C)
│   └── Ram/           # Módulo kernel para RAM (C)
├── Monitoreo/         # Servicio en Go
│   ├── main.go
│   ├── Dockerfile
│   └── ...
├── Bash/              # Scripts de inicialización
├── docker-compose.yml # Orquestación de servicios
```

## Componentes

- **Backend (Node.js):** Expone una API REST para consultar y almacenar métricas.
- **Frontend (React):** Interfaz web para visualizar el monitoreo en tiempo real.
- **Monitoreo (Go):** Servicio que interactúa con los módulos del kernel y envía datos al backend.
- **Módulos (C):** Módulos de kernel para obtener información de CPU y RAM.
- **Base de datos (MySQL):** Almacena las métricas recolectadas.

## Requisitos

- Docker y Docker Compose
- (Opcional) Node.js, Go, y herramientas de desarrollo para pruebas locales

## Instalación y Ejecución

1. Clona el repositorio y navega a la carpeta raíz.
2. Ejecuta:

```bash
docker-compose up --build
```

Esto levantará todos los servicios: backend, frontend, monitoreo en Go y la base de datos MySQL.

- La app web estará disponible en: http://localhost:5173
- El backend Node.js en: http://localhost:5002
- El servicio Go en: http://localhost:3000
- MySQL en el puerto 3306

## Uso de los Módulos en C

Los módulos de kernel para CPU y RAM se encuentran en `Modulos/Cpu/` y `Modulos/Ram/`. Para cargarlos manualmente:

```bash
cd Modulos/Cpu && sudo insmod cpu.ko
cd Modulos/Ram && sudo insmod memoria.ko
```

Para eliminarlos:

```bash
sudo rmmod cpu
sudo rmmod memoria
```

## Scripts Bash

En la carpeta `Bash/` hay scripts útiles para inicialización y limpieza:
- `init.sh`: Inicializa el entorno.
- `delete.sh`: Limpia recursos y módulos cargados.

## Documentación Técnica

### Backend (Node.js)
- Ubicación: `Backend/`
- Entrypoint: `src/index.js`
- Rutas principales:
  - `/cpu` y `/ram`: Obtención de métricas
- Conexión a MySQL definida en `src/db/db.js`

### Frontend (React)
- Ubicación: `Frontend/Web/`
- Entrypoint: `src/main.jsx`
- Componentes principales: `Barra.jsx`, `Inicio.jsx`, `Pastel.jsx`

### Servicio Go
- Ubicación: `Monitoreo/`
- Entrypoint: `main.go`
- Lee datos de los módulos y los expone vía HTTP

### Base de Datos
- Script de inicialización: `Backend/script.sql`
- Persistencia: volumen en `/home/<user>/Escritorio/datos`

## Personalización

- Puedes modificar los puertos en `docker-compose.yml`.
- Para cambiar credenciales de MySQL, edita la sección `environment` en el mismo archivo.

## Contribución

1. Haz un fork del repositorio

## Licencia

Este proyecto es de uso académico y libre.
