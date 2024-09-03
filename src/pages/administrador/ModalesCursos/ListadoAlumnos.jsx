import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import useAlumnoStore from "../../../stores/Alumnos-Store";
import { FaEye } from "react-icons/fa";

const ListadoAlumnos = ({ curso }) => {
  const [show, setShow] = useState(false);
  const [alumnosCurso, setAlumnosCurso] = useState([]);
  const { alumnos, obtenerAlumnos, loading, error } = useAlumnoStore();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    obtenerAlumnos();
  }, [obtenerAlumnos]);

  useEffect(() => {
    if (!loading && alumnos.length > 0 && curso.alumnos) {
      const alumnosFiltrados = alumnos.filter((alumno) =>
        curso.alumnos.includes(alumno.id)
      );
      setAlumnosCurso(alumnosFiltrados);
    }
  }, [alumnos, curso.alumnos, loading]);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="outline-success"
        className="m-1 d-flex justify-content-center align-items-center flex-column"
      >
        <FaEye />
      </Button>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton>
          <Modal.Title>
            Listado Alumnos - {curso.anio}° {curso.division}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            <p>Cargando alumnos...</p>
          ) : error ? (
            <p>Error al cargar alumnos: {error}</p>
          ) : (
            <Table striped hover responsive className="rounded">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Nombre y apellido</th>
                </tr>
              </thead>
              <tbody>
                {alumnosCurso.length > 0 ? (
                  alumnosCurso.map((alumno, index) => (
                    <tr key={alumno.id}>
                      <td>{index + 1}</td>
                      <td>
                        {alumno.nombre} {alumno.apellido}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No hay alumnos para este curso</td>
                  </tr>
                )}
              </tbody>
            </Table>
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

export default ListadoAlumnos;
