import React, { useState } from "react";
import { Button, Modal, ListGroup, Accordion, Card } from "react-bootstrap";
import useAlumnoStore from "../../../stores/Alumnos-Store";

const DetalleAsistenciaAlumnos = ({ curso }) => {
  const [show, setShow] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const { alumnos, obtenerAlumnos } = useAlumnoStore();

  const handleShow = () => {
    obtenerAlumnos();
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setAlumnoSeleccionado(null); // Reiniciar la selección del alumno al cerrar el modal
  };

  const handleAlumnoClick = (alumnoId) => {
    const alumno = alumnos.find((a) => a.id === alumnoId);
    setAlumnoSeleccionado(alumno);
  };

  const obtenerAsistenciasAlumno = (alumnoId) => {
    const presentes = curso.asistencias
      .filter((asistencia) => asistencia.presentes.includes(alumnoId))
      .map((asistencia) => asistencia.fecha);

    const ausentes = curso.asistencias
      .filter((asistencia) => asistencia.ausentes.includes(alumnoId))
      .map((asistencia) => asistencia.fecha);

    return { presentes, ausentes };
  };

  return (
    <>
      <Button variant="warning" className="ms-4" onClick={handleShow}>
        Detalle
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Asistencia de Alumnos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {curso.alumnos.length > 0 ? (
            <ListGroup>
              {curso.alumnos.map((alumnoId) => {
                const alumno = alumnos.find((a) => a.id === alumnoId);
                return (
                  <ListGroup.Item
                    key={alumnoId}
                    action
                    onClick={() => handleAlumnoClick(alumnoId)}
                  >
                    {alumno
                      ? `${alumno.nombre} ${alumno.apellido}`
                      : "Alumno no encontrado"}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <p>No hay alumnos registrados en este curso.</p>
          )}

          {alumnoSeleccionado && (
            <Accordion className="mt-4">
              <Accordion.Item eventKey={alumnoSeleccionado.id}>
                <Accordion.Header>
                  Asistencia de {alumnoSeleccionado.nombre}{" "}
                  {alumnoSeleccionado.apellido}
                </Accordion.Header>
                <Accordion.Body>
                  <h5>Presentes:</h5>
                  <p>
                    Total:{" "}
                    {
                      obtenerAsistenciasAlumno(alumnoSeleccionado.id).presentes
                        .length
                    }
                  </p>
                  <ul>
                    {obtenerAsistenciasAlumno(alumnoSeleccionado.id).presentes
                      .length > 0 ? (
                      obtenerAsistenciasAlumno(
                        alumnoSeleccionado.id
                      ).presentes.map((fecha) => <li key={fecha}>{fecha}</li>)
                    ) : (
                      <li>No hay registros de presencia.</li>
                    )}
                  </ul>
                  <h5>Ausentes:</h5>
                  <p>
                    Total:{" "}
                    {
                      obtenerAsistenciasAlumno(alumnoSeleccionado.id).ausentes
                        .length
                    }
                  </p>
                  <ul>
                    {obtenerAsistenciasAlumno(alumnoSeleccionado.id).ausentes
                      .length > 0 ? (
                      obtenerAsistenciasAlumno(
                        alumnoSeleccionado.id
                      ).ausentes.map((fecha) => <li key={fecha}>{fecha}</li>)
                    ) : (
                      <li>No hay registros de ausencia.</li>
                    )}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}
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

export default DetalleAsistenciaAlumnos;
