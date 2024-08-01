import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Alumnos.css";

const Asistencias = () => {
  return (
    <Container className="asistencias-container">
      <h4 className="text-center my-2 titulo">Asistencias</h4>
      <Row className="row-asistencias d-flex justify-content-center">
        <Col xs={12} md={6} lg={5}>
          <article className="mb-3 p-3 p-lg-1 asistencia-card text-center">
            <p className="asistencia-titulo">Total días de clases</p>
            <p className="asistencia-valor">150</p>
          </article>
          <article className="mb-3 p-3 p-lg-1 asistencia-card text-center">
            <p className="asistencia-titulo">Total inasistencias</p>
            <p className="asistencia-valor">10</p>
          </article>
          <article className="mb-3 p-3 p-lg-1 asistencia-card text-center">
            <p className="asistencia-titulo">Inasistencias justificadas</p>
            <p className="asistencia-valor">2</p>
          </article>
        </Col>
        <Col xs={12} md={6} lg={5}>
          <div className="d-flex justify-content-center ">
            <article className="mb-3 p-3 p-lg-1  asistencia-card  inasistencias-fechas text-center">
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
