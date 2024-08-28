import React, { useEffect, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import useAuth from "../../stores/Auth-Store";
import useCursosStore from "../../stores/Cursos-Store";
import useMateriasStore from "../../stores/Materias-Store";
import useDocenteStore from "../../stores/Docentes-Store";

const Materias = () => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  const { cursos, obtenerCursos } = useCursosStore(); // Obtener cursos del store
  const { obtenerMateriasPorIds, materiasCurso } = useMateriasStore(); // Obtener materias por IDs
  const { docentes, obtenerDocentes } = useDocenteStore(); // Obtener docentes del store
  const [busqueda, setBusqueda] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    const fetchCursosYMaterias = async () => {
      await obtenerCursos(); // Obtener los cursos del store
      await obtenerDocentes(); // Obtener la lista de docentes

      // Filtrar cursos donde el alumno está inscrito
      const cursosFiltrados = cursos.filter((curso) =>
        curso.alumnos.some((alumnoID) => alumnoID === user.id)
      );

      // Obtener los IDs de las materias de los cursos filtrados
      const materiasIDs = cursosFiltrados.flatMap((curso) => curso.materias);
      if (materiasIDs.length > 0) {
        // Obtener detalles de las materias usando sus IDs
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
      return {}; // Retornar un objeto vacío si no hay notas
    }
    const notaAlumno = materia.notas.find((nota) => nota.alumnoId === user.id);
    return notaAlumno || {}; // Retornar un objeto vacío si no encuentra la nota del alumno
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

      <section className="mt-4">
        <h6 className="fs-5 text-primary-emphasis">
          Listado Materias previas de año anterior (en caso de tener)
        </h6>
        <Table hover responsive className="my-3 rounded">
          <thead>
            <tr>
              <th className="tableMaterias">Materia</th>
              <th className="tableMaterias">Año</th>
              <th className="tableMaterias">Docente</th>
              <th className="tableMaterias">Estado</th>
            </tr>
          </thead>
          <tbody>{/* Lógica similar para materias previas */}</tbody>
        </Table>
      </section>
    </Container>
  );
};

export default Materias;
