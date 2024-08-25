import { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useMateriasStore from "../../../stores/Materias-Store";

const EditarNotas = ({ show, handleClose, notaSeleccionada }) => {
  if (!notaSeleccionada || !notaSeleccionada.nota) {
    return null;
  }

  const { materia, nota } = notaSeleccionada;

  const { editarNotasMateria } = useMateriasStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      trimestre1: nota.trimestre1 || "",
      trimestre2: nota.trimestre2 || "",
      trimestre3: nota.trimestre3 || "",
    },
  });

  useEffect(() => {
    if (notaSeleccionada) {
      console.log("notaSeleccionada:", notaSeleccionada);
      console.log("Materia seleccionada:", materia.id);
      console.log("Alumno seleccionado: ", notaSeleccionada.nota.alumnoId);
      setValue("trimestre1", nota.trimestre1);
      setValue("trimestre2", nota.trimestre2);
      setValue("trimestre3", nota.trimestre3);
    }
  }, [notaSeleccionada, setValue]);

  const onSubmit = async (data) => {
    console.log("Datos enviados:", data);
    console.log("Nota seleccionada:", notaSeleccionada);
    console.log("Materia seleccionada:", materia.id);
    console.log("Alumno seleccionado: ", notaSeleccionada.nota.alumnoId);

    const trimestre1 = parseFloat(data.trimestre1);
    const trimestre2 = parseFloat(data.trimestre2);
    const trimestre3 = parseFloat(data.trimestre3);
  
    const promedio = ((trimestre1 + trimestre2 + trimestre3) / 3).toFixed(2);

    const datosConPromedio = {
      trimestre1: trimestre1,
      trimestre2: trimestre2,
      trimestre3: trimestre3,
      notaFinal: parseFloat(promedio)
    };

    try {
      const respuesta = await editarNotasMateria(
        materia.id,
        notaSeleccionada.nota.alumnoId,
        datosConPromedio
      );
      console.log("respuesta de los datos editados: ", respuesta);
      if (respuesta) {
        Swal.fire({
          title: "¡Listo!",
          text: "La nota ha sido editada con éxito.",
          icon: "success",
          confirmButtonColor: "#004b81",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Ocurrió un error",
          text: "No se pudo editar la nota. Intenta nuevamente.",
          icon: "error",
          confirmButtonColor: "#004b81",
          confirmButtonText: "Aceptar",
        });
        console.log("no se edito la nota");
      }
    } catch (error) {
      Swal.fire({
        title: "Ocurrió un error",
        text: "No se pudo editar la nota. Intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "#004b81",
        confirmButtonText: "Aceptar",
      });
      console.error(error);
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Notas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="trimestre1">
            <Form.Label>Trimestre 1</Form.Label>
            <Form.Control
              type="number"
              {...register("trimestre1", { required: true })}
              isInvalid={!!errors.trimestre1}
            />
            <Form.Control.Feedback type="invalid">
              {errors.trimestre1 && "Este campo es requerido"}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="trimestre2">
            <Form.Label>Trimestre 2</Form.Label>
            <Form.Control
              type="number"
              {...register("trimestre2", { required: true })}
              isInvalid={!!errors.trimestre2}
            />
            <Form.Control.Feedback type="invalid">
              {errors.trimestre2 && "Este campo es requerido"}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="trimestre3">
            <Form.Label>Trimestre 3</Form.Label>
            <Form.Control
              type="number"
              {...register("trimestre3", { required: true })}
              isInvalid={!!errors.trimestre3}
            />
            <Form.Control.Feedback type="invalid">
              {errors.trimestre3 && "Este campo es requerido"}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditarNotas;
