import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../../pages/administrador/Administrador.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useForm } from "react-hook-form";
import useUsuarios from "../../stores/Usuarios-Store";
import Swal from "sweetalert2";

const ModalEditar = ({ usuario }) => {
  const [show, setShow] = useState(false);
  const { updateUsuario } = useUsuarios();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (usuario) {
      setValue("rol", usuario.rol);
      setValue("apellido", usuario.apellido);
      setValue("nombre", usuario.nombre);
      setValue("dni", usuario.dni);
      setValue("telefono", usuario.telefono);
      setValue("direccion", usuario.direccion);
      setValue("email", usuario.email);
      setValue("password", usuario.password);
      setValue("passwordConfirm", usuario.passwordConfirm);
    }
  }, [usuario, setValue]);

  const onSubmit = async (data) => {
    try {
      const respuesta = await updateUsuario(usuario.id, data);
      if (respuesta) {
        Swal.fire({
          title: "¡Listo!",
          text: "El usuario ha sido editado con éxito.",
          icon: "success",
          confirmButtonColor: "#004b81",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Ocurrió un error",
          text: "No se pudo editar el usuario. Intenta nuevamente.",
          icon: "error",
          confirmButtonColor: "#004b81",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Ocurrió un error",
        text: "No se pudo editar el usuario. Intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "#004b81",
        confirmButtonText: "Aceptar",
      });
    }
    handleClose();
  };

  const password = watch("password");

  return (
    <>
      <button className="btn" onClick={handleShow}>
        <i className="bi bi-pencil-square iconoEditar"></i>
      </button>

      <Modal show={show} onHide={handleClose} className="modalUsuario">
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="titulo">EDITAR USUARIO</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="row">
                <div className="col">
                  {" "}
                  <Form.Group className="mb-3" controlId="formRol">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select
                      aria-label="Select categoria"
                      {...register("rol", {
                        required: "La categoría es obligatoria",
                      })}
                    >
                      <option value="">Seleccione una categoría</option>
                      <option value="Docente">Docente</option>
                      <option value="Alumno">Alumno</option>
                      <option value="Administrador">Administrador</option>
                    </Form.Select>
                    <Form.Text className="text-danger">
                      {errors.rol?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresar apellido"
                      {...register("apellido", {
                        required: "El apellido es obligatorio",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.apellido?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresar nombre"
                      {...register("nombre", {
                        required: "El nombre es obligatorio",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.nombre?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDNI">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresar DNI"
                      {...register("dni", {
                        required: "El DNI es obligatorio",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.dni?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formTelefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="3865123456"
                      {...register("telefono", {
                        required: "El teléfono es obligatorio",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.telefono?.message}
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group className="mb-3" controlId="formDireccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Calle 123"
                      {...register("direccion", {
                        required: "La dirección es obligatoria",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.direccion?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="ejemplo@gmail.com"
                      {...register("email", {
                        required: "El email es obligatorio",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.email?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingresar contraseña"
                      {...register("password", {
                        required: "Contraseña obligatoria",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.password?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPasswordConfirm">
                    <Form.Label>Confirmar</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repetir contraseña"
                      {...register("passwordConfirm", {
                        required: "Confirmación de contraseña obligatoria",
                        validate: (value) =>
                          value === password || "Las contraseñas no coinciden",
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.passwordConfirm?.message}
                    </Form.Text>
                  </Form.Group>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="button"
                onClick={handleClose}
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

export default ModalEditar;
