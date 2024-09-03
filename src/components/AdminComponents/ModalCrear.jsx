import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../../pages/administrador/Administrador.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import useUsuarios from "../../stores/Usuarios-Store";
import { useForm } from "react-hook-form";
import useSweetAlert from "../../hooks/useSweetAlert";

const ModalCrear = () => {
  const [show, setShow] = useState(false);
  const { createUsuario } = useUsuarios();
  const { showAlert } = useSweetAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const handleShow = () => setShow(true);

  const onSubmit = async (data) => {
    try {
      const respuesta = await createUsuario(data);
      if (respuesta) {
        await showAlert("success", "¡Listo!", "El usuario ha sido creado con éxito.");
      } else {
        await showAlert("error", "Ocurrió un error", "No se pudo crear el usuario. Intenta nuevamente.");
      }
    } catch (error) {
      await showAlert("error", "Ocurrió un error", "No se pudo crear el usuario. Intenta nuevamente.");
    }
    handleClose();
  };

  const password = watch("password");

  return (
    <>
      <button className="p-2 rounded iconoCrear" onClick={handleShow}>
        <i className="bi bi-file-earmark-plus-fill p-1"></i>
        Nuevo usuario
      </button>

      <Modal show={show} onHide={handleClose} className="modalUsuario">
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="titulo">CREAR USUARIO</span>{" "}
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
                        minLength: {
                          value: 3,
                          message:
                            "Ingrese un apellido con un mínimo de 3 caracteres",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "El apellido no puede tener más de 50 caracteres",
                        },
                        pattern: {
                          value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/i,
                          message: "El apellido solo puede contener letras",
                        },
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
                        minLength: {
                          value: 3,
                          message:
                            "Ingrese un nombre con un mínimo de 3 caracteres",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "El nombre no puede tener más de 50 caracteres",
                        },
                        pattern: {
                          value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/i,
                          message: "El nombre solo puede contener letras",
                        },
                      })}
                    />
                    <Form.Text className="text-danger">
                      {errors.nombre?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDNI">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Ingresar DNI"
                      {...register("dni", {
                        required: "El DNI es obligatorio",
                        min: {
                          value: 10000000,
                          message: "Ingrese un dni valido",
                        },
                        max: {
                          value: 99999999,
                          message: "Ingrese un dni valido",
                        },
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
                        pattern: {
                          value: /^\d{10,15}$/,
                          message:
                            "El teléfono debe tener entre 10 y 15 dígitos",
                        },
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
                        minLength: {
                          value: 5,
                          message:
                            "Ingrese una dirección con un mínimo de 5 caracteres",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "La dirección no puede tener más de 50 caracteres",
                        },
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
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                          message: "Debe ingresar un email válido",
                        },
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
                        minLength: {
                          value: 6,
                          message:
                            "La contraseña debe tener al menos 6 caracteres",
                        },
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                          message:
                            "La contraseña debe tener al menos una letra mayúscula y un carácter especial",
                        },
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
                  <Form.Group className="mb-3" controlId="formImagen">
                    <Form.Label>URL de la imagen</Form.Label>
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

export default ModalCrear;
