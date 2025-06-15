import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Barra } from "./components/Barra";
import { Inicio } from "./components/Inicio";
import "./App.css";

function App() {
  return (
    /* De esta forma creamos las rutas necesarias para navegar en la pagina. */
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Barra />}>
          <Route path="/" element={<Inicio />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to="/" replace={true} />}
          exact={true}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
