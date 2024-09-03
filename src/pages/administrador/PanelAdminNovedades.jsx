import React, { useEffect } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import useNovedadesStore from '../../stores/Novedades-Store.jsx';
import CrearNovedades from './ModalesNovedades/CrearNovedades.jsx';
import EditarNovedades from './ModalesNovedades/EditarNovedades.jsx';
import useFilterByTitle from '../../hooks/useFilterByTitle.js';
import useSweetAlert from '../../hooks/useSweetAlert.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Administrador.css';

const PanelAdminNovedades = () => {
  const novedades = useNovedadesStore((state) => state.novedades);
  const loading = useNovedadesStore((state) => state.loading);
  const error = useNovedadesStore((state) => state.error);
  const getNovedades = useNovedadesStore((state) => state.getNovedades);
  const deleteNovedad = useNovedadesStore((state) => state.deleteNovedad);

  const { filterNovedades, setTitleFilter } = useFilterByTitle(novedades);

  const { showAlert, showConfirmation } = useSweetAlert();

  useEffect(() => {
    getNovedades();
  }, [getNovedades]);

  if (loading) {
    return (
      <section className="vh-100 d-flex flex-column justify-content-center">
        <div className="spinner"></div>
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

  const handleDelete = async (id) => {
    const result = await showConfirmation("¿Está seguro?", "Esta acción no se puede deshacer.");
    if (result.isConfirmed) {
      try {
        await deleteNovedad(id);
        await showAlert('success', "¡Eliminada!", "La novedad ha sido eliminada.");
      } catch (error) {
        await showAlert('error', "Ocurrió un error", "No se pudo eliminar la novedad. Intenta nuevamente.");
      }
    }
  };

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h2 className="disenoTitulo my-5">Novedades</h2>

      <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
        <Form.Label className="m-0 p-2">
          <span className="fw-bold buscarUsuario">Buscar novedad:</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese un título"
          className="w-50"
          onChange={(e) => setTitleFilter(e.target.value)}
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
          {filterNovedades.map((novedad) => (
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