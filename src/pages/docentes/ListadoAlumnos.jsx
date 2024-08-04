import { Container, Form, Table } from "react-bootstrap";
import "./Docentes.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ListadoAlumnos = () => {
  return (
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

      <Table striped hover responsive className="mt-3 rounded tablaAlumnos">
        <thead>
          <tr className="">
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
    </Container>
  );
};

export default ListadoAlumnos;
