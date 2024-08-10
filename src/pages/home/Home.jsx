import { Button, Col, Form, Row } from "react-bootstrap";
import "./Home.css";
import home from "../../assets/imagenes/home.png";
import logo from "../../assets/imagenes/logo-sge-dark-circle.png";
import SeccionNovedades from "../docentes/SeccionNovedades";
import FormLogin from "./FormLogin";

const Home = () => {
  return (
    <>
      <div className="container-fluid">
        <article id="contenedorPadre" >
          <div id="cajaRoja" >
           <FormLogin></FormLogin>
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
