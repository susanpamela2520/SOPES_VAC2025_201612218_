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
