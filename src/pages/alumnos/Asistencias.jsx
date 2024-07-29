import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Alumnos.css";

const Asistencias = () => {
  return (
    <Container>
      <h4 className="text-center my-3">Asistencias</h4>
      <Row>
        <Col md={3}>
          <article className="border rounded p-4 mb-3 text-center">
            <p className="fw-bold">Total dias de clases</p>
            <p className="fs-1">150</p>
          </article>
        </Col>
        <Col md={3}>
          <article className="border rounded p-4 mb-3 text-center">
            <p className="fw-bold">Total inasistencias</p>
            <p className="fs-1">10</p>
          </article>
        </Col>
        <Col md={3}>
          <article className="border rounded p-4 mb-3 text-center">
            <p className="fw-bold">Inasisencias justificadas</p>
            <p className="fs-1">2</p>
          </article>
        </Col>
        <Col md={3}>
          <article className="border rounded  p-4 mb-3 d-flex flex-column align-items-center">
            <p className="me-5">Fechas inasistencias:</p>
            <ol>
              <li className="">26/07/2024</li>
              <li className="">26/07/2024</li>
              <li className="">26/07/2024 (justificada)</li>
              <li className="">26/07/2024 (justificada)</li>
              <li className="">26/07/2024</li>
              <li className="">26/07/2024</li>
              <li className="">26/07/2024</li>
              <li className="">26/07/2024</li>
              <li className="">26/07/2024</li>
              <li className="">26/07/2024</li>
            </ol>
          </article>
        </Col>
      </Row>
    </Container>
  );
};

export default Asistencias;
