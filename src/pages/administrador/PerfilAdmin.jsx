import "./Administrador.css";
import avatar from "../../assets/imagenes/avatarPerfil.jpeg";
import { Container } from "react-bootstrap";

const PerfilAdmin = () => {
  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-center py-md-3">
        <img src={avatar} alt="avatar" className="avatarPerfil" />
        <article className="perfil-card rounded py-2 mt-3 bg-datosAdmin text-light">
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">DNI</h6>
            <span className="ms-auto my-0">12345678</span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Nombre Completo</h6>
            <span className="ms-auto my-0">Enzo Pérez</span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Correo Electrónico</h6>
            <span className="ms-auto my-0">enzoperez@gmail.com</span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Dirección</h6>
            <span className="ms-auto my-0">
              Lavalle 100 - San Miguel de Tucumán
            </span>
          </div>
          <hr className="my-1 mx-2" />
          <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
            <h6 className="me-1 my-0 fw-bold">Número de Teléfono</h6>
            <span className="ms-auto my-0">381565656</span>
          </div>
        </article>
      </Container>
    </>
  );
};

export default PerfilAdmin;
