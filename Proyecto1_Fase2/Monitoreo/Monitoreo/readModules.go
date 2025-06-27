package main

import (
	"encoding/json"
	"fmt"
	"os"
)

func readRam(path string, chRam chan Ram) {
	data, err := os.ReadFile(path)
	if err != nil {
		fmt.Println("Error leyendo el archivo", err)
		return
	}

	var metrics Ram
	err = json.Unmarshal(data, &metrics)
	if err != nil {
		fmt.Println("Error en decodificacion json", err)
		return
	}

	chRam <- metrics
}

func readCpu(path string, chCpu chan Cpu) {
	data, err := os.ReadFile(path)
	if err != nil {
		fmt.Println("Error leyendo el archivo", err)
		return
	}

	var metrics Cpu
	err = json.Unmarshal(data, &metrics)
	if err != nil {
		fmt.Println("Error en decodificacion json", err)
		return
	}

	chCpu <- metrics
}

func readProcess(path string, chProcess chan Process) {
	data, err := os.ReadFile(path)
	if err != nil {
		fmt.Println("Error leyendo el archivo", err)
		return
	}

	var metrics Process
	err = json.Unmarshal(data, &metrics)
	if err != nil {
		fmt.Println("Error en decodificacion json", err)
		return
	}

	chProcess <- metrics
}