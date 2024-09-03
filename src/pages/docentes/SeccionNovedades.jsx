import { Col, Container, Row } from "react-bootstrap";
import "./Docentes.css";
import useNovedadesStore from "../../stores/Novedades-Store.jsx";
import { useEffect } from "react";

const SeccionNovedades = () => {
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
  const novedadesDocente = novedades.filter(
    (novedad) => novedad.destinatario != "Alumnos"
  );

  return (
    <Container className="p-md-4 fuenteNovedades">
      <h4 className="my-5 text-center titulo">NOVEDADES</h4>
      <Row className="d-flex justify-content-center">
        {novedadesDocente.map((novedad) => (
          <Col md={6} lg={4} key={novedad.id}>
            <article className="p-3 my-2 mx-1 bg-azulOscuro cardNovedad rounded text-light">
              <h6 className="text-center">{novedad.titulo}</h6>
              <div className="mt-4 mb-1">
                <img
                  className="imgNovedad"
                  src={novedad.url_img}
                  alt={"imagen de "+novedad.titulo}
                />
              </div>
            </article>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SeccionNovedades;
