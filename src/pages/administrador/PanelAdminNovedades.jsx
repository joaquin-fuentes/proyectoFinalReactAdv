import React, { useEffect } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import useNovedadesStore from '../../stores/Novedades-Store.jsx';
import Swal from "sweetalert2";
import CrearNovedades from './ModalesNovedades/CrearNovedades.jsx';
import EditarNovedades from './ModalesNovedades/EditarNovedades.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Administrador.css';

const PanelAdminNovedades = () => {

  const novedades = useNovedadesStore((state) => state.novedades);
  const loading = useNovedadesStore((state) => state.loading);
  const error = useNovedadesStore((state) => state.error);
  const getNovedades = useNovedadesStore((state) => state.getNovedades);
  const deleteNovedad = useNovedadesStore((state) => state.deleteNovedad);

  useEffect(() => {
    getNovedades();
  }, [getNovedades]);

  if (loading) {
    return (
      <section className="vh-100 d-flex flex-column justify-content-center">
        <div class="spinner"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="vh-100 d-flex flex-column justify-content-center">
        <p className="text-light">Error: {error}</p>
      </section>
    );
  }

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
          await deleteNovedad(id);
          Swal.fire({
            title: "¡Eliminada!",
            text: "La novedad ha sido eliminada.",
            icon: "success",
            confirmButtonColor: "#004b81",
            confirmButtonText: "Aceptar",
          });
        } catch (error) {
          Swal.fire({
            title: "Ocurrió un error",
            text: "No se pudo eliminar la novedad. Intenta nuevamente.",
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
      <h2 class="disenoTitulo my-5">Novedades</h2>

      <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
        <Form.Label className="m-0 p-2">
          <span className="fw-bold buscarUsuario">Buscar novedades:</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese un título"
          className="w-50"
        />
      </Form.Group>

      <div className="m-2 d-flex justify-content-start">
        <CrearNovedades />
      </div>

      <Table striped hover responsive className="rounded">
        <thead>
          <tr>
            <th className="tableMaterias fw-bold">Título</th>
            <th className="tableMaterias fw-bold">Imagen</th>
            <th className="tableMaterias fw-bold">Destinatarios</th>
            <th className="tableMaterias fw-bold">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {novedades.map((novedad) => (
            <tr key={novedad.id}>
              <td className="tableMaterias">{novedad.titulo}</td>
              <td className="tableMaterias">
                <img src={novedad.url_img} alt={novedad.titulo} style={{ width: '100px' }} />
              </td>
              <td className="tableMaterias">{novedad.destinatario}</td>
              <td className="tableMaterias">
                <EditarNovedades novedad={novedad} />
                <button
                  className="btn"
                  onClick={() => handleDelete(novedad.id)}
                >
                  <i className="bi bi-trash3 iconoBorrar"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PanelAdminNovedades;