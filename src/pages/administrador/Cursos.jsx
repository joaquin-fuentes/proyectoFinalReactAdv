import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
// import EditarCurso from "./ModalesCursos/EditarCurso";
// import CrearCurso from "./ModalesCursos/CrearCurso";
import useCursosStore from "../../stores/Cursos-Store";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import CrearCurso from "./ModalesCursos/CrearCurso";
import ListadoHorarios from "./ModalesCursos/ListadoHorarios";
import ListadoAlumnos from "./ModalesCursos/ListadoAlumnos";
import EditarHorarios from "./ModalesCursos/EditarHorarios";
import EditarAlumnos from "./ModalesCursos/EditarAlumnos";
import EditarCurso from "./ModalesCursos/EditarCurso";

const Cursos = () => {
  const { cursos, obtenerCursos, borrarCurso } = useCursosStore();
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroAnio, setFiltroAnio] = useState("");

  useEffect(() => {
    obtenerCursos();
  }, []);

  const eliminarCurso = (id) => {
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
          await borrarCurso(id);
          Swal.fire("Eliminado", "El curso ha sido eliminado.", "success");
        } catch (error) {
          Swal.fire(
            "Error",
            error.message || "No se pudo eliminar el curso.",
            "error"
          );
        }
      }
    });
  };

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h2 className="my-5 disenoTitulo">Cursos</h2>

      <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
        <Form.Label className="m-0 p-2">
          <span className="fw-bold buscarUsuario">BUSCAR:</span>
        </Form.Label>
        <Form.Select
          className="w-25"
          value={filtroAnio}
          onChange={(e) => setFiltroAnio(e.target.value)}
        >
          <option value="">Todos los años</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </Form.Select>
      </Form.Group>

      <div className="my-2 d-flex justify-content-start">
        <CrearCurso></CrearCurso>
      </div>

      {cursos.length > 0 ? (
        <Table striped hover responsive className="rounded">
          <thead>
            <tr>
              <th className="tableMaterias fw-bold">Curso</th>
              <th className="tableMaterias fw-bold">Turno</th>
              <th className="tableMaterias fw-bold">Horarios</th>
              <th className="tableMaterias fw-bold">Alumnos</th>
              <th className="tableMaterias fw-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => {
              return (
                <tr key={curso.id}>
                  <td className="tableMaterias">
                    {curso.anio}° {curso.division}
                  </td>
                  <td className="tableMaterias">{curso.turno}</td>
                  <td className="tableMaterias">
                    <div className="d-flex justify-content-center">
                      <ListadoHorarios curso={curso}></ListadoHorarios>
                      <EditarHorarios curso={curso}></EditarHorarios>
                    </div>
                  </td>
                  <td className="tableMaterias">
                    <div className="d-flex justify-content-center">
                      <ListadoAlumnos curso={curso}></ListadoAlumnos>
                      <EditarAlumnos curso={curso}></EditarAlumnos>
                    </div>
                  </td>
                  <td className="tableMaterias ">
                    <div className="d-flex justify-content-center">
                      <Button
                        variant="outline-danger"
                        className="m-1 d-flex justify-content-center align-items-center flex-column"
                        onClick={() => eliminarCurso(curso.id)}
                      >
                        <MdDelete />
                      </Button>
                      <EditarCurso curso={curso}></EditarCurso>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>No se encontró ningún curso que coincida con los filtros.</p>
      )}
    </Container>
  );
};

export default Cursos;
