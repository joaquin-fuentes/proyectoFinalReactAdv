import { Button, Col, Form, Row } from "react-bootstrap";
import "./Home.css";
import home from "../../assets/imagenes/home.png";
import logo from "../../assets/imagenes/logo-sge-dark-circle.png";
import SeccionNovedades from "../docentes/SeccionNovedades";

const Home = () => {
  return (
    <>
      <div className="container-fluid">
        <article id="contenedorPadre">
          <div id="cajaRoja">
            <Form className="formularioLogin">
              <div>
                <div className="d-flex justify-content-center">
                  <img src={logo} alt="" width={200} />
                </div>
                <h2 className="mt-4 mb-4 text-center tituloForm">
                  Iniciar Sesión
                </h2>
              </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="tituloSecundario">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su email"
                  className="border border-dark"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="tituloSecundario">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  className="border border-dark"
                />
              </Form.Group>
              <div id="btnForm">
                <button type="submit" className="btnFormulario">
                  Ingresar
                </button>
              </div>
            </Form>
          </div>
        </article>
        <Row>
          <Col xs={12} lg={6}>
            {" "}
            <div className="parrafo">
              <div>
                <h1 className="tituloHome display-2 text-center text-light parrafo">
                  Bienvenidos a SGE
                </h1>
                <h2 className="text-center text-light tituloSecundario parrafo">
                  Sistema de Gestión Educativa
                </h2>
                <h3 className="text-center text-light tituloSecundario parrafo">
                  Sistema Académico
                </h3>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6} className="bgRosa">
            <div>
              <h1 className="tituloHome display-2 text-center text-light parrafo">
                Bienvenidos a SGE
              </h1>
              <h2 className="text-center text-light tituloSecundario parrafo">
                Sistema de Gestión Educativa
              </h2>
              <h3 className="text-center text-light tituloSecundario parrafo">
                Sistema Académico
              </h3>
            </div>
            <div id="caja-2">
              <h4 className="novedades">
                Explorar las Novedades de Nuestra Institución <br />
                <i className="bi bi-arrow-bar-down"></i>
              </h4>

              <SeccionNovedades></SeccionNovedades>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
