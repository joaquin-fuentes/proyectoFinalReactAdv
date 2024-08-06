import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { FaRegMessage } from "react-icons/fa6";
import { RiContactsFill } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";

function Contacto() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    nombre: yup.string().required("El nombre es requerido"),
    email: yup
      .string()
      .required("El email es requerido")
      .email("Debe escribir un email válido"),
    mensaje: yup.string().required("El mensaje es requerido"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    // Aquí puedes enviar los datos a un servidor o realizar otra acción
    resetForm();
  };

  return (
    <Container className="mt-md-4">
      <h4 className="text-center my-2 titulo">Dejanos tu mensaje</h4>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          nombre: "",
          email: "",
          mensaje: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className="p-5 border rounded m-md-4 formularioContacto">
            <Row className="mb-3">
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>
                  <RiContactsFill className="me-1" />
                  Nombre
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={values.nombre}
                  onChange={handleChange}
                  isInvalid={touched.nombre && !!errors.nombre}
                  isValid={touched.nombre && !errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" className="mb-3" >
                <Form.Label>
                  <MdAlternateEmail className="me-1" />
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                  isValid={touched.email && !errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" className="mb-3">
                <Form.Label>
                  <FaRegMessage className="me-1" />
                  Mensaje
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="mensaje"
                  value={values.mensaje}
                  onChange={handleChange}
                  isInvalid={touched.mensaje && !!errors.mensaje}
                  isValid={touched.mensaje && !errors.mensaje}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mensaje}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Enviar</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Contacto;
