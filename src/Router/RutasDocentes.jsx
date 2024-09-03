import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import PerfilDocente from "../pages/docentes/PerfilDocente";
import ListadoMaterias from "../pages/docentes/ListadoMaterias";
import AsistenciasDocente from "../pages/docentes/AsistenciasDocente";
import ListadoAlumnos from "../pages/docentes/ListadoAlumnos";
import SeccionNovedades from "../pages/docentes/SeccionNovedades";
import Sidebar from "../components/Sidebar";
import NavBarSmall from "../components/NavBarSmall";
import Header from "../components/Header";
import Error404 from "../pages/error404/Error404";
import Contacto from "../components/Contacto";
import useAuth from "../stores/Auth-Store";

const RutasDocentes = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validRoutes = [
    "/docentes",
    "/docentes/perfil",
    "/docentes/materias",
    "/docentes/asistencias",
    "/docentes/alumnos",
    "/docentes/novedades",
    "/docentes/contacto",
  ];

  const showSidebarAndHeader = validRoutes.includes(location.pathname);

  if (user?.rol !== "Docente") {
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
          <Route path="/" element={<PerfilDocente />} />
          <Route path="perfil" element={<PerfilDocente />} />
          <Route path="materias" element={<ListadoMaterias />} />
          <Route path="asistencias" element={<AsistenciasDocente />} />
          <Route path="alumnos" element={<ListadoAlumnos />} />
          <Route path="novedades" element={<SeccionNovedades />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
};

export default RutasDocentes;
