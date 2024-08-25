import { Container, Form, Table, Button } from "react-bootstrap";
import "./Docentes.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import useAlumnoStore from "../../stores/Alumnos-Store";
import useCursosStore from "../../stores/Cursos-Store";
import useDocenteStore from "../../stores/Docentes-Store";
import useAuth from "../../stores/Auth-Store";
import useMateriasStore from "../../stores/Materias-Store";
import EditarNotas from "./Modales/EditarNotas";

const ListadoAlumnos = () => {
  const { alumnos, obtenerAlumnos } = useAlumnoStore();
  const { cursos, obtenerCursos } = useCursosStore();
  const { docente, obtenerDocente } = useDocenteStore();
  const { materias, obtenerMaterias } = useMateriasStore();
  const { user } = useAuth();

  const [busqueda, setBusqueda] = useState("");
  const [filtroMateria, setFiltroMateria] = useState("");
  const [filtroAnio, setFiltroAnio] = useState("");
  const [filtroDivision, setFiltroDivision] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);

  const handleEditarClick = (materia, nota) => {
    setNotaSeleccionada({materia, nota});
    setShowModal(true);
  };

  useEffect(() => {
    obtenerDocente(user.id);
    obtenerAlumnos();
    obtenerCursos();
    obtenerMaterias();
  }, [obtenerDocente, obtenerAlumnos, obtenerCursos, obtenerMaterias, user.id]);

  const normalizarTexto = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const materiasDelDocente = materias.filter(
    (materia) => materia.docenteId === user.id
  );

  const alumnosFiltrados = alumnos.filter((alumno) => {
    const cursosDelAlumno = cursos.filter((curso) =>
      curso.alumnos.includes(alumno.id)
    );

    return cursosDelAlumno.some((curso) =>
      materiasDelDocente.some((materia) => materia.cursoId === curso.id)
    );
  });

  const alumnosFiltradosYOrdenados = alumnosFiltrados
    .filter((alumno) => {
      const curso = cursos.find((curso) => curso.alumnos.includes(alumno.id));
      const materiasDelCurso = materiasDelDocente.filter(
        (materia) => materia.cursoId === curso.id
      );

      const nombreCompleto = normalizarTexto(
        `${alumno.nombre} ${alumno.apellido}`
      ).toLowerCase();
      const busquedaNormalizada = normalizarTexto(busqueda).toLowerCase();

      return (
        (!busqueda || nombreCompleto.includes(busquedaNormalizada)) &&
        (!filtroMateria ||
          materiasDelCurso.some(
            (materia) => materia.nombre === filtroMateria
          )) &&
        (!filtroAnio || curso.anio === filtroAnio) &&
        (!filtroDivision || curso.division === filtroDivision)
      );
    })
    .sort((a, b) => {
      const cursoA = cursos.find((curso) => curso.alumnos.includes(a.id));
      const cursoB = cursos.find((curso) => curso.alumnos.includes(b.id));

      // Generar una clave de ordenación combinando año y división
      const keyA = `${cursoA.anio}-${cursoA.division}`;
      const keyB = `${cursoB.anio}-${cursoB.division}`;

      // Ordenar primero por curso (año y división), luego por apellido
      return keyA.localeCompare(keyB) || a.apellido.localeCompare(b.apellido);
    });

  return (
    <>
      <Container className="text-center px-md-5 py-md-2">
        <h4 className="my-5 titulo">MIS ALUMNOS</h4>

        <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
          <Form.Label className="m-0 p-2">
            <span className="fw-bold buscarAlumno">BUSCAR ALUMNO:</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del alumno"
            className="w-50"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </Form.Group>

        <div className="my-4">
          <Form.Label>
            <span className="fw-bold buscarAlumno">FILTRAR</span>
          </Form.Label>

          <div className="container">
            {" "}
            <div className="row">
              <div className="col">
                {" "}
                <Form.Label>
                  <span className="fw-bold buscarAlumno">MATERIAS</span>
                </Form.Label>
                <Form.Select
                  aria-label="Filtrar por materia"
                  value={filtroMateria}
                  onChange={(e) => setFiltroMateria(e.target.value)}
                >
                  <option value="">Todas</option>
                  {[...new Set(materiasDelDocente.map((m) => m.nombre))].map(
                    (materia, index) => (
                      <option key={index} value={materia}>
                        {materia}
                      </option>
                    )
                  )}
                </Form.Select>
              </div>
              <div className="col">
                {" "}
                <Form.Label>
                  <span className="fw-bold buscarAlumno">AÑO</span>
                </Form.Label>
                <Form.Select
                  aria-label="Filtrar por año"
                  value={filtroAnio}
                  onChange={(e) => setFiltroAnio(e.target.value)}
                >
                  <option value="">Todos</option>
                  {[...new Set(cursos.map((curso) => curso.anio))]
                    .sort()
                    .map((anio, index) => (
                      <option key={index} value={anio}>
                        {anio}
                      </option>
                    ))}
                </Form.Select>
              </div>
              <div className="col">
                {" "}
                <Form.Label>
                  <span className="fw-bold buscarAlumno">DIVISIÓN</span>
                </Form.Label>
                <Form.Select
                  aria-label="Filtrar por división"
                  value={filtroDivision}
                  onChange={(e) => setFiltroDivision(e.target.value)}
                >
                  <option value="">Todas</option>
                  {[...new Set(cursos.map((curso) => curso.division))]
                    .sort()
                    .map((division, index) => (
                      <option key={index} value={division}>
                        {division}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </div>
          </div>
        </div>

        <Table striped hover responsive className="mt-3 rounded">
          <thead>
            <tr>
              <th className="tableMaterias fw-bold">Nombre</th>
              <th className="tableMaterias fw-bold">Materia</th>
              <th className="tableMaterias fw-bold">Año</th>
              <th className="tableMaterias fw-bold">División</th>
              <th className="tableMaterias fw-bold">Asistencia</th>
              <th className="tableMaterias fw-bold">Evaluaciones</th>
              <th className="tableMaterias fw-bold">Nota final</th>
            </tr>
          </thead>
          <tbody>
            {alumnosFiltradosYOrdenados.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No hay alumnos para mostrar
                </td>
              </tr>
            ) : (
              alumnosFiltradosYOrdenados.map((alumno) => {
                const curso = cursos.find((curso) =>
                  curso.alumnos.includes(alumno.id)
                );
                const materiasDelCurso = materiasDelDocente.filter(
                  (materia) => materia.cursoId === curso.id
                );
                return (
                  <tr key={alumno.id}>
                    <td className="tableMaterias">
                      {alumno.apellido} {alumno.nombre}
                    </td>
                    <td className="tableMaterias">
                      {materiasDelCurso.map((materia) => (
                        <span key={materia.id}>{materia.nombre} </span>
                      ))}
                    </td>
                    <td className="tableMaterias">{curso?.anio}</td>
                    <td className="tableMaterias">{curso?.division}</td>
                    <td className="tableMaterias">100%</td>
                    <td className="tableMaterias">
                      {materiasDelCurso.map((materia) => {
                        const nota = materia.notas.find(
                          (nota) => nota.alumnoId === alumno.id
                        );
                        if (!nota) {
                          return (
                            <div key={materia.id}>
                              No hay notas disponibles. <br />
                            </div>
                          );
                        }
                        return (
                          <div key={materia.id}>
                            <strong>{materia.nombre}:</strong> <br />
                            Trimestre 1: {nota.trimestre1} <br />
                            Trimestre 2: {nota.trimestre2} <br />
                            Trimestre 3: {nota.trimestre3} <br />
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleEditarClick(materia, nota)}
                              className="mt-2"
                            >
                              <i className="bi bi-pencil-square iconoEditar"></i>{" "}
                              Editar
                            </Button>
                          </div>
                        );
                      })}
                    </td>
                    <td className="tableMaterias">
                      {materiasDelCurso.map((materia) => {
                        const nota = materia.notas.find(
                          (nota) => nota.alumnoId === alumno.id
                        );
                        return nota ? (
                          <div key={materia.id}>{nota.notaFinal}</div>
                        ) : (
                          <div key={materia.id}>N/A</div>
                        );
                      })}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </Container>
      <EditarNotas
        show={showModal}
        handleClose={() => setShowModal(false)}
        notaSeleccionada={notaSeleccionada}
      />
    </>
  );
};

export default ListadoAlumnos;
