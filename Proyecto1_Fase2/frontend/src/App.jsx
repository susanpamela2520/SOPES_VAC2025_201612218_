import { useState, useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut, Bar } from "react-chartjs-2";
import { io } from "socket.io-client";
import "./App.css";

export const App = () => {
  const [RAM, setRAM] = useState([]);
  const [CPU, setCPU] = useState([]);
  const [processes, setProcesses] = useState([]);
  const socket = io("https://node-socket.duckdns.org");

  socket.on("connection", (msg) => {
    console.log("Servidor:", msg);
  });

  useEffect(() => {
    const actualizar = (data) => {
      console.log(data);
      /* setRAM([[100 - data.ram.porcentaje, data.ram.porcentaje], data.ram.total, data.ram.libre, data.ram.uso]);
        setCPU([100 - data.cpu.porcentaje, data.cpu.porcentaje]);
        setProcesses([data.procesos.total, data.procesos.corriendo, data.procesos.durmiendo, data.procesos.zombie, data.procesos.parado]); */
    };
    socket.on("datos_actualizados", actualizar);

    return () => {
      socket.off("datos_actualizados", actualizar); // limpia al desmontar
    };
  }, []);

  return (
    <div className="app">
      <div className="chartContainer">
        <div className="dataCard">
          <h1>RAM Usage</h1>
          <Doughnut
            data={{
              labels: ["Free", "Usage"],
              datasets: [
                {
                  data: RAM[0],
                  backgroundColor: ["rgb(0, 250, 154)", "rgb(255, 99, 132)"],
                  hoverOffset: 4,
                },
              ],
            }}
          />
          <div className="extraInfo">
            <p>
              <strong>Total: </strong>
              {RAM[1]} MB
            </p>
            <p>
              <strong>Free: </strong>
              {RAM[2]} MB
            </p>
            <p>
              <strong>Usage: </strong> {RAM[3]} MB
            </p>
          </div>
        </div>

        <div className="dataCard">
          <h1>CPU Usage</h1>
          <Doughnut
            data={{
              labels: ["Free", "Usage"],
              datasets: [
                {
                  data: CPU,
                  backgroundColor: ["rgb(0, 250, 154)", "rgb(255, 99, 132)"],
                  hoverOffset: 4,
                },
              ],
            }}
          />
        </div>
        <div className="dataCard2">
          <h1>Processes</h1>
          <Bar
            data={{
              labels: ["Total", "Corriendo", "Durmiendo", "Zombie", "Parado"],
              datasets: [
                {
                  label: "Contador de procesos",
                  data: processes,
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                    "rgba(255, 255, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
            options={{
              indexAxis: "y",
            }}
          />
        </div>
      </div>
    </div>
  );
};

