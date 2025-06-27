#!/bin/bash

# Eliminacion de modulos
cd /proc
sudo rmmod memoria

cd /proc
sudo rmmod cpu

# eliminar infraestuctura
cd ~/Documentos/SOPES1/Proyecto1_Fase1/SOPES_VAC2025_201612218_/Proyecto1_Fase1
sudo docker compose down