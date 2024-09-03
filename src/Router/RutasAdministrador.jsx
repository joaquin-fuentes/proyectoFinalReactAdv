import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import PerfilAdmin from "../pages/administrador/PerfilAdmin";
import ListadoUsuarios from "../pages/administrador/ListadoUsuarios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NavBarSmall from "../components/NavBarSmall";
import Error404 from "../pages/error404/Error404";
import useAuth from "../stores/Auth-Store";
import Materias from "../pages/administrador/Materias";
import Cursos from "../pages/administrador/Cursos";
import PanelAdminNovedades from "../pages/administrador/PanelAdminNovedades";
import Asistencias2 from "../pages/administrador/Asistencias2";

const RutasAdministrador = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validRoutes = [
    "/administrador",
    "/administrador/usuarios",
    "/administrador/novedades",
    "/administrador/materias",
    "/administrador/cursos",
    "/administrador/asistencias",
  ];
  const showSidebarAndHeader = validRoutes.includes(location.pathname);

  if (user?.rol !== "Administrador") {
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
          <Route path="/" element={<PerfilAdmin />} />
          <Route path="/usuarios" element={<ListadoUsuarios />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/asistencias" element={<Asistencias2 />} />
          <Route path="/novedades" element={<PanelAdminNovedades />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </div>
  );
};

export default RutasAdministrador;
