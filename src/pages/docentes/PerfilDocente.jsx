import avatar from "../../assets/imagenes/avatarPerfil.jpeg";
import { Container, ProgressBar } from "react-bootstrap";
import "./Docentes.css";

const PerfilDocente = () => {
  //Porcentaje de asistencia, cargar dinámicamente
  const now = 60;

  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center py-md-3">
        <img src={avatar} alt="avatar" className="avatarPerfil" />
        <article className="perfil-card rounded py-2 mt-3 bg-azulOscuro text-light">
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">DNI</h6>
            <span className="ms-auto my-0">41275066</span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Nombre Completo</h6>
            <span className="ms-auto my-0">Andrés Eduardo Santamarina</span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Correo Electrónico</h6>
            <span className="ms-auto my-0">andresesantamarina@gmail.com</span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Dirección</h6>
            <span className="ms-auto my-0">
              Lavalle 709 - San Miguel de Tucumán
            </span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Número de Teléfono</h6>
            <span className="ms-auto my-0">3865608565</span>
          </div>
        </article>
      </Container>

      <Container className="mb-4">
        <h3 className="my-4 text-center titulo">PORCENTAJE DE ASISTENCIA</h3>
        <div className="d-flex justify-content-center">
          <ProgressBar
            animated
            now={now}
            label={`${now}%`}
            className="w-75 progressBar"
          />
        </div>
      </Container>
    </>
  );
};

export default PerfilDocente;
