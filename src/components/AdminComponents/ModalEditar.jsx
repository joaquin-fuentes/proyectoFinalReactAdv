import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../../pages/administrador/Administrador.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ModalEditar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="btn" onClick={handleShow}>
        <i className="bi bi-pencil-square iconoEditar"></i>
      </button>

      <Modal show={show} onHide={handleClose} className="modalUsuario">
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="titulo">EDITAR USUARIO</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="container">
              <div className="row">
                <div className="col">
                  {" "}
                  <Form.Group className="mb-3" controlId="formCategoria">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select aria-label="Select categoria">
                      <option>Seleccione una categoría</option>
                      <option value="1">Docente</option>
                      <option value="2">Alumno</option>
                      <option value="3">Administrador</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar apellido" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar nombre" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDNI">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar DNI" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formTelefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="tel" placeholder="3865123456" />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group className="mb-3" controlId="formDireccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder="Calle 123" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="ejemplo@gmail.com"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingresar contraseña"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPasswordConfirm">
                    <Form.Label>Confirmar</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repetir contraseña"
                    />
                  </Form.Group>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button
                onClick={handleClose}
                className="m-2 p-2 rounded btnCancelar"
              >
                Cancelar
              </button>
              <button
                type="submit"
                onClick={handleClose}
                className="m-2 p-2 rounded btnGuardar"
              >
                Guardar
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalEditar;
