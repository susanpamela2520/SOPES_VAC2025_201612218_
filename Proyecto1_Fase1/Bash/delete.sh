#!/bin/bash

# Eliminacion de modulos
cd /proc
sudo rmmod memoria

cd /proc
sudo rmmod cpu

# eliminar infraestuctura
cd ~/Documentos/Monitor-Linux
sudo docker compose down