import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import useAlumnoStore from "../../../stores/Alumnos-Store";
import { FaEdit, FaTrash } from "react-icons/fa";
import useCursosStore from "../../../stores/Cursos-Store";
import Swal from "sweetalert2";

const EditarAlumnos = ({ curso }) => {
  const [show, setShow] = useState(false);
  const [alumnosCurso, setAlumnosCurso] = useState([]);
  const [alumnosDisponibles, setAlumnosDisponibles] = useState([]);
  const { actualizarCurso, cursos, obtenerCursos } = useCursosStore();
  const { alumnos, obtenerAlumnos, loading, error } = useAlumnoStore();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Obtén los alumnos cuando el componente se monta
    obtenerAlumnos();
  }, [obtenerAlumnos]);

  useEffect(() => {
    if (!loading && alumnos.length > 0) {
      // Obtener todos los IDs de alumnos que ya están en algún curso
      const alumnosAsignados = new Set(
        cursos.reduce((acc, curso) => {
          return acc.concat(curso.alumnos);
        }, [])
      );

      // Filtrar los alumnos que ya están en algún curso
      const alumnosNoAsignados = alumnos.filter(
        (alumno) => !alumnosAsignados.has(alumno.id)
      );

      // Filtrar los alumnos que ya están en el curso actual
      const alumnosEnCurso = alumnos.filter((alumno) =>
        curso.alumnos.includes(alumno.id)
      );

      setAlumnosCurso(alumnosEnCurso);
      setAlumnosDisponibles(alumnosNoAsignados);
    }
  }, [alumnos, curso, loading, cursos]);

  const eliminarAlumno = (alumnoID) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Eliminar el ID del alumno de la lista de IDs en curso.alumnos
          const nuevosAlumnos = curso.alumnos.filter((id) => id !== alumnoID);

          // Actualizar el curso con los nuevos IDs de alumnos
          const cursoActualizado = {
            ...curso,
            alumnos: nuevosAlumnos,
          };
          await actualizarCurso(curso.id, cursoActualizado);

          // Actualizar el estado local
          setAlumnosCurso(
            alumnosCurso.filter((alumno) => alumno.id !== alumnoID)
          );
          setAlumnosDisponibles([
            ...alumnosDisponibles,
            alumnos.find((alumno) => alumno.id === alumnoID),
          ]);

          Swal.fire("Eliminado", "El alumno ha sido eliminado.", "success");
        } catch (error) {
          Swal.fire(
            "Error",
            error.message || "No se pudo eliminar el alumno.",
            "error"
          );
        }
      }
    });
  };

  const agregarAlumno = (event) => {
    const alumnoID = event.target.value;
    const alumnoSeleccionado = alumnos.find((alumno) => alumno.id === alumnoID);

    if (alumnoSeleccionado) {
      // Agrega el ID del alumno seleccionado al listado del curso
      const cursoActualizado = {
        ...curso,
        alumnos: [...curso.alumnos, alumnoSeleccionado.id],
      };
      actualizarCurso(curso.id, cursoActualizado);

      // Actualizar el estado local
      setAlumnosCurso([...alumnosCurso, alumnoSeleccionado]);
      setAlumnosDisponibles(
        alumnosDisponibles.filter((alumno) => alumno.id !== alumnoID)
      );

      Swal.fire("Agregado", "El alumno ha sido agregado con éxito.", "success");
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant="outline-warning"
        className="m-1 d-flex justify-content-center align-items-center flex-column"
      >
        <FaEdit />
      </Button>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Alumnos - {curso.anio}° {curso.division}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            <p>Cargando alumnos...</p>
          ) : error ? (
            <p>Error al cargar alumnos: {error}</p>
          ) : (
            <>
              <Table striped hover responsive className="rounded">
                <thead>
                  <tr>
                    <th>Orden</th>
                    <th>Nombre y apellido</th>
                    <th>Acciones</th>
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
                        <td>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => eliminarAlumno(alumno.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No hay alumnos para este curso</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Form.Group className="mt-3">
                <Form.Label>Agregar Alumno</Form.Label>
                <Form.Control as="select" onChange={agregarAlumno}>
                  <option value="">Seleccionar Alumno...</option>
                  {alumnosDisponibles.map((alumno) => (
                    <option key={alumno.id} value={alumno.id}>
                      {alumno.nombre} {alumno.apellido}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </>
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

export default EditarAlumnos;
