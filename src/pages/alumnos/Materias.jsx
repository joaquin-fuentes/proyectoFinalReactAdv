import React, { useEffect, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import useAuth from "../../stores/Auth-Store";
import useCursosStore from "../../stores/Cursos-Store";
import useMateriasStore from "../../stores/Materias-Store";
import useDocenteStore from "../../stores/Docentes-Store";

const Materias = () => {
  const { user } = useAuth();
  const { cursos, obtenerCursos } = useCursosStore();
  const { obtenerMateriasPorIds, materiasCurso } = useMateriasStore();
  const { docentes, obtenerDocentes } = useDocenteStore();
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchCursosYMaterias = async () => {
      await obtenerCursos();
      await obtenerDocentes();

      const cursosFiltrados = cursos.filter((curso) =>
        curso.alumnos.some((alumnoID) => alumnoID === user.id)
      );

      const materiasIDs = cursosFiltrados.flatMap((curso) => curso.materias);
      if (materiasIDs.length > 0) {
        await obtenerMateriasPorIds(materiasIDs);
      }
    };

    fetchCursosYMaterias();
  }, [obtenerCursos, obtenerDocentes, obtenerMateriasPorIds, cursos, user.id]);

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  const materiasFiltradas = materiasCurso.filter((materia) =>
    materia.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const obtenerNombreDocente = (docenteId) => {
    const docente = docentes.find((doc) => doc.id === docenteId);
    return docente
      ? `${docente.nombre} ${docente.apellido}`
      : "Docente no encontrado";
  };

  const obtenerNotasAlumno = (materia) => {
    if (!materia.notas) {
      return {};
    }
    const notaAlumno = materia.notas.find((nota) => nota.alumnoId === user.id);
    return notaAlumno || {};
  };

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h4 className="my-3 titulo">Listado de materias en curso</h4>

      <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
        <Form.Label className="m-0 p-2">Buscar Materia:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre materia"
          className="w-50"
          value={busqueda}
          onChange={handleSearch}
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
          {materiasFiltradas.length > 0 ? (
            materiasFiltradas.map((materia, index) => {
              const notasAlumno = obtenerNotasAlumno(materia);
              return (
                <tr key={index}>
                  <td className="tableMaterias">{materia.nombre}</td>
                  <td className="tableMaterias">{materia.anio}°</td>
                  <td className="tableMaterias">
                    {obtenerNombreDocente(materia.docenteId)}
                  </td>
                  <td className="tableMaterias">
                    {notasAlumno.trimestre1 || "-"}
                  </td>
                  <td className="tableMaterias">
                    {notasAlumno.trimestre2 || "-"}
                  </td>
                  <td className="tableMaterias">
                    {notasAlumno.trimestre3 || "-"}
                  </td>
                  <td className="tableMaterias">
                    {notasAlumno.notaFinal || "-"}
                  </td>
                  <td
                    className={`tableMaterias ${
                      notasAlumno.notaFinal >= 6
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {notasAlumno.notaFinal >= 6 ? "Aprobado" : "Reprobado"}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8">No se encontraron materias.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Materias;
