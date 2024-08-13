import React, { useEffect, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import useAuth from "../../stores/Auth-Store";
import useCursosStore from "../../stores/Cursos-Store";

const Materias = () => {
  const { user } = useAuth();
  const { cursos, obtenerCursos } = useCursosStore();
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      await obtenerCursos();
      const cursosFiltrados = cursos.filter((curso) =>
        curso.alumnos.some((alumno) => alumno.alumnoID === user.id)
      );
      const materiasFiltradas = cursosFiltrados.flatMap(
        (curso) => curso.materias
      );
      setMaterias(materiasFiltradas);
    };

    fetchCursos();
  }, [obtenerCursos, cursos, user.id]);

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h4 className="my-3 titulo">Listado de materias en curso</h4>

      <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
        <Form.Label className="m-0 p-2">Buscar Materia:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre materia"
          className="w-50"
        />
      </Form.Group>

      <Table striped hover responsive className="mt-3 rounded">
        <thead>
          <tr>
            <th className="tableMaterias fw-bold">Materia</th>
            <th className="tableMaterias fw-bold">Año</th>
            <th className="tableMaterias fw-bold">Docente</th>
            <th className="tableMaterias fw-bold">1er trimestre</th>
            <th className="tableMaterias fw-bold">2do trimestre</th>
            <th className="tableMaterias fw-bold">3er trimestre</th>
            <th className="tableMaterias fw-bold">Nota Final</th>
            <th className="tableMaterias fw-bold">Estado</th>
          </tr>
        </thead>
        <tbody>
          {materias.length > 0 ? (
            materias.map((materia, index) => (
              <tr key={index}>
                <td className="tableMaterias">{materia.nombre}</td>
                <td className="tableMaterias">{materia.anio}°</td>
                <td className="tableMaterias">{materia.docente}Docente a cargo</td>
                <td className="tableMaterias">{materia.trimestre1}</td>
                <td className="tableMaterias">{materia.trimestre2}</td>
                <td className="tableMaterias">{materia.trimestre3}</td>
                <td className="tableMaterias">{materia.notaFinal}</td>
                <td
                  className={`tableMaterias ${
                    materia.estado === "Aprobado"
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {materia.estado}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No se encontraron materias.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <section className="mt-4">
        <h6 className="fs-5 text-primary-emphasis">
          Listado Materias previas de año anterior (en caso de tener)
        </h6>
        <Table hover responsive className="my-3 rounded ">
          <thead>
            <tr>
              <th className="tableMaterias">Materia</th>
              <th className="tableMaterias">Año</th>
              <th className="tableMaterias">Docente</th>
              <th className="tableMaterias">Estado</th>
            </tr>
          </thead>
          <tbody>{/* Similar logic for previas */}</tbody>
        </Table>
      </section>
    </Container>
  );
};

export default Materias;
