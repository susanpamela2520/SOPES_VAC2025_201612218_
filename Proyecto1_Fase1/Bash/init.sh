#!/bin/bash

# Install modules
cd ~/Documentos/SOPES1/Proyecto1_Fase1/SOPES_VAC2025_201612218_/Proyecto1_Fase1/Modulos/Ram
make
sudo insmod memoria.ko

cd ~/Documentos/SOPES1/Proyecto1_Fase1/SOPES_VAC2025_201612218_/Proyecto1_Fase1/Modulos/Cpu
make
sudo insmod cpu.ko

spinner='|/-\'
delay=1

echo -n "Cargando "
for((i=0;i<10;i++)); do
    echo -n "${spinner:i%4:1}"
    sleep $delay
    echo -n $'\b'
done

echo "! Modulos cargados exitosamente !"

# Infraestructura
cd ~/Documentos/SOPES1/Proyecto1_Fase1/SOPES_VAC2025_201612218_/Proyecto1_Fase1
sudo docker compose up -d

echo "! Infraestructura levantada correctamente !"

# Create container stress
sudo docker run polinux/stress stress --cpu 3 --io 3 --vm 2 --vm-bytes 1024M --timeout 60s
echo -n "Estresando CPU y RAM  "
for((i=0;i<60;i++)); do
    echo -n "${spinner:i%4:1}"
    sleep $delay
    echo -n $'\b'
done