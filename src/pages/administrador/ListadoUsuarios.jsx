import { Container, Form, Table } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Administrador.css";
import ModalCrear from "../../components/AdminComponents/ModalCrear";
import ModalEditar from "../../components/AdminComponents/ModalEditar";
import ModalInfo from "../../components/AdminComponents/ModalInfo";

const ListadoUsuarios = () => {
  return (
    <Container className="text-center px-md-5 py-md-2">
      <h4 className="my-5 titulo">Usuarios</h4>

      <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
        <Form.Label className="m-0 p-2">
          <span className="fw-bold buscarUsuario">BUSCAR:</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese un nombre"
          className="w-50"
        />
      </Form.Group>

      <div className="m-2 d-flex justify-content-start">
        <ModalCrear />
      </div>

      <Nav
        variant="tabs"
        defaultActiveKey="/home"
        className="mt-4 mb-1 tabsRoles"
      >
        <Nav.Item>
          <Nav.Link eventKey="link-1 tabRol">Todos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Docentes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">Alumnos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4">Admins</Nav.Link>
        </Nav.Item>
      </Nav>

      <Table striped hover responsive className="rounded">
        <thead>
          <tr>
            <th className="tableMaterias fw-bold">Nombre</th>
            <th className="tableMaterias fw-bold">Categoría</th>
            <th className="tableMaterias fw-bold">DNI</th>
            <th className="tableMaterias fw-bold">Correo</th>
            <th className="tableMaterias fw-bold">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableMaterias">Juan Pérez</td>
            <td className="tableMaterias">Administrador</td>
            <td className="tableMaterias">12345678</td>
            <td className="tableMaterias">juanperez@gmail.com</td>
            <td className="tableMaterias">
              {" "}
              <ModalInfo />
              <ModalEditar />
              <button className="btn">
                <i className="bi bi-trash3 iconoBorrar"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td className="tableMaterias">Juan Pérez</td>
            <td className="tableMaterias">Docente</td>
            <td className="tableMaterias">12345678</td>
            <td className="tableMaterias">juanperez@gmail.com</td>
            <td className="tableMaterias">
              {" "}
              <ModalInfo />
              <ModalEditar />
              <button className="btn">
                <i className="bi bi-trash3 iconoBorrar"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td className="tableMaterias">Juan Pérez</td>
            <td className="tableMaterias">Docente</td>
            <td className="tableMaterias">12345678</td>
            <td className="tableMaterias">juanperez@gmail.com</td>
            <td className="tableMaterias">
              {" "}
              <ModalInfo />
              <ModalEditar />
              <button className="btn">
                <i className="bi bi-trash3 iconoBorrar"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td className="tableMaterias">Juan Pérez</td>
            <td className="tableMaterias">Alumno</td>
            <td className="tableMaterias">12345678</td>
            <td className="tableMaterias">juanperez@gmail.com</td>
            <td className="tableMaterias">
              {" "}
              <ModalInfo />
              <ModalEditar />
              <button className="btn">
                <i className="bi bi-trash3 iconoBorrar"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td className="tableMaterias">Juan Pérez</td>
            <td className="tableMaterias">Alumno</td>
            <td className="tableMaterias">12345678</td>
            <td className="tableMaterias">juanperez@gmail.com</td>
            <td className="tableMaterias">
              {" "}
              <ModalInfo />
              <ModalEditar />
              <button className="btn">
                <i className="bi bi-trash3 iconoBorrar"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default ListadoUsuarios;
