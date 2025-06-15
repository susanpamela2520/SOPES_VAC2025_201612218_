import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";

export function Barra() {
  const home = () => {
    window.location.href = "/";
  };

  return (
    <div style={{ color: "#fff", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar 
          position="static" 
          sx={{ 
            
            boxShadow: "0 4px 14px rgb(0 0 0 / 0.5)", 
            padding: "0.5rem 2rem",
            background: "linear-gradient(90deg, #673AB7, #7E57C2)", 
          }}>
          <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h5" component="div">
              SOPES1
            </Typography>

            <Button color="inherit" variant="outlined" onClick={home}>
              Home
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        style={{ padding: "20px", maxWidth: "1060px", margin: "0 auto" }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Barra;
