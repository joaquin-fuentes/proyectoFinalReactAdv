import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Alumnos.css";

const Asistencias = () => {
  return (
    <Container className="asistencias-container">
      <h4 className="text-center my-2 titulo">Asistencias</h4>
      <Row className="row-asistencias d-flex justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <article className="mb-3 p-3 p-lg-2 asistencia-card text-center">
            <p className=" text-light my-2 my-lg-1">Total días de clases</p>
            <p className="fs-1 text-light my-2 my-lg-1">150</p>
          </article>
          <article className="mb-3 p-3 p-lg-2 asistencia-card text-center">
            <p className=" text-light my-2 my-lg-1">Total inasistencias</p>
            <p className="fs-1 text-light my-2 my-lg-1">10</p>
          </article>
          <article className="mb-3 p-3 p-lg-2 asistencia-card text-center">
            <p className=" text-light my-2 my-lg-1">Inasistencias justificadas</p>
            <p className="fs-1 text-light my-2 my-lg-1">2</p>
          </article>
        </Col>
        <Col xs={12} md={6} lg={5}>
          <div className="d-flex justify-content-center ">
            <article className="mb-3 p-3 p-lg-2  asistencia-card  inasistencias-fechas text-center">
              <p className="fechas-titulo">Fechas inasistencias:</p>
              <ol>
                <li>26/07/2024</li>
                <li>26/07/2024</li>
                <li>26/07/2024 (justificada)</li>
                <li>26/07/2024 (justificada)</li>
                <li>26/07/2024</li>
                <li>26/07/2024</li>
                <li>26/07/2024</li>
                <li>26/07/2024</li>
                <li>26/07/2024</li>
                <li>26/07/2024</li>
              </ol>
            </article>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Asistencias;
