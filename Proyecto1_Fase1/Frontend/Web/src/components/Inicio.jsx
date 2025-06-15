import Pastel from "./Pastel";

export function Inicio() {
  return (
    <div
      style={{ 
        padding: "20px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "50vh",
        color: "#fff",
        boxSizing: "border-box",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Monitor del Linux
      </h1>

      <div
        style={{ 
          display: "flex",
          gap: "100px",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "20px",
          background: "rgba(255, 255, 255, 0.1)", 
          borderRadius: "20px",
          boxShadow: "0 4px 14px rgb(0 0 0 / 0.5)", 
        }}>
        <Pastel nombre="RAM" urlApi="http://localhost:5002/api/ram" />
        <Pastel nombre="CPU" urlApi="http://localhost:5002/api/cpu" />
      </div>
    </div>
  );
}

export default Inicio;
