import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, Container, Offcanvas } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Perfil from "../pages/alumnos/Perfil";
import Materias from "../pages/alumnos/Materias";
import Novedades from "../pages/alumnos/Novedades";
import Header from "../components/Header";
import Asistencias from "../pages/alumnos/Asistencias";
import NavBarSmall from "../components/NavBarSmall";
import Error404 from "../pages/Error404";
import Home from "../pages/home/Home";
import Docentes from "../pages/docentes/Docentes";
import Administrador from "../pages/administrador/Administrador";

const AppRouter = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Definir las rutas donde se debe mostrar el sidebar y header
  const showSidebarAndHeader = location.pathname !== "/";

  return (
    <BrowserRouter>
      <div className="d-flex flex-column flex-lg-row">
        {/* Navbar for small screens */}
        {showSidebarAndHeader && (
          <NavBarSmall
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        )}

        {/* Sidebar for large screens */}
        {showSidebarAndHeader && (
          <div className="sidebar d-none d-lg-block">
            <Sidebar />
          </div>
        )}

        <div className={showSidebarAndHeader ? "main-content flex-grow-1" : ""}>
          {showSidebarAndHeader && <Header />}
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home></Home>}></Route>
            {/* Alumnos */}
            <Route path="alumnos" element={<Perfil />} />
            <Route path="alumnos/perfil" element={<Perfil />} />
            <Route path="alumnos/materias" element={<Materias />} />
            <Route path="alumnos/asistencias" element={<Asistencias />} />
            <Route path="alumnos/novedades" element={<Novedades />} />
            {/* Docentes */}
            <Route path="docentes" element={<Docentes />}></Route>
            {/* Administradores */}
            <Route path="administrador" element={<Administrador />}></Route>
            {/* RUTA DeSCONOCIDA */}
            <Route path="*" element={<Error404></Error404>}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
