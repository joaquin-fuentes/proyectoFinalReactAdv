import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import useMateriasStore from "../../../stores/Materias-Store";
import Swal from "sweetalert2";
import { RiFileAddLine } from "react-icons/ri";
import useDocenteStore from "../../../stores/Docentes-Store";

const CrearMateria = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { crearMateria, verificarMateriaExistente } = useMateriasStore();
  const { docentes, obtenerDocentes } = useDocenteStore();

  useEffect(() => {
    obtenerDocentes();
  }, [obtenerDocentes]);

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es obligatorio"),
    anio: Yup.string().required("El año es obligatorio"),
    division: Yup.string().required("La división es obligatoria"),
    turno: Yup.string().required("El turno es obligatorio"),
  });

  // Valores iniciales del formulario
  const initialValues = {
    nombre: "",
    anio: "",
    division: "",
    turno: "",
    docenteId: "",
  };

  // Manejo del envío del formulario
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const existe = await verificarMateriaExistente(
        values.nombre,
        values.anio,
        values.division
      );
      if (existe) {
        Swal.fire({
          title: "Materia duplicada",
          text: "Ya existe una materia con este nombre, año, división y turno.",
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
        return; // Detener el proceso si la materia ya existe
      }
      const newData = {
        ...values,
        cursoId: "",
        notas: [
          {
            alumnoId: "",
            trimestre1: 0,
            trimestre2: 0,
            trimestre3: 0,
            notaFinal: 0,
          },
        ],
      };
      await crearMateria(newData); // Aquí puedes enviar los datos al store o hacer alguna otra acción
      handleClose(); // Cerrar el modal después del envío

      // Mostrar SweetAlert de éxito
      Swal.fire({
        title: "Materia creada",
        text: "La materia se ha creado con éxito.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      resetForm(); // Limpiar el formulario después de la creación
    } catch (error) {
      // Mostrar SweetAlert de error
      Swal.fire({
        title: "Error",
        text: error.message || "Algo salió mal al crear la materia.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="my-1 btn-crear d-flex justify-content-center align-items-center"
      >
        <RiFileAddLine className="me-2" />
        Nueva Materia
      </button>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-md">
        <Modal.Header closeButton>
          <Modal.Title>Crear Materia</Modal.Title>
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
                    placeholder="Ingrese el nombre de la materia"
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
                <Form.Group className="col-12 mb-3" controlId="formTurno">
                  <Form.Label>Turno</Form.Label>
                  <Field
                    as="select"
                    name="turno"
                    className={`form-control ${
                      touched.turno && errors.turno ? "is-invalid" : ""
                    }`}
                  >
                    <option value="">Seleccione un Turno</option>
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                  </Field>
                  <ErrorMessage
                    name="turno"
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
                    {docentes.map((docente) => {
                      return (
                        <option key={docente.id} value={docente.id}>
                          {docente.nombre} {docente.apellido}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    name="docente"
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
                  Crear
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CrearMateria;
