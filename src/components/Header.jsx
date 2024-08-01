import React from "react";
import imgPerfil from "../assets/imagenes/avatarPerfil.jpeg";
import { MdLogout } from "react-icons/md";

const Header = () => {
  return (
    <div className="bg-azulOscuro text-light p-3 text-end d-flex align-items-center  justify-content-around justify-content-md-end">
      <span className="me-md-5  rounded-circle text-light  ">
        <img src={imgPerfil} alt="avatar" className="imgAvatarHeader" />
      </span>
      <span className="me-md-5">Nombre Usuario</span>
      <span className="me-md-5">
        <MdLogout className="me-1" />
        Salir
      </span>
    </div>
  );
};

export default Header;
