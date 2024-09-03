import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Perfil from "../pages/alumnos/Perfil";
import Materias from "../pages/alumnos/Materias";
import Asistencias from "../pages/alumnos/Asistencias";
import Novedades from "../pages/alumnos/Novedades";
import Contacto from "../components/Contacto";
import Sidebar from "../components/Sidebar";
import NavBarSmall from "../components/NavBarSmall";
import Header from "../components/Header";
import Error404 from "../pages/error404/Error404";
import useAuth from "../stores/Auth-Store";

const RutasAlumnos = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validRoutes = [
    "/alumnos",
    "/alumnos/perfil",
    "/alumnos/materias",
    "/alumnos/asistencias",
    "/alumnos/novedades",
    "/alumnos/contacto",
  ];

  const showSidebarAndHeader = validRoutes.includes(location.pathname);

  if (user?.rol !== "Alumno") {
    return <Navigate to="/error" replace />;
  }

  return (
    <div className="d-flex flex-column flex-lg-row">
      {showSidebarAndHeader && (
        <NavBarSmall
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      )}

      {showSidebarAndHeader && (
        <div className="sidebar d-none d-lg-block">
          <Sidebar />
        </div>
      )}

      <div className={showSidebarAndHeader ? "main-content flex-grow-1" : ""}>
        {showSidebarAndHeader && <Header />}
        <Routes>
          <Route path="/" element={<Perfil />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="materias" element={<Materias />} />
          <Route path="asistencias" element={<Asistencias />} />
          <Route path="novedades" element={<Novedades />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
};

export default RutasAlumnos;
