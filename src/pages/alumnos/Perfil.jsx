import React from "react";
import avatar from "../../assets/imagenes/avatarPerfil.jpeg";
import { Container } from "react-bootstrap";
import "./Alumnos.css";


const Perfil = () => {
  return (
    <Container className="d-flex flex-column align-items-center">
      <img src={avatar} alt="avatar" className="avatarPerfil" />
      <article className="perfil-card card mt-3 bg-secondary text-light">
        <div className="d-flex justify-content-between align-items-center px-5 py-2">
          <h6 className="m-0">DNI:</h6>
          <span>37423893</span>
        </div>
        <hr className="my-1 mx-4" />
        <div className="d-flex justify-content-between align-items-center px-5 py-2">
          <h6 className="m-0">Nombre Completo</h6>
          <span>Joaquin Alberto Fuentes</span>
        </div>
        <hr className="my-1 mx-4" />
        <div className="d-flex justify-content-between align-items-center px-5 py-2">
          <h6 className="m-0">Curso</h6>
          <span>3° C</span>
        </div>
        <hr className="my-1 mx-4" />
        <div className="d-flex justify-content-between align-items-center px-5 py-2">
          <h6 className="m-0">Correo Electrónico</h6>
          <span>Joaquin.fuentes1327@gmail.com</span>
        </div>
        <hr className="my-1 mx-4" />
        <div className="d-flex justify-content-between align-items-center px-5 py-2">
          <h6 className="m-0">Direccion</h6>
          <span>España 2456 - San Miguel de Tucumán</span>
        </div>
        <hr className="my-1 mx-4" />
        <div className="d-flex justify-content-between align-items-center px-5 py-2">
          <h6 className="m-0">Número de Celular</h6>
          <span>3816097754</span>
        </div>
        <hr className="my-1 mx-4" />
        <div className="d-flex justify-content-between align-items-center px-5 py-2">
          <h6 className="m-0">Número de Celular Padres</h6>
          <span>3816097754 - 381524625</span>
        </div>
      </article>
    </Container>
  );
};

export default Perfil;
