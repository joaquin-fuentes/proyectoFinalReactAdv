import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ handleClose }) => {
  return (
    <div className="sidebar text-center d-flex flex-column">
      <div className="sidebar-content flex-grow-1">
        <h2 className="mt-3">Logo</h2>
        <nav className="navbar w-100">
          {/*  if alumnos */}
          <ul className="navbar-nav w-100">
            <li className="nav-item text-center py-2 border ">
              <NavLink to="alumnos/perfil" className="nav-link" onClick={handleClose}>
                Perfl
              </NavLink>
            </li>
            <li className="nav-item text-center py-2 border ">
              <NavLink
                to="alumnos/materias"
                className="nav-link"
                onClick={handleClose}
              >
                Materias
              </NavLink>
            </li>
            <li className="nav-item text-center py-2 border ">
              <NavLink
                to="alumnos/asistencias"
                className="nav-link"
                onClick={handleClose}
              >
                Asistencias
              </NavLink>
            </li>
            <li className="nav-item text-center py-2 border ">
              <NavLink
                to="alumnos/novedades"
                className="nav-link"
                onClick={handleClose}
              >
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
      <footer className="bg-dark text-light py-3">Footer</footer>
    </div>
  );
};

export default Sidebar;
