# Fase2 - Manual de Usuario y Documentación Técnica

Este documento describe en detalle la arquitectura, componentes, despliegue y operación del sistema desarrollado para la Fase 2 del curso de Sistemas Operativos 1, implementado sobre Google Cloud Platform (GCP). Incluye instrucciones para usuarios finales y administradores técnicos.

---

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Arquitectura General](#arquitectura-general)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Descripción de Componentes](#descripción-de-componentes)
5. [Despliegue en la Nube (GCP)](#despliegue-en-la-nube-gcp)
6. [Configuración de Servicios](#configuración-de-servicios)
7. [Ejecución y Pruebas](#ejecución-y-pruebas)
8. [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)
9. [Preguntas Frecuentes](#preguntas-frecuentes)
10. [Créditos y Licencia](#créditos-y-licencia)

---

## Introducción

El sistema implementa una solución distribuida para monitoreo, procesamiento y visualización de datos en tiempo real, utilizando microservicios, contenedores Docker, Kubernetes, servicios gestionados y automatización en la nube de GCP.

## Arquitectura General

La arquitectura se compone de:
- Microservicios (Node.js, Python, Go, Sockets) desplegados en Kubernetes (GKE).
- Frontend React desplegado en Cloud Run.
- Base de datos MySQL gestionada en Cloud SQL.
- Pruebas de carga y generación de métricas con Locust en una VM.
- Comunicación segura y escalable entre componentes usando servicios de GCP.

![Diagrama de Arquitectura](docs/arquitectura.png) <!-- Agrega un diagrama si lo tienes -->

## Estructura del Proyecto

- **ApiSocket/**: Microservicio Node.js para comunicación en tiempo real vía sockets.
- **server-node/**: API Node.js para lógica de negocio, conexión y operaciones sobre la base de datos MySQL.
- **server-python/**: API Python para procesamiento avanzado y consultas especializadas.
- **Monitoreo/**: Servicio en Go para monitoreo de concurrencia y métricas del sistema.
- **frontend/**: Aplicación web (React) para visualización, interacción y consumo de datos.
- **k8s/**: Archivos de configuración de Kubernetes (deployments, services, ingress, nodeport).
- **DB/**: Scripts SQL para la creación y migración de la base de datos.
- **Locust/**: Scripts para pruebas de carga, generación de tráfico y métricas (`metrics.json`).
- **Bash/**: Scripts de automatización para build y push de imágenes Docker.

## Descripción de Componentes

### 1. Microservicios
- **ApiSocket**: Permite la comunicación en tiempo real entre clientes y el backend usando WebSockets. Ideal para notificaciones y actualizaciones instantáneas.
- **server-node**: Expone endpoints RESTful para operaciones CRUD y lógica de negocio. Se conecta a Cloud SQL usando variables de entorno para credenciales.
- **server-python**: Procesa datos, realiza análisis y expone endpoints para consultas especializadas. Puede interactuar con MySQL y Redis.
- **Monitoreo**: Servicio en Go que recolecta y expone métricas de concurrencia, salud y uso del sistema.

### 2. Frontend
- **frontend**: Aplicación React que consume las APIs, muestra dashboards, gráficas y permite la interacción del usuario final. Desplegada en Cloud Run para alta disponibilidad y escalabilidad.

### 3. Base de Datos
- **Cloud SQL (MySQL)**: Base de datos relacional gestionada, segura y escalable. Accesible desde GKE, Cloud Run y VM mediante el uso de proxies o IPs privadas.

### 4. Pruebas de Carga
- **Locust**: Herramienta para pruebas de carga y estrés. Se ejecuta en una VM, simula usuarios concurrentes y genera el archivo `metrics.json` con resultados detallados.

### 5. Kubernetes (GKE)
- **Deployments**: Definen cómo se despliegan y actualizan los pods de cada microservicio.
- **Services**: Exponen los pods internamente (ClusterIP), externamente (NodePort) o mediante balanceadores (LoadBalancer).
- **Ingress**: Gestiona el acceso HTTP externo, enruta tráfico a los servicios según reglas de host/path.

## Despliegue en la Nube (GCP)

### 1. Cloud SQL (MySQL)
- Crear una instancia desde la consola de GCP.
- Configurar usuario, contraseña y base de datos.
- Habilitar acceso privado o usar el proxy de Cloud SQL para conexiones seguras.
- Crear reglas de firewall para permitir acceso desde GKE, Cloud Run y VM.

### 2. Kubernetes (GKE)
## ¿Qué es un Deployment?
Un Deployment en Kubernetes administra la creación y actualización de instancias de una aplicación (Pods). Permite escalar, actualizar y mantener la disponibilidad de la app de forma sencilla.

## ¿Qué es un Ingress?
Un Ingress es un recurso que gestiona el acceso externo a los servicios del clúster, permitiendo definir reglas de enrutamiento HTTP/HTTPS basadas en host y path. Es útil para exponer múltiples servicios bajo un mismo punto de entrada.

## ¿Qué es un Service?
Un Service expone los pods para que puedan ser accedidos dentro o fuera del clúster. Puede ser de tipo ClusterIP (interno), NodePort (acceso desde nodos) o LoadBalancer (acceso externo).

## Comandos útiles para aplicar los recursos

```sh
# Crear namespace (si no existe)
kubectl create namespace sopes1

# Aplicar deployment y service de Node.js
kubectl apply -f k8s/deployments/deployment-node.yml

# Aplicar service NodePort para Python
kubectl apply -f k8s/deployments/service-python-nodeport.yml

# Aplicar ingress (requiere tener un ingress controller como nginx)
kubectl apply -f k8s/ingress/ingress.yml

# Ver los servicios y sus puertos
kubectl get svc -n sopes1

# Ver los ingress
kubectl get ingress -n sopes1
- - - - - - - -

- Crear un clúster de GKE en la región/zona deseada.
- Configurar el contexto de kubectl:
  ```sh
  gcloud container clusters get-credentials <CLUSTER_NAME> --zone <ZONE> --project <PROJECT_ID>
  ```
- Crear el namespace y aplicar los manifiestos:
  ```sh
  kubectl create namespace sopes1
  kubectl apply -f k8s/deployments/
  kubectl apply -f k8s/ingress/
  ```
- Instalar y configurar el Ingress Controller (ejemplo: NGINX):
  ```sh
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.1/deploy/static/provider/cloud/deploy.yaml
  ```
- Verificar los servicios y endpoints:
  ```sh
  kubectl get all -n sopes1
  kubectl get ingress -n sopes1
  ```

### 3. Cloud Run (Frontend)
- Construir y subir la imagen Docker del frontend:
  ```sh
  gcloud builds submit --tag gcr.io/<PROJECT_ID>/app-web
  ```
- Desplegar en Cloud Run:
  ```sh
  gcloud run deploy app-web --image gcr.io/<PROJECT_ID>/app-web --platform managed --region <REGION> --allow-unauthenticated
  ```
- Configurar variables de entorno para la URL de las APIs.

### 4. VM para Locust
- Crear una VM en Compute Engine (preferiblemente con Ubuntu).
- Instalar Python y dependencias:
  ```sh
  sudo apt update && sudo apt install python3-pip -y
  pip3 install locust
  ```
- Subir los scripts de Locust y ejecutar:
  ```sh
  locust -f locustfile.py --headless -u 100 -r 10 --host <URL_SERVICIO> --csv=metrics
  ```
- El archivo `metrics.json` se genera y puede ser consumido por otros servicios.

## Configuración de Servicios

### Variables de Entorno
- Definir variables para host, usuario, contraseña y base de datos en los microservicios.
- Usar secretos de Kubernetes o Cloud Run para almacenar credenciales sensibles.

### Conexión a Cloud SQL
- Desde GKE: Usar el proxy de Cloud SQL o IP privada.
- Desde Cloud Run: Configurar la conexión directa o mediante el proxy.
- Desde VM: Instalar el proxy de Cloud SQL si es necesario.

### Seguridad y Redes
- Configurar reglas de firewall para restringir el acceso solo a los servicios necesarios.
- Usar VPC y subredes privadas para comunicación interna.
- Habilitar autenticación y autorización en los endpoints sensibles.

## Ejecución y Pruebas

### 1. Construcción y Push de Imágenes Docker
- Usar el script `Bash/init.sh` para construir y subir todas las imágenes a Docker Hub o Container Registry.

### 2. Despliegue de Microservicios
- Aplicar los manifiestos de Kubernetes para desplegar los servicios y exponerlos mediante Ingress.

### 3. Despliegue del Frontend
- Subir y desplegar la imagen en Cloud Run.
- Configurar la URL pública para los usuarios finales.

### 4. Pruebas de Carga
- Ejecutar Locust en la VM para simular usuarios concurrentes y medir el rendimiento.
- Analizar el archivo `metrics.json` para identificar cuellos de botella.

## Monitoreo y Mantenimiento

- Usar Google Cloud Monitoring y Logging para visualizar logs y métricas.
- Configurar alertas para errores, caídas o uso excesivo de recursos.
- Realizar backups periódicos de la base de datos en Cloud SQL.
- Actualizar imágenes y manifiestos según sea necesario.

## Preguntas Frecuentes

**¿Cómo accedo a la app-web?**
- Desde la URL pública proporcionada por Cloud Run tras el despliegue.

**¿Cómo escalo los servicios?**
- Modifica el campo `replicas` en los deployments de Kubernetes y aplica los cambios.

**¿Cómo restauro la base de datos?**
- Usa los scripts en la carpeta `DB/` y las herramientas de Cloud SQL.

**¿Cómo actualizo una imagen?**
- Reconstruye la imagen, haz push y actualiza el deployment correspondiente en Kubernetes.

## Créditos y Licencia

- Autor: Susan Monzon
- Curso: Sistemas Operativos 1, USAC, Junio 2025
- Licencia: MIT

---

Este manual cubre tanto la perspectiva de usuario final como la de administración técnica, asegurando una operación eficiente y segura en la nube de GCP.
