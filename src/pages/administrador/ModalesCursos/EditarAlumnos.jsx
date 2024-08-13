import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import useAlumnoStore from "../../../stores/Alumnos-Store";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import useCursosStore from "../../../stores/Cursos-Store";
import Swal from "sweetalert2";

const EditarAlumnos = ({ curso }) => {
  const [show, setShow] = useState(false);
  const [alumnosCurso, setAlumnosCurso] = useState([]);
  const [alumnosDisponibles, setAlumnosDisponibles] = useState([]);
  const { actualizarCurso } = useCursosStore();
  const { alumnos, obtenerAlumnos, loading, error } = useAlumnoStore();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Obtén los alumnos cuando el componente se monta
    obtenerAlumnos();
  }, [obtenerAlumnos]);

  useEffect(() => {
    if (!loading && alumnos.length > 0 && curso.alumnos) {
      // Extraer los IDs de alumnos del curso actual
      const idsCurso = curso.alumnos.map((alumno) => alumno.alumnoID);

      // Filtrar los alumnos que ya están en el curso
      const alumnosFiltrados = alumnos.filter((alumno) =>
        idsCurso.includes(alumno.id)
      );

      // Filtrar los alumnos que no están en el curso para mostrarlos en el select
      const alumnosNoAsignados = alumnos.filter(
        (alumno) => !idsCurso.includes(alumno.id)
      );

      setAlumnosCurso(alumnosFiltrados);
      setAlumnosDisponibles(alumnosNoAsignados);
    }
  }, [alumnos, curso, loading]);

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
          // Filtra el alumno que se va a eliminar del listado del curso
          const nuevosAlumnos = alumnosCurso.filter(
            (alumno) => alumno.id !== alumnoID
          );
          setAlumnosCurso(nuevosAlumnos);

          // Actualiza el curso para reflejar la eliminación
          const cursoActualizado = {
            ...curso,
            alumnos: curso.alumnos.filter(
              (alumno) => alumno.alumnoID !== alumnoID
            ),
          };
          actualizarCurso(curso.id, cursoActualizado);
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
      // Agrega el alumno seleccionado al listado del curso
      setAlumnosCurso([...alumnosCurso, alumnoSeleccionado]);

      // Actualiza el curso para reflejar la adición
      const cursoActualizado = {
        ...curso,
        alumnos: [...curso.alumnos, { alumnoID: alumnoSeleccionado.id }],
      };
      actualizarCurso(curso.id, cursoActualizado);
      Swal.fire("Agregado", "El alumno ha sido agregado con éxito.", "success");
      // Elimina el alumno de la lista de alumnos disponibles
      setAlumnosDisponibles(
        alumnosDisponibles.filter(
          (alumno) => alumno.id !== alumnoSeleccionado.id
        )
      );
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
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnosCurso.length > 0 ? (
                    alumnosCurso.map((alumno, index) => (
                      <tr key={alumno.id}>
                        <td>{index + 1}</td>
                        <td>{alumno.nombre}</td>
                        <td>
                          <div className>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => eliminarAlumno(alumno.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
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
                      {alumno.nombre}
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
