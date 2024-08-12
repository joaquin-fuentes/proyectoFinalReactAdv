import React, { useEffect } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import useNovedadesStore from '../../stores/Novedades-Store.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Administrador.css';

const PanelAdminNovedades = () => {

  const novedades = useNovedadesStore((state) => state.novedades);
  const loading = useNovedadesStore((state) => state.loading);
  const error = useNovedadesStore((state) => state.error);
  const getNovedades = useNovedadesStore((state) => state.getNovedades);

  useEffect(() => {
    getNovedades();
  }, [getNovedades]);

  if (loading) {
    return (
      <section className="vh-100 d-flex flex-column justify-content-center">
        <p className="text-light">Cargando novedades..</p>
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

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h4 className="my-5 titulo">Novedades</h4>

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
        {/* <ModalCrear /> */}
      </div>

      <Table striped hover responsive className="rounded">
        <thead>
          <tr>
            <th className="tableMaterias fw-bold">Título</th>
            <th className="tableMaterias fw-bold">Url de la Imagen</th>
            <th className="tableMaterias fw-bold">Destinatario</th>
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
                {" "}
                {/* <ModalInfo />
              <ModalEditar /> */}
                <button className="btn">
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