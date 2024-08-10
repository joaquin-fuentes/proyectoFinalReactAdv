import React from "react";
import "./Error404.css";
import { Link } from "react-router-dom";
import useAuth from "../../stores/Auth-Store";

const Error404 = () => {
  const {user} = useAuth()

  const buscarRuta =(usuario)=>{
    console.log(usuario)
    if(usuario.rol === "alumno"){
      return "/alumnos" 
    }
    if(usuario.rol === "docente"){
      return "/docentes" 
    }
    if(usuario.rol === "administrador"){
      return "/administrador" 
    }
  }
  return (
    <div className="error-container">
      <img
        src="https://i.pinimg.com/564x/c9/cb/dc/c9cbdc1d1214d5d1c94f43a27a16e554.jpg"
        alt="404 Page Not Found"
        className="error-image"
      />
      <Link to={buscarRuta(user)} className="btn btn-outline-light">
        Volver a la página de inicio
      </Link>
    </div>
  );
};

export default Error404;
