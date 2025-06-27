package main

type Ram struct {
	Total      int `json:"total"`
	Libre      int `json:"libre"`
	Uso        int `json:"uso"`
	Porcentaje int `json:"porcentaje"`
}

type Cpu struct {
	Porcentaje int `json:"porcentaje"`
}

type Process struct {
	Total_processes      int `json:"total_processes"`
	Running_processes    int `json:"running_processes"`
	Sleeping_processes   int `json:"sleeping_processes"`
	Zombie_processes     int `json:"zombie_processes"`
	Stopped_processes    int `json:"stopped_processes"`
	Cpu_cores            int `json:"cpu_cores"`
}