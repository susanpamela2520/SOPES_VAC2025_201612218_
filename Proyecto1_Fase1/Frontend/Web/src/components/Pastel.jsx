import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import ReactApexChart from "react-apexcharts";

function Pastel({ urlApi, nombre }) {
  const [series, setSeries] = useState([]);
  const [ram, setRam] = useState(null);

  const [options] = useState({ 
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Porcentaje de uso", "Porcentaje sin uso"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  async function asignarRam(){
    try {
      const datosObtenidos = await fetch(urlApi);
      const data = await datosObtenidos.json();
      setRam(data)
      console.log("mi data ram ", data);
      console.log("tipo ", data.tipo);
      const newData = {
        porcetajeSinUso: data.porcetajeSinUso,
        porcentaje: data.porcentaje,
      };
      const arrayData = Object.values(newData);
      setSeries(arrayData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(asignarRam, 2000);

    return () => clearInterval(intervalId);
  }, [urlApi]);

  return (
    <div>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {nombre}
      </Typography>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={380}
        />
      </div>
      <div>
        {ram ? (
  ram.tipo == "ram" ? (
    <ul>
      <li>RAM total: {ram.total} Gb</li>
      <li>RAM en uso: {ram.uso} Gb</li>
      <li>RAM sin uso: {ram.sinUso} Gb</li>
    </ul>
  ) : (
    <p></p>
  )
) : (
  <p>Cargando...</p>
)}
      </div>
    </div>
  );
}

export default Pastel;

