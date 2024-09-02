import React, { useState, useEffect } from "react";
import { Button, Modal, Form, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import useAsistenciasStore from "../../../stores/AsistenciasDocentes-Store";
import useDocenteStore from "../../../stores/Docentes-Store";

const CrearAsistenciaDocente = () => {
  const [show, setShow] = useState(false);
  const [fecha, setFecha] = useState("");
  const [asistencias, setAsistencias] = useState({});
  const { docentes, obtenerDocentes } = useDocenteStore();
  const {
    asistencias: todasAsistencias,
    getAsistencias,
    createOrUpdateAsistencia,
  } = useAsistenciasStore();

  useEffect(() => {
    const obtenerFechaActual = () => {
      const hoy = new Date();
      const dia = String(hoy.getDate()).padStart(2, "0");
      const mes = String(hoy.getMonth() + 1).padStart(2, "0");
      const anio = hoy.getFullYear();
      return `${anio}-${mes}-${dia}`;
    };

    setFecha(obtenerFechaActual());
    obtenerDocentes(); // Cargar la lista de docentes al montar el componente
    getAsistencias(); // Cargar todas las asistencias
  }, [obtenerDocentes, getAsistencias]);

  const handleShow = () => {
    // Verificar si ya existe una asistencia para la fecha seleccionada
    const asistenciaExistente = todasAsistencias.find(
      (asistencia) => asistencia.fecha === fecha
    );

    const inicialAsistencias = {};

    if (asistenciaExistente) {
      // Si existe, marcar los docentes presentes y ausentes
      docentes.forEach((docente) => {
        inicialAsistencias[docente.id] =
          asistenciaExistente.docentesPresentes.includes(docente.id);
      });
    } else {
      // Si no existe, inicializar todos como ausentes
      docentes.forEach((docente) => {
        inicialAsistencias[docente.id] = false;
      });
    }

    setAsistencias(inicialAsistencias);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleAsistenciaChange = (docenteId) => {
    setAsistencias((prev) => ({
      ...prev,
      [docenteId]: !prev[docenteId], // Cambiar el estado de asistencia del docente
    }));
  };

  const handleCrearAsistencia = async () => {
    const presentes = Object.keys(asistencias).filter((id) => asistencias[id]);
    const ausentes = Object.keys(asistencias).filter((id) => !asistencias[id]);

    try {
      await createOrUpdateAsistencia(fecha, presentes, ausentes);
      Swal.fire({
        title: "Asistencia guardada",
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
      <Button variant="success" onClick={handleShow}>
        Crear Asistencia Docente
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Asistencia de Docentes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="formFechaAsistencia">
            <Form.Label>Fecha de la Asistencia</Form.Label>
            <Form.Control
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </Form.Group>

          {docentes.length > 0 ? (
            <ListGroup className="mt-3">
              {docentes.map((docente) => (
                <ListGroup.Item
                  key={docente.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    {docente.nombre} {docente.apellido}
                  </span>
                  <Form.Check
                    type="checkbox"
                    label="Presente"
                    checked={asistencias[docente.id] || false}
                    onChange={() => handleAsistenciaChange(docente.id)}
                  />
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
          <Button variant="primary" onClick={handleCrearAsistencia}>
            Crear Asistencia
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CrearAsistenciaDocente;
