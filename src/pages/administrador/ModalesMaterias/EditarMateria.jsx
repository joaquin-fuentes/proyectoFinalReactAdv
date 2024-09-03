import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import useMateriasStore from "../../../stores/Materias-Store";
import useDocenteStore from "../../../stores/Docentes-Store";
import Swal from "sweetalert2";
import { RiEdit2Line } from "react-icons/ri";

const EditarMateria = ({ materia }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { actualizarMateria } = useMateriasStore();
  const { docentes, obtenerDocentes } = useDocenteStore();

  useEffect(() => {
    obtenerDocentes();
  }, [obtenerDocentes]);

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es obligatorio"),
    anio: Yup.string().required("El año es obligatorio"),
    division: Yup.string().required("La división es obligatoria"),
  });

  const initialValues = {
    nombre: materia.nombre || "",
    anio: materia.anio || "",
    division: materia.division || "",
    docenteId: materia.docenteId || "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await actualizarMateria(materia.id, values);
      handleClose();

      Swal.fire({
        title: "Materia editada",
        text: "La materia se ha editado con éxito.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      resetForm();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Algo salió mal al editar la materia.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn text-light">
        <RiEdit2Line />
      </button>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton>
          <Modal.Title>Editar Materia</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <FormikForm>
              <Modal.Body className="row">
                <Form.Group className="col-12 mb-3" controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Field
                    name="nombre"
                    type="text"
                    className={`form-control ${
                      touched.nombre && errors.nombre ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Group>

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

                <Form.Group className="col-12 mb-3" controlId="formDocente">
                  <Form.Label>Docente a Cargo</Form.Label>
                  <Field
                    as="select"
                    name="docenteId"
                    className={`form-control ${
                      touched.docenteId && errors.docenteId ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Seleccione un Docente</option>
                    {docentes.map((docente) => (
                      <option key={docente.id} value={docente.id}>
                        {docente.nombre} {docente.apellido}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="docenteId"
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
                  Guardar cambios
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default EditarMateria;
