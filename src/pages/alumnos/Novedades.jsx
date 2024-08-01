import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Alumnos.css";

const Novedades = () => {
  return (
    <Container className="p-md-4">
      <h4 className="mt-3 text-center titulo">Novedades</h4>
      <Row className="d-flex justify-content-center">
        <Col md={6} lg={4}>
          <article className="p-3 my-2 mx-1 bg-azulOscuro cardNovedad rounded text-light">
            <h6 className=" text-center">Fechas de examenes previos</h6>
            <div className="mt-4 mb-1">
              <img className="imgNovedad" src="https://i.pinimg.com/564x/86/16/12/861612d254f367b06b632fcc3c259ef8.jpg" alt="fechasExamenes" />
            </div>
          </article>
        </Col>
        <Col md={6} lg={4}>
          <article className="p-3 my-2 mx-1 bg-azulOscuro cardNovedad rounded text-light">
            <h6 className=" text-center">Semana del estudiante</h6>
            <div className="mt-4 mb-1">
              <img className="imgNovedad" src="https://i.pinimg.com/564x/e2/86/21/e2862199d91596ecb175f8cb27729995.jpg" alt="" />
            </div>
          </article>
        </Col>
        <Col md={6} lg={4}>
          <article className="p-3 my-2 mx-1 bg-azulOscuro cardNovedad rounded text-light">
            <h6 className=" text-center">Feriado largo septiembre</h6>
            <div className="mt-4 mb-1">
              <img className="imgNovedad" src="https://i.pinimg.com/564x/23/2c/8f/232c8fa820f08986346c087eb49b649d.jpg" alt="" />
            </div>
          </article>
        </Col>
        <Col md={6} lg={4}>
          <article className="p-3 my-2 mx-1 bg-azulOscuro cardNovedad rounded text-light">
            <h6 className=" text-center">Fechas de examenes previos</h6>
            <div className="mt-4 mb-1">
              <img className="imgNovedad" src="https://i.pinimg.com/564x/86/16/12/861612d254f367b06b632fcc3c259ef8.jpg" alt="fechasExamenes" />
            </div>
          </article>
        </Col>
        <Col md={6} lg={4}>
          <article className="p-3 my-2 mx-1 bg-azulOscuro cardNovedad rounded text-light">
            <h6 className=" text-center">Semana del estudiante</h6>
            <div className="mt-4 mb-1">
              <img className="imgNovedad" src="https://i.pinimg.com/564x/e2/86/21/e2862199d91596ecb175f8cb27729995.jpg" alt="" />
            </div>
          </article>
        </Col>
        <Col md={6} lg={4}>
          <article className="p-3 my-2 mx-1 bg-azulOscuro cardNovedad rounded text-light">
            <h6 className=" text-center">Feriado largo septiembre</h6>
            <div className="mt-4 mb-1">
              <img className="imgNovedad" src="https://i.pinimg.com/564x/23/2c/8f/232c8fa820f08986346c087eb49b649d.jpg" alt="" />
            </div>
          </article>
        </Col>
      </Row>
    </Container>
  );
};

export default Novedades;
