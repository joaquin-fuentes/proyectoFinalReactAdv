import { Container, Form, Table } from "react-bootstrap";
import "./Docentes.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ListadoMaterias = () => {
  return (
    <Container className="text-center px-md-5 py-md-2">
      <h4 className="mt-5 mb-3 titulo">MIS MATERIAS</h4>

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
          <tr className="">
            <th className="tableMaterias fw-bold">Materia</th>
            <th className="tableMaterias fw-bold">Año</th>
            <th className="tableMaterias fw-bold">División</th>
            <th className="tableMaterias fw-bold">Horario</th>
            <th className="tableMaterias fw-bold">Alumnos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°</td>
            <td className="tableMaterias">B</td>
            <td className="tableMaterias">Lunes 10:00 a 12:00</td>
            <td className="tableMaterias">
              Ver listado{" "}
              <button className="btn btn-outline-light">
                <i className="bi bi-box-arrow-up-right"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°</td>
            <td className="tableMaterias">B</td>
            <td className="tableMaterias">Lunes 10:00 a 12:00</td>
            <td className="tableMaterias">
              Ver listado{" "}
              <button className="btn btn-outline-light">
                <i className="bi bi-box-arrow-up-right"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°</td>
            <td className="tableMaterias">B</td>
            <td className="tableMaterias">Lunes 10:00 a 12:00</td>
            <td className="tableMaterias">
              Ver listado{" "}
              <button className="btn btn-outline-light">
                <i className="bi bi-box-arrow-up-right"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°</td>
            <td className="tableMaterias">B</td>
            <td className="tableMaterias">Lunes 10:00 a 12:00</td>
            <td className="tableMaterias">
              Ver listado{" "}
              <button className="btn btn-outline-light">
                <i className="bi bi-box-arrow-up-right"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°</td>
            <td className="tableMaterias">B</td>
            <td className="tableMaterias">Lunes 10:00 a 12:00</td>
            <td className="tableMaterias">
              Ver listado{" "}
              <button className="btn btn-outline-light">
                <i className="bi bi-box-arrow-up-right"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default ListadoMaterias;
