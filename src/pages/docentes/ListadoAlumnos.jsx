import { Container, Form, Table } from "react-bootstrap";
import "./Docentes.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";
import useAlumnoStore from "../../stores/Alumnos-Store";
import useCursosStore from "../../stores/Cursos-Store";
import useDocenteStore from "../../stores/Docentes-Store";
import useAuth from "../../stores/Auth-Store";
import useMateriasStore from "../../stores/Materias-Store";

const ListadoAlumnos = () => {
  const { alumnos, obtenerAlumnos } = useAlumnoStore();
  const { cursos, obtenerCursos } = useCursosStore();
  const { docente, obtenerDocente } = useDocenteStore();
  const { materias, obtenerMaterias } = useMateriasStore();
  const { user } = useAuth();

  useEffect(() => {
    obtenerDocente(user.id);
    obtenerAlumnos();
    obtenerCursos();
    obtenerMaterias();
  }, [obtenerDocente, obtenerAlumnos, obtenerCursos, obtenerMaterias, user.id]);

  // const alumnosFiltrados = alumnos.filter((alumno) => {
  //   // docente.cursos?.includes(alumno.cursoId)
  //   // const curso = cursos.find(curso => curso.alumnos.includes(alumno.id))
  //   // if(!curso) return false
  // });

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
  }).sort((a, b) => {
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
                <Form.Select aria-label="Default select example">
                  <option>Materia</option>
                  <option value="Matemáticas">Matemáticas</option>
                  <option value="Física">Física</option>
                  <option value="Química">Química</option>
                </Form.Select>
              </div>
              <div className="col">
                {" "}
                <Form.Select aria-label="Default select example">
                  <option>Año</option>
                  <option value="1">1°</option>
                  <option value="2">2°</option>
                  <option value="3">3°</option>
                </Form.Select>
              </div>
              <div className="col">
                {" "}
                <Form.Select aria-label="Default select example">
                  <option>División</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
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
            {alumnosFiltrados.map((alumno) => {
              const curso = cursos.find((curso) =>
                curso.alumnos.includes(alumno.id)
              );
              const materiasDelCurso = materiasDelDocente.filter(
                (materia) => materia.cursoId === curso.id
              );
              const notas = materiasDelCurso.reduce((acc, materia) => {
                const nota = materia.notas.find(
                  (nota) => nota.alumnoId === alumno.id
                );
                if (nota) {
                  acc.push(nota);
                }
                return acc;
              }, []);

              return (
                <tr key={alumno.id}>
                  <td className="tableMaterias">{alumno.apellido} {alumno.nombre}</td>
                  <td className="tableMaterias">
                    {materiasDelCurso.map((materia) => (
                      <span key={materia.id}>{materia.nombre} </span>
                    ))}
                  </td>
                  <td className="tableMaterias">{curso?.anio}</td>
                  <td className="tableMaterias">{curso?.division}</td>
                  <td className="tableMaterias">100%</td>
                  <td className="tableMaterias">
                    {notas.map((nota) => (
                      <div key={nota.alumnoId}>
                        Trimestre 1: {nota.trimestre1} <br />
                        Trimestre 2: {nota.trimestre2} <br />
                        Trimestre 3: {nota.trimestre3} <br />
                      </div>
                    ))}
                    <button className="btn">
                      <i className="bi bi-pencil-square iconoEditar"></i>
                    </button>
                  </td>
                  <td className="tableMaterias">
                    {notas.map((nota) => nota.notaFinal).join(", ") || "N/A"}{" "}
                    {/* {notas.map((nota) => nota.notaFinal)} */}
                    {/* <button className="btn">
                      <i className="bi bi-pencil-square iconoEditar"></i>
                    </button> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
          {/* <tbody>
            {alumnosFiltrados.map((alumno) => {
              const curso = cursos.find((curso) =>
                curso.alumnos.includes(alumno.id)
              );
              const materias = curso?.materias || [];
              return (
                <tr key={alumno.id}>
                  <td className="tableMaterias">{alumno.nombre}</td>
                  <td className="tableMaterias">
                    {materias.map((materiaId) => (
                      <span key={materiaId}>{materiaId} </span>
                    ))}
                  </td>
                  <td className="tableMaterias">{curso?.anio}</td>
                  <td className="tableMaterias">{curso?.division}</td>
                  <td className="tableMaterias">100%</td>
                  <td className="tableMaterias">
                    {alumno.evaluaciones?.join("-") || "N/A"}{" "}
                    <button className="btn">
                      <i className="bi bi-pencil-square iconoEditar"></i>
                    </button>
                  </td>
                  <td className="tableMaterias">
                    {alumno.notaFinal || "N/A"}{" "}
                    <button className="btn">
                      <i className="bi bi-pencil-square iconoEditar"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody> */}
          {/* <tbody>
          {alumnosFiltrados.map((alumno) => (
            <tr key={alumno.id}>
              <td className="tableMaterias">{alumno.nombre}</td>
              <td className="tableMaterias">
                {cursos.find((curso) => curso.id === alumno.cursoId)?.nombre}
              </td>
              <td className="tableMaterias">{alumno.anio}</td>
              <td className="tableMaterias">{alumno.division}</td>
              <td className="tableMaterias">100%</td>
              <td className="tableMaterias">
                {alumno.evaluaciones.join("-")}{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
              <td className="tableMaterias">
                {alumno.notaFinal}{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}
        </Table>
      </Container>

      {/* <Container className="text-center px-md-5 py-md-2">
        <h4 className="my-5 titulo">MIS ALUMNOS</h4>

        <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
          <Form.Label className="m-0 p-2">
            <span className="fw-bold buscarAlumno">BUSCAR ALUMNO:</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del alumno"
            className="w-50"
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
                <Form.Select aria-label="Default select example">
                  <option>Materia</option>
                  <option value="Matemáticas">Matemáticas</option>
                  <option value="Física">Física</option>
                  <option value="Química">Química</option>
                </Form.Select>
              </div>
              <div className="col">
                {" "}
                <Form.Select aria-label="Default select example">
                  <option>Año</option>
                  <option value="1°">1°</option>
                  <option value="2°">2°</option>
                  <option value="3°">3°</option>
                </Form.Select>
              </div>
              <div className="col">
                {" "}
                <Form.Select aria-label="Default select example">
                  <option>División</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
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
            <tr>
              <td className="tableMaterias">Juan Pérez</td>
              <td className="tableMaterias">Física</td>
              <td className="tableMaterias">1°</td>
              <td className="tableMaterias">A</td>
              <td className="tableMaterias">100%</td>
              <td className="tableMaterias">
                10-10-10{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
              <td className="tableMaterias">
                10{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td className="tableMaterias">Juan Pérez</td>
              <td className="tableMaterias">Física</td>
              <td className="tableMaterias">1°</td>
              <td className="tableMaterias">A</td>
              <td className="tableMaterias">100%</td>
              <td className="tableMaterias">
                10-10-10{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
              <td className="tableMaterias">
                10{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td className="tableMaterias">Juan Pérez</td>
              <td className="tableMaterias">Física</td>
              <td className="tableMaterias">1°</td>
              <td className="tableMaterias">A</td>
              <td className="tableMaterias">100%</td>
              <td className="tableMaterias">
                10-10-10{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
              <td className="tableMaterias">
                10{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td className="tableMaterias">Juan Pérez</td>
              <td className="tableMaterias">Física</td>
              <td className="tableMaterias">1°</td>
              <td className="tableMaterias">A</td>
              <td className="tableMaterias">100%</td>
              <td className="tableMaterias">
                10-10-10{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
              <td className="tableMaterias">
                10{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td className="tableMaterias">Juan Pérez</td>
              <td className="tableMaterias">Física</td>
              <td className="tableMaterias">1°</td>
              <td className="tableMaterias">A</td>
              <td className="tableMaterias">100%</td>
              <td className="tableMaterias">
                10-10-10{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
              <td className="tableMaterias">
                10{" "}
                <button className="btn">
                  <i className="bi bi-pencil-square iconoEditar"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container> */}
    </>
  );
};

export default ListadoAlumnos;
