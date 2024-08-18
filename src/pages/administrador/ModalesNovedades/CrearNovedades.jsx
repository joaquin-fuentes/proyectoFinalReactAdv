import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import useNovedadesStore from "../../../stores/Novedades-Store";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "../Administrador.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CrearNovedades = () => {
  const [show, setShow] = useState(false);
  const addNovedad = useNovedadesStore((state) => state.addNovedad);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCerrar = () => {
    setShow(false);
    reset();
  };

  const handleShow = () => setShow(true);

  const onSubmit = async (data) => {
    try {
      const respuesta = await addNovedad(data);
      if (respuesta) {
        Swal.fire({
          title: "¡Listo!",
          text: "La novedad ha sido creada con éxito.",
          icon: "success",
          confirmButtonColor: "#004b81",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Ocurrió un error",
          text: "No se pudo crear la novedad. Intenta nuevamente.",
          icon: "error",
          confirmButtonColor: "#004b81",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Ocurrió un error",
        text: "No se pudo crear la novedad. Intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "#004b81",
        confirmButtonText: "Aceptar",
      });
    }
    handleCerrar();
  };

  return (
    <>
      <button className="p-2 rounded iconoCrear" onClick={handleShow}>
        <i className="bi bi-file-earmark-plus-fill"></i>
      </button>

      <Modal show={show} onHide={handleCerrar} className="modalUsuario">
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="titulo">Crear novedad</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="row">
                <div className="col">
                  <Form.Group className="mb-3" controlId="formTitulo">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresar el título"
                      {...register("titulo", {
                        required: "El título es obligatorio",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.titulo?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formImagen">
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresar la URL de la imagen"
                      {...register("url_img", {
                        required: "La URL de la imagen es obligatoria",
                        pattern: {
                          value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))$/i,
                          message: "Debes ingresar una URL de imagen válida",
                        },
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.url_img?.message}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formDestinatarios">
                    <Form.Label>Destinatarios</Form.Label>
                    <Form.Control
                      as="select"
                      {...register("destinatario", {
                        required: "Debes seleccionar una opción",
                      })}
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Alumnos">Alumnos</option>
                      <option value="Docentes">Docentes</option>
                      <option value="Todos">Todos</option>
                    </Form.Control>
                    <Form.Text className="text-danger">
                      {errors.destinatario?.message}
                    </Form.Text>
                  </Form.Group>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="button"
                onClick={handleCerrar}
                className="m-2 p-2 rounded btnCancelar"
              >
                Cancelar
              </button>
              <button type="submit" className="m-2 p-2 rounded btnGuardar">
                Guardar
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CrearNovedades;