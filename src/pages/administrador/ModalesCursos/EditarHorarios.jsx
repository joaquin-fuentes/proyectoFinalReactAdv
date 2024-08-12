import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import useMateriasStore from "../../../stores/Materias-Store";
import { FaEdit } from "react-icons/fa";
import useCursosStore from "../../../stores/Cursos-Store";
import Swal from "sweetalert2";

const EditarHorarios = ({ curso }) => {
  const [show, setShow] = useState(false);
  const [horarios, setHorarios] = useState([]);

  const { materias, obtenerMaterias, loading, error } = useMateriasStore();
  const { actualizarCurso, obtenerCursos } = useCursosStore();

  useEffect(() => {
    setHorarios(curso.horarios || []);
  }, [curso]);

  useEffect(() => {
    obtenerMaterias();
  }, [obtenerMaterias]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  const handleMateriaChange = (dia, modulo, materiaID) => {
    setHorarios((prevHorarios) =>
      prevHorarios.map((h) =>
        h.dia === dia && h.modulo === modulo
          ? { ...h, materiaID: +materiaID } // Convertir a número
          : h
      )
    );
  };

  const renderSelectMateria = (dia, modulo) => {
    const horario =
      horarios.find((h) => h.dia === dia && h.modulo === modulo) || {};
    return (
      <Form.Control
        as="select"
        value={horario.materiaID || ""}
        onChange={(e) => handleMateriaChange(dia, modulo, e.target.value)}
      >
        <option value="">Seleccionar Materia</option>
        {materias.map((materia) => (
          <option key={materia.id} value={materia.id}>
            {materia.nombre}
          </option>
        ))}
      </Form.Control>
    );
  };

  const handleGuardar = async () => {
    try {
      await actualizarCurso(curso.id, { ...curso, horarios });
      await obtenerCursos(); // Volver a obtener los cursos actualizados
      handleClose(); // Cerrar el modal después de guardar
      // Mostrar SweetAlert de éxito
      Swal.fire({
        title: "Horarios actualizados",
        text: "Los horarios se actualizaron con éxito.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      // Mostrar SweetAlert de error
      Swal.fire({
        title: "Error",
        text: error.message || "Algo salió mal al editar los horarios.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  if (loading) return <p>Cargando materias...</p>;
  if (error) return <p>Error al cargar materias: {error}</p>;

  return (
    <>
      <Button
        onClick={handleShow}
        variant="outline-warning"
        className="m-1 d-flex justify-content-center align-items-center flex-column"
      >
        <FaEdit />
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Horarios Curso {curso.anio}° {curso.division}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Table striped hover responsive className="rounded">
            <thead>
              <tr>
                <th>Día</th>
                <th>
                  Módulo 1 <br /> 8:00 - 9:00
                </th>
                <th>
                  Módulo 2 <br /> 9:10 - 10:10
                </th>
                <th>
                  Módulo 3 <br /> 11:20 - 12:20
                </th>
                <th>
                  Módulo 4 <br /> 13:30 - 14:00
                </th>
              </tr>
            </thead>
            <tbody>
              {dias.map((dia) => (
                <tr key={dia}>
                  <td>{dia}</td>
                  <td>{renderSelectMateria(dia, "1")}</td>
                  <td>{renderSelectMateria(dia, "2")}</td>
                  <td>{renderSelectMateria(dia, "3")}</td>
                  <td>{renderSelectMateria(dia, "4")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardar}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarHorarios;
