import React from "react";
import { NavLink } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdSchool } from "react-icons/io";
import { LiaSchoolSolid } from "react-icons/lia";
import { IoNewspaper } from "react-icons/io5";
import logo from "../assets/imagenes/logo-sge-circle.png";

const Sidebar = ({ handleClose }) => {
  return (
    <div className="sidebar text-center d-flex flex-column">
      <div className="sidebar-content flex-grow-1">
        <img src={logo} alt="imagen logo" className="logoSidebar" />
        <nav className="navbar w-100 p-0">
          {/*  if alumnos */}
          <ul className="navbar-nav w-100">
            <li className="nav-item text-center">
              <NavLink
                to="alumnos/perfil"
                className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                onClick={handleClose}
              >
                <IoPersonSharp className="me-2" />
                Perfl
              </NavLink>
            </li>
            <li className="nav-item text-center">
              <NavLink
                to="alumnos/materias"
                className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                onClick={handleClose}
              >
                <LiaSchoolSolid className="me-2" />
                Materias
              </NavLink>
            </li>
            <li className="nav-item text-center">
              <NavLink
                to="alumnos/asistencias"
                className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                onClick={handleClose}
              >
                <IoMdSchool className="me-2" />
                Asistencias
              </NavLink>
            </li>
            <li className="nav-item text-center">
              <NavLink
                to="alumnos/novedades"
                className="nav-link text-light fw-bold btnSidebar py-3 d-flex justify-content-center align-items-center"
                onClick={handleClose}
              >
                <IoNewspaper className="me-2" />
                Novedades
              </NavLink>
            </li>
          </ul>
          {/*  if docentes */}
          {/* Deben copar el sidebar que esta arriba y pegar aqui con los enlaces que necesiten, despues haremos el filtro */}
          {/*  if administrador */}
          {/* Deben copar el sidebar que esta arriba y pegar aqui con los enlaces que necesiten, despues haremos el filtro */}
        </nav>
      </div>
      <footer className="bg-dark py-3">Footer</footer>
    </div>
  );
};

export default Sidebar;
