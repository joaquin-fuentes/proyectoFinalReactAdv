import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../../pages/administrador/Administrador.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container } from "react-bootstrap";
import avatar from "../../assets/imagenes/avatarPerfil.jpeg";

const ModalInfo = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="btn" onClick={handleShow}>
        <i className="bi bi-eye iconoVer"></i>
      </button>

      <Modal show={show} onHide={handleClose} className="modalUsuario">
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="titulo">INFORMACIÓN</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="d-flex flex-column align-items-center justify-content-center py-md-3">
            <img src={avatar} alt="avatar" className="avatarPerfil" />
            <article className="perfil-card-admin rounded py-2 mt-3 bg-datosAdmin text-light contenedorDatos">
              <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
                <h6 className="me-1 my-0 fw-bold">DNI</h6>
                <span className="ms-auto my-0">12345678</span>
              </div>
              <hr className="my-1 mx-2" />
              <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
                <h6 className="me-1 my-0 fw-bold">Apellido</h6>
                <span className="ms-auto my-0">Pérez</span>
              </div>
              <hr className="my-1 mx-2" />
              <div className="d-flex justify-content-md-between align-items-center px-2 px-md-5 py-2">
                <h6 className="me-1 my-0 fw-bold">Nombre</h6>
                <span className="ms-auto my-0">Enzo</span>
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
          <div className="text-center">
            <button
              onClick={handleClose}
              className="m-2 p-2 rounded btnCancelar"
            >
              Cerrar
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalInfo;
