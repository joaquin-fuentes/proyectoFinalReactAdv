import { Container, Form, Table } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Administrador.css";
import ModalCrear from "../../components/AdminComponents/ModalCrear";
import ModalEditar from "../../components/AdminComponents/ModalEditar";
import ModalInfo from "../../components/AdminComponents/ModalInfo";
import useUsuarios from "../../stores/Usuarios-Store";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ListadoUsuarios = () => {
  const usuarios = useUsuarios((state) => state.usuarios || []);
  const getUsuarios = useUsuarios((state) => state.getUsuarios);
  const deleteUsuario = useUsuarios((state) => state.deleteUsuario);

  const [tabSeleccionada, setTabSeleccionada] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    getUsuarios();
  }, [getUsuarios]);

  const handleTabSeleccionada = (tab) => {
    setTabSeleccionada(tab);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  const normalizarTexto = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filtrarUsuarios = usuarios.filter((usuario) => {
    const busquedaNormalizada = normalizarTexto(busqueda);
    const nombreNormalizado = normalizarTexto(usuario.nombre);
    const apellidoNormalizado = normalizarTexto(usuario.apellido);
    const categoriaSeleccionada =
      tabSeleccionada === "Todos" || usuario.rol === tabSeleccionada;
    const busquedaRealizada =
      nombreNormalizado.toLowerCase().includes(busquedaNormalizada) ||
      apellidoNormalizado.toLowerCase().includes(busquedaNormalizada);

    return categoriaSeleccionada && busquedaRealizada;
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#004b81",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (resultado) => {
      if (resultado.isConfirmed) {
        try {
          await deleteUsuario(id);
          Swal.fire({
            title: "¡Eliminado!",
            text: "El usuario ha sido eliminado.",
            icon: "success",
            confirmButtonColor: "#004b81",
            confirmButtonText: "Aceptar",
          });
        } catch (error) {
          Swal.fire({
            title: "Ocurrió un error",
            text: "No se pudo eliminar el usuario. Intenta nuevamente.",
            icon: "error",
            confirmButtonColor: "#004b81",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h4 className="my-5 titulo">USUARIOS</h4>

      <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
        <Form.Label className="m-0 p-2">
          <span className="fw-bold buscarUsuario">BUSCAR:</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese un nombre"
          className="w-50"
          value={busqueda}
          onChange={handleBusqueda}
        />
      </Form.Group>

      <div className="m-2 d-flex justify-content-start">
        <ModalCrear />
      </div>

      <Nav
        variant="tabs"
        defaultActiveKey="/home"
        className="mt-4 mb-1 tabsRoles"
        onSelect={(key) => handleTabSeleccionada(key)}
      >
        <Nav.Item>
          <Nav.Link eventKey="Todos" active={tabSeleccionada === "Todos"}>
            Todos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Docente" active={tabSeleccionada === "Docente"}>
            Docentes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Alumno" active={tabSeleccionada === "Alumno"}>
            Alumnos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Administrador"
            active={tabSeleccionada === "Admin"}
          >
            Admins
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Table striped hover responsive className="rounded">
        <thead>
          <tr>
            <th className="tableMaterias fw-bold">Apellido</th>
            <th className="tableMaterias fw-bold">Nombre</th>
            <th className="tableMaterias fw-bold">Categoría</th>
            <th className="tableMaterias fw-bold">DNI</th>
            <th className="tableMaterias fw-bold">Correo</th>
            <th className="tableMaterias fw-bold">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrarUsuarios.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No hay usuarios para mostrar
              </td>
            </tr>
          ) : (
            filtrarUsuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="tableMaterias">{usuario.apellido}</td>
                <td className="tableMaterias">{usuario.nombre}</td>
                <td className="tableMaterias">{usuario.rol}</td>
                <td className="tableMaterias">{usuario.dni}</td>
                <td className="tableMaterias">{usuario.email}</td>
                <td className="tableMaterias">
                  <ModalInfo usuario={usuario} />
                  <ModalEditar usuario={usuario} />
                  <button
                    className="btn"
                    onClick={() => handleDelete(usuario.id)}
                  >
                    <i className="bi bi-trash3 iconoBorrar"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListadoUsuarios;
