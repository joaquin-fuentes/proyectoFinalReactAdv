import React, { useEffect, useState } from "react";
import { Button, Modal, ListGroup, Spinner, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import useAlumnoStore from "../../../stores/Alumnos-Store";
import useCursosStore from "../../../stores/Cursos-Store";

const CargarAsistenciasModal = ({ curso }) => {
  const [show, setShow] = useState(false);
  const { alumnos, obtenerAlumnos, loading, error } = useAlumnoStore();
  const { actualizarCurso } = useCursosStore();
  const [alumnosDelCurso, setAlumnosDelCurso] = useState([]);

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const anio = hoy.getFullYear();
    return `${anio}-${mes}-${dia}`;
  };

  const [fecha, setFecha] = useState(obtenerFechaActual());
  const [asistencias, setAsistencias] = useState({});

  const handleClose = () => {
    setShow(false);
    setFecha(obtenerFechaActual());
    setAsistencias({});
  };

  const handleShow = () => {
    obtenerAlumnos();
    setShow(true);
  };

  useEffect(() => {
    if (alumnos.length > 0) {
      const alumnosFiltrados = alumnos.filter((alumno) =>
        curso.alumnos.includes(alumno.id)
      );
      setAlumnosDelCurso(alumnosFiltrados);

      const asistenciaExistente = curso.asistencias.find(
        (asistencia) => asistencia.fecha === fecha
      );

      if (asistenciaExistente) {
        const asistenciasIniciales = {};
        alumnosFiltrados.forEach((alumno) => {
          asistenciasIniciales[alumno.id] =
            asistenciaExistente.presentes.includes(alumno.id);
        });
        setAsistencias(asistenciasIniciales);
      } else {
        const inicialAsistencias = {};
        alumnosFiltrados.forEach((alumno) => {
          inicialAsistencias[alumno.id] = false;
        });
        setAsistencias(inicialAsistencias);
      }
    }
  }, [alumnos, curso.alumnos, fecha]);

  const handleAsistenciaChange = (alumnoId) => {
    setAsistencias((prev) => ({
      ...prev,
      [alumnoId]: !prev[alumnoId],
    }));
  };

  const handleGuardarAsistencia = async () => {
    try {
      const nuevaAsistencia = {
        fecha,
        presentes: Object.keys(asistencias).filter((id) => asistencias[id]),
        ausentes: Object.keys(asistencias).filter((id) => !asistencias[id]),
      };

      const asistenciasActualizadas = curso.asistencias.map((asistencia) =>
        asistencia.fecha === fecha ? nuevaAsistencia : asistencia
      );

      if (!curso.asistencias.some((asistencia) => asistencia.fecha === fecha)) {
        asistenciasActualizadas.push(nuevaAsistencia);
      }

      const cursoActualizado = {
        ...curso,
        asistencias: asistenciasActualizadas,
      };

      await actualizarCurso(curso.id, cursoActualizado);

      Swal.fire({
        title: "Asistencia guardada",
        text: "La asistencia se ha guardado correctamente.",
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
        Cargar asistencia
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton>
          <Modal.Title>Cargar Asistencias</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="formFechaAsistencia" className="pb-3">
            <Form.Label>Fecha de la Asistencia</Form.Label>
            <Form.Control
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </Form.Group>

          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <p>Error: {error}</p>
          ) : alumnosDelCurso.length > 0 ? (
            <ListGroup>
              {alumnosDelCurso.map((alumno) => (
                <ListGroup.Item key={alumno.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="flex-grow-1">
                      <span>
                        {alumno.nombre} {alumno.apellido}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="checkbox"
                        id={alumno.id}
                        checked={asistencias[alumno.id]}
                        onChange={() => handleAsistenciaChange(alumno.id)}
                      />
                      <Form.Label
                        htmlFor={alumno.id}
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
            <p>No hay alumnos registrados en este curso.</p>
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

export default CargarAsistenciasModal;
