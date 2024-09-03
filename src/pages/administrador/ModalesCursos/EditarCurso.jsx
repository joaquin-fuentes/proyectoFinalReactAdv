import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import useCursosStore from "../../../stores/Cursos-Store";

const EditarCurso = ({ curso }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { actualizarCurso } = useCursosStore();

  const validationSchema = Yup.object().shape({
    anio: Yup.string().required("El año es obligatorio"),
    division: Yup.string().required("La división es obligatoria"),
    turno: Yup.string().required("El turno es obligatorio"),
  });

  const initialValues = {
    anio: curso.anio || "",
    division: curso.division || "",
    turno: curso.turno || "",
  };

  const handleSubmit = async (values) => {
    const cursoEditado = {
      ...curso,
      anio: values.anio,
      division: values.division,
      turno: values.turno,
    };

    try {
      await actualizarCurso(curso.id, cursoEditado);
      handleClose(); 

      Swal.fire({
        title: "Curso actualizado",
        text: "El curso se ha actualizado con éxito.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Algo salió mal al actualizar el curso.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant="outline-warning"
        className="m-1 d-flex justify-content-center align-items-center flex-column"
      >
        <FaEdit />
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton>
          <Modal.Title>Editar Curso</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <FormikForm>
              <Modal.Body className="row">
                <Form.Group className="col-12 mb-3" controlId="formAnio">
                  <Form.Label>Año</Form.Label>
                  <Field
                    as="select"
                    name="anio"
                    className={`form-control ${
                      touched.anio && errors.anio ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Seleccione un año</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </Field>
                  <ErrorMessage
                    name="anio"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Form.Group className="col-12 mb-3" controlId="formDivision">
                  <Form.Label>División</Form.Label>
                  <Field
                    as="select"
                    name="division"
                    className={`form-control ${
                      touched.division && errors.division ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Seleccione una división</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </Field>
                  <ErrorMessage
                    name="division"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
                <Form.Group className="col-12 mb-3" controlId="formTurno">
                  <Form.Label>Turno</Form.Label>
                  <Field
                    as="select"
                    name="turno"
                    className={`form-control ${
                      touched.turno && errors.turno ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Seleccione un turno</option>
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                  </Field>
                  <ErrorMessage
                    name="turno"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar Cambios
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditarCurso;
