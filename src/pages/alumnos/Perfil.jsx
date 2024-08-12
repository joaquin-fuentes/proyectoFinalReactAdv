import React from "react";
import avatar from "../../assets/imagenes/avatarPerfil.jpeg";
import { Container } from "react-bootstrap";
import "./Alumnos.css";
import useAuth from "../../stores/Auth-Store";

const Perfil = () => {
  const { user } = useAuth();
  return (
    <Container className="d-flex flex-column align-items-center justify-content-cente py-md-3">
      <img src={avatar} alt="avatar" className="avatarPerfil" />
      <article className="perfil-card rounded py-2 mt-3 bg-azulOscuro text-light">
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">DNI:</h6>
          <span>{user.dni}</span>
          {/* <span>37423893</span> */}
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Nombre Completo</h6>
          <span>{user.nombre} {user.apellido}</span>
          {/* <span>Joaquin Alberto Fuentes</span> */}
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Curso</h6>
          <span>3° C</span>
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Correo Electrónico</h6>
          <span>{user.email}</span>
          {/* <span>Joaquin.fuentes1327@gmail.com</span> */}
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Direccion</h6>
          <span>{user.direccion}</span>
          {/* <span>España 2456 - San Miguel de Tucumán</span> */}
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Número de Celular</h6>
          <span>{user.telefono}</span>
          {/* <span>3816097754</span> */}
        </div>
        <hr className="my-1 mx-2" />
        <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
          <h6 className="me-1 my-0 fw-bold">Número de Celular Padres</h6>
          <span>3816097754 - 381524625</span>
        </div>
      </article>
    </Container>
  );
};

export default Perfil;
