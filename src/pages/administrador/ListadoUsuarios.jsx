import { Container, Form, Table, Pagination } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import ModalCrear from "./ModalesUsuarios/ModalCrear";
import ModalEditar from "./ModalesUsuarios/ModalEditar";
import ModalInfo from "./ModalesUsuarios/ModalInfo";
import useUsuarios from "../../stores/Usuarios-Store";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Administrador.css";

const ListadoUsuarios = () => {
  const usuarios = useUsuarios((state) => state.usuarios || []);
  const getUsuarios = useUsuarios((state) => state.getUsuarios);
  const deleteUsuario = useUsuarios((state) => state.deleteUsuario);

  const [tabSeleccionada, setTabSeleccionada] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  useEffect(() => {
    getUsuarios();
  }, [getUsuarios]);

  const handleTabSeleccionada = (tab) => {
    setTabSeleccionada(tab);
    setPaginaActual(1);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value.toLowerCase());
    setPaginaActual(1);
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

  const indiceUltimoUsuario = paginaActual * usuariosPorPagina;
  const indicePrimertUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosActuales = filtrarUsuarios.slice(
    indicePrimertUsuario,
    indiceUltimoUsuario
  );
  const totalPaginas = Math.ceil(filtrarUsuarios.length / usuariosPorPagina);

  const handlePaginacionClick = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

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
      <h2 className="my-5 disenoTitulo">Usuarios</h2>

      <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
        <Form.Label className="m-0 p-2">
          <span className="fw-bold buscarUsuario">Buscar usuario:</span>
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
            active={tabSeleccionada === "Administrador"}
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
          {usuariosActuales.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No hay usuarios para mostrar
              </td>
            </tr>
          ) : (
            usuariosActuales.map((usuario) => (
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
      <Pagination className="justify-content-center mt-4">
        <Pagination.First
          onClick={() => handlePaginacionClick(1)}
          disabled={paginaActual === 1}
        />
        <Pagination.Prev
          onClick={() => handlePaginacionClick(paginaActual - 1)}
          disabled={paginaActual === 1}
        />
        {[...Array(totalPaginas)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === paginaActual}
            onClick={() => handlePaginacionClick(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePaginacionClick(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        />
        <Pagination.Last
          onClick={() => handlePaginacionClick(totalPaginas)}
          disabled={paginaActual === totalPaginas}
        />
      </Pagination>
    </Container>
  );
};

export default ListadoUsuarios;
