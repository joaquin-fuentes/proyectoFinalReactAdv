import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdSchool } from "react-icons/io";
import { LiaSchoolSolid } from "react-icons/lia";
import { IoNewspaper } from "react-icons/io5";
import { BiSolidMessageAltDetail } from "react-icons/bi";

import logo from "../assets/imagenes/logo-sge-circle.png";

const Sidebar = ({ handleClose }) => {
  const [userSession, setUserSession] = useState({});

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    setUserSession(user);
  }, []);


  return (
    <div className="sidebar text-center d-flex flex-column">
      <div className="sidebar-content flex-grow-1">
        <img src={logo} alt="imagen logo" className="logoSidebar" />
        <nav className="navbar w-100 p-0">
          {/* Mostrar opciones según el rol del usuario */}
          {userSession.rol === "alumno" && (
            <ul className="navbar-nav w-100">
              <li className="nav-item text-center">
                <NavLink
                  to="/alumnos/perfil"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <IoPersonSharp className="me-2" />
                  Perfil
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/alumnos/materias"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <LiaSchoolSolid className="me-2" />
                  Materias
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/alumnos/asistencias"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <IoMdSchool className="me-2" />
                  Asistencias
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/alumnos/novedades"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <IoNewspaper className="me-2" />
                  Novedades
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/alumnos/contacto"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <BiSolidMessageAltDetail className="me-2" />
                  Contacto
                </NavLink>
              </li>
            </ul>
          )}

          {userSession.rol === "docente" && (
            <ul className="navbar-nav w-100">
              <li className="nav-item text-center">
                <NavLink
                  to="/docentes/perfil"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <IoPersonSharp className="me-2" />
                  Perfil
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/docentes/materias"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <LiaSchoolSolid className="me-2" />
                  Materias
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/docentes/asistencias"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <IoMdSchool className="me-2" />
                  Asistencias
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/docentes/novedades"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <IoNewspaper className="me-2" />
                  Novedades
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/docentes/contacto"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <BiSolidMessageAltDetail className="me-2" />
                  Contacto
                </NavLink>
              </li>
            </ul>
          )}

          {userSession.rol === "administrador" && (
            <ul className="navbar-nav w-100">
              <li className="nav-item text-center">
                <NavLink
                  to="/administrador"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <IoPersonSharp className="me-2" />
                  Perfil
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/administrador/usuarios"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <IoPersonSharp className="me-2" />
                  Usuarios
                </NavLink>
              </li>
              <li className="nav-item text-center">
                <NavLink
                  to="/administrador/novedades"
                  className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                  onClick={handleClose}
                >
                  <IoNewspaper className="me-2" />
                  Novedades
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
      <footer className="bg-dark py-3">
        <p className="tituloFooter">Sistema de Gestión Educativa</p>
        <p className="copyFooter">Todos los derechos reservados &copy;</p>
      </footer>
    </div>
  );
};

export default Sidebar;
