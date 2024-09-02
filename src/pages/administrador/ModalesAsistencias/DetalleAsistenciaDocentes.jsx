import React, { useState, useEffect } from "react";
import { Button, Modal, ListGroup, Accordion } from "react-bootstrap";
import useDocenteStore from "../../../stores/Docentes-Store";
import useAsistenciasStore from "../../../stores/AsistenciasDocentes-Store";

const DetalleAsistenciaDocentes = () => {
  const [show, setShow] = useState(false);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
  const { docentes, obtenerDocentes } = useDocenteStore();
  const { asistencias, getAsistencias } = useAsistenciasStore();

  useEffect(() => {
    obtenerDocentes(); // Cargar la lista de docentes al montar el componente
    getAsistencias(); // Cargar las asistencias al montar el componente
  }, [obtenerDocentes, getAsistencias]);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setDocenteSeleccionado(null); // Reiniciar la selección del docente al cerrar el modal
  };

  const handleDocenteClick = (docenteId) => {
    const docente = docentes.find((d) => d.id === docenteId);
    setDocenteSeleccionado(docente);
  };

  const obtenerAsistenciasDocente = (docenteId) => {
    const presentes = asistencias
      .filter((asistencia) => asistencia.docentesPresentes.includes(docenteId))
      .map((asistencia) => asistencia.fecha);

    const ausentes = asistencias
      .filter((asistencia) => asistencia.docentesAusentes.includes(docenteId))
      .map((asistencia) => asistencia.fecha);

    return { presentes, ausentes };
  };

  return (
    <>
      <Button variant="warning" className="ms-4" onClick={handleShow}>
        Detalle Asistencias
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalle de Asistencia de Docentes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {docentes.length > 0 ? (
            <ListGroup>
              {docentes.map((docente) => (
                <ListGroup.Item
                  key={docente.id}
                  action
                  onClick={() => handleDocenteClick(docente.id)}
                >
                  {docente.nombre} {docente.apellido}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No se encontraron docentes.</p>
          )}

          {docenteSeleccionado && (
            <Accordion className="mt-4">
              <Accordion.Item eventKey={docenteSeleccionado.id}>
                <Accordion.Header>
                  Asistencia de {docenteSeleccionado.nombre}{" "}
                  {docenteSeleccionado.apellido}
                </Accordion.Header>
                <Accordion.Body>
                  <h5>Presentes ({obtenerAsistenciasDocente(docenteSeleccionado.id).presentes.length}):</h5>
                  <ul>
                    {obtenerAsistenciasDocente(docenteSeleccionado.id).presentes
                      .length > 0 ? (
                      obtenerAsistenciasDocente(
                        docenteSeleccionado.id
                      ).presentes.map((fecha) => <li key={fecha}>{fecha}</li>)
                    ) : (
                      <li>No hay registros de presencia.</li>
                    )}
                  </ul>
                  <h5>Ausentes ({obtenerAsistenciasDocente(docenteSeleccionado.id).ausentes.length}):</h5>
                  <ul>
                    {obtenerAsistenciasDocente(docenteSeleccionado.id).ausentes
                      .length > 0 ? (
                      obtenerAsistenciasDocente(
                        docenteSeleccionado.id
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

export default DetalleAsistenciaDocentes;
