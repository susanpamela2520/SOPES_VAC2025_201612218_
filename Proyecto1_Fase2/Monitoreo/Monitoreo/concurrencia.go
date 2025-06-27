package main

import "fmt"

func getRam() Ram {
	chRam := make(chan Ram)
	go readRam("/proc/ram_201612218", chRam)

	valueRam := <-chRam
	fmt.Println(valueRam)
	return valueRam
}

func getCpu() Cpu {
	chCpu := make(chan Cpu)
	go readCpu("/proc/cpu_201612218", chCpu)

	valueCpu := <-chCpu
	fmt.Println(valueCpu)
	return valueCpu
}

func getProcess() Process {
	chProcess := make(chan Process)
	go readProcess("/proc/procesos_201612218", chProcess)

	valueProcess := <-chProcess
	fmt.Println(valueProcess)
	return valueProcess
}