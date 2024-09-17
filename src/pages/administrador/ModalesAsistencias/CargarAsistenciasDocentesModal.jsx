import React, { useState, useEffect } from "react";
import { Button, Modal, Form, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import useDocenteStore from "../../../stores/Docentes-Store";
import useAsistenciasStore from "../../../stores/AsistenciasDocentes-Store";

const CargarAsistenciasDocentesModal = ({ asistencia }) => {
  const [show, setShow] = useState(false);
  const [asistenciasDocentes, setAsistenciasDocentes] = useState({});
  const { docentes, obtenerDocentes } = useDocenteStore();
  const { updateAsistencia } = useAsistenciasStore();

  useEffect(() => {
    if (show) {
      obtenerDocentes();
    }
  }, [show, obtenerDocentes]);

  useEffect(() => {
    if (docentes.length > 0 && show) {
      const initialAsistencias = {};
      docentes.forEach((docente) => {
        initialAsistencias[docente.id] = asistencia.docentesPresentes.includes(
          docente.id
        );
      });
      setAsistenciasDocentes(initialAsistencias);
    }
  }, [docentes, asistencia, show]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAsistenciaChange = (docenteId) => {
    setAsistenciasDocentes((prev) => ({
      ...prev,
      [docenteId]: !prev[docenteId],
    }));
  };

  const handleGuardarAsistencia = async () => {
    const presentes = Object.keys(asistenciasDocentes).filter(
      (id) => asistenciasDocentes[id]
    );
    const ausentes = Object.keys(asistenciasDocentes).filter(
      (id) => !asistenciasDocentes[id]
    );

    try {
      await updateAsistencia(asistencia.id, {
        fecha: asistencia.fecha,
        docentesPresentes: presentes,
        docentesAusentes: ausentes,
      });

      Swal.fire({
        title: "Asistencia actualizada",
        text: "La asistencia de los docentes se ha guardado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      handleClose();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar la asistencia. Por favor, intenta de nuevo.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar Asistencias
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Asistencias Docentes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFechaAsistencia">
            <Form.Label>Fecha de la Asistencia</Form.Label>
            <Form.Control type="date" value={asistencia.fecha} readOnly />
          </Form.Group>

          {docentes.length > 0 ? (
            <ListGroup className="mt-3">
              {docentes.map((docente) => (
                <ListGroup.Item key={docente.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1">
                      <span>
                        {docente.nombre} {docente.apellido}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="checkbox"
                        id={docente.id}
                        checked={asistenciasDocentes[docente.id] || false}
                        onChange={() => handleAsistenciaChange(docente.id)}
                      />
                      <Form.Label
                        htmlFor={docente.id}
                        className="mb-0 ms-2"
                        style={{ cursor: "pointer" }}
                      >
                        Presente
                      </Form.Label>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No se encontraron docentes.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardarAsistencia}>
            Guardar Asistencia
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CargarAsistenciasDocentesModal;
