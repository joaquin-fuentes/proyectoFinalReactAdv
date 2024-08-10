import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import RutasProtegidas from "./RutasProtegidas";
import RutasAdministrador from "./RutasAdministrador";
import RutasAlumnos from "./RutasAlumnos";
import RutasDocentes from "./RutasDocentes";
import Error404 from "../pages/error404/Error404";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas protegidas de administrador */}
        <Route
          path="administrador/*"
          element={
            <RutasProtegidas>
              <RutasAdministrador />
            </RutasProtegidas>
          }
        />
        {/* Rutas protegidas de docentes */}
        <Route
          path="docentes/*"
          element={
            <RutasProtegidas>
              <RutasDocentes />
            </RutasProtegidas>
          }
        />
        {/* Rutas protegidas de alumnos */}
        <Route
          path="alumnos/*"
          element={
            <RutasProtegidas>
              <RutasAlumnos />
            </RutasProtegidas>
          }
        />
        {/* Ruta predeterminada redirigida a la página de inicio */}
        <Route path="/" element={<Home />} />
        {/* Ruta para manejar cualquier ruta no definida */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
