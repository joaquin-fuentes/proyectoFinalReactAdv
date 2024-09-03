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
        <Route
          path="administrador/*"
          element={
            <RutasProtegidas>
              <RutasAdministrador />
            </RutasProtegidas>
          }
        />
        <Route
          path="docentes/*"
          element={
            <RutasProtegidas>
              <RutasDocentes />
            </RutasProtegidas>
          }
        />
        <Route
          path="alumnos/*"
          element={
            <RutasProtegidas>
              <RutasAlumnos />
            </RutasProtegidas>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
