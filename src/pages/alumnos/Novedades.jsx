import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Alumnos.css";

const Novedades = () => {
  return (
    <Container>
      <h4 className="mt-3 text-center">Novedades</h4>
      <Row>
        <Col md={6}>
          <article className="card p-3 my-2 mx-1">
            <h6>Fechas de examenes previos</h6>
            <p>Imagen con las fechas de los examenes</p>
          </article>
        </Col>
        <Col md={6}>
          <article className="card p-3 my-2 mx-1">
            <h6>Semana del estudiante</h6>
            <p>informacion sobre semana del estudiante</p>
          </article>
        </Col>
        <Col md={6}>
          <article className="card p-3 my-2 mx-1">
            <h6>Feriado largo septiembre</h6>
            <p>Informacion sobre dias sin clases el fin de semana largo</p>
          </article>
        </Col>
      </Row>
    </Container>
  );
};

export default Novedades;
