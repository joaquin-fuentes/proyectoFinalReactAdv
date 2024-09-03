import React from "react";
import imgPerfil from "../assets/imagenes/avatarPerfil.jpeg";
import { MdLogout } from "react-icons/md";
import useAuth from "../stores/Auth-Store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();


  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Tu sesión se cerrará",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Cerrando sesión",
          text: "Serás redirigido al inicio...",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
          willClose: () => {
            navigate("/");
          },
        });
      }
    });
  };

  return (
    <div className="bg-azulOscuro text-light p-3 text-end d-flex align-items-center justify-content-around justify-content-md-end">
      <span className="me-md-5 rounded-circle text-light">
        <img src={imgPerfil} alt="avatar" className="imgAvatarHeader" />
      </span>
      <span className="me-md-5">{user.nombre}</span>
      <div className="me-md-5 logout-btn" onClick={handleLogout}>
        <MdLogout className="me-1" />
        Salir
      </div>
    </div>
  );
};

export default Header;
