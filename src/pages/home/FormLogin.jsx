import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import useAuth from "../../stores/Auth-Store";
import Swal from "sweetalert2";
import "./Home.css";
import logo from "../../assets/imagenes/logo-sge-dark-circle.png";

// Validación con Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Debe escribir un email válido")
    .required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

const FormLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data, { setSubmitting, setErrors }) => {
    console.log(data);
    try {
      const user = await login(data); // Llama a la función de login desde el store
      sessionStorage.setItem("usuario", JSON.stringify(user));
      
      // Mostrar mensaje de éxito con SweetAlert2
      Swal.fire({
        title: "Inicio de sesión exitoso",
        text: "Redirigiendo...",
        icon: "success",
        timer: 1000, // Tiempo en milisegundos antes de redirigir
        showConfirmButton: false, // Oculta el botón de confirmación
        willClose: () => {
          // Redirecciona según el rol después de que se cierra el SweetAlert
          if (user.rol === "alumno") {
            navigate("/alumnos/perfil");
          } else if (user.rol === "docente") {
            navigate("/docentes/perfil");
          } else if (user.rol === "administrador") {
            navigate("/administrador");
          }
        }
      });

    } catch (error) {
      setErrors({ server: "Credenciales incorrectas" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex justify-content-center">
        <img src={logo} alt="" width={200} />
      </div>
      <h2 className="mt-4 mb-4 text-center tituloForm">Iniciar Sesión</h2>

      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form noValidate onSubmit={handleSubmit} className="formularioLogin">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="tituloSecundario">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingrese su email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
                isValid={touched.email && !errors.email}
                className="border border-dark"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="tituloSecundario">Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
                isValid={touched.password && !errors.password}
                className="border border-dark"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {errors.server && (
              <div className="text-danger mb-3">{errors.server}</div>
            )}

            <Button
              type="submit"
              className="btnFormulario"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cargando..." : "Ingresar"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default FormLogin;