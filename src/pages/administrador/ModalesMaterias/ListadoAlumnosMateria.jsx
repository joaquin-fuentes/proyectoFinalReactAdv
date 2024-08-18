import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ListadoAlumnosMateria = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="primary"
        className=" m-1 d-flex justify-content-center align-items-center flex-column"
      >
        alumnos
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Listado de alumnos de la materia</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ol>
            <li>Joaquin Fuentes</li>
            <li>Joaquin Fuentes</li>
            <li>Joaquin Fuentes</li>
            <li>Joaquin Fuentes</li>
            <li>Joaquin Fuentes</li>
            <li>Joaquin Fuentes</li>
            <li>Joaquin Fuentes</li>
            <li>Joaquin Fuentes</li>
            <li>Joaquin Fuentes</li>
            <li>Joaquin Fuentes</li>
            <li>Joaquin Fuentes</li>
            <li>Joaquin Fuentes</li>
          </ol>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListadoAlumnosMateria;
