import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import useMateriasStore from "../../../stores/Materias-Store";
import { FaEye } from "react-icons/fa";

const ListadoHorarios = ({ curso }) => {
  const [show, setShow] = useState(false);
  const [horarios, setHorarios] = useState([]);

  const { materias, obtenerMaterias, loading, error } = useMateriasStore();

  useEffect(() => {
    if (curso && curso.horarios) {
      setHorarios(curso.horarios);
    }
  }, [curso]);

  useEffect(() => {
    if (curso && curso.materias && curso.materias.length > 0 && materias.length === 0) {
      obtenerMaterias();
    }
  }, [curso, obtenerMaterias, materias.length]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  const obtenerNombreDeMateria = (id) => {
    const materia = materias.find((m) => m.id === id);
    return materia ? materia.nombre : "Libre";
  };

  const renderHorario = (dia, modulo) => {
    const horario = horarios.find((h) => h.dia === dia && h.modulo === modulo);
    return horario ? obtenerNombreDeMateria(horario.materiaID) : "Libre";
  };

  if (loading) return <p>Cargando materias...</p>;
  if (error) return <p>Error al cargar materias: {error}</p>;

  return (
    <>
      <Button
        onClick={handleShow}
        variant="outline-primary"
        className="m-1 d-flex justify-content-center align-items-center flex-column"
      >
        <FaEye />
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-xl">
        <Modal.Header closeButton>
          <Modal.Title>
            Horarios Curso {curso.anio}° {curso.division}
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
                  <td>{renderHorario(dia, "1")}</td>
                  <td>{renderHorario(dia, "2")}</td>
                  <td>{renderHorario(dia, "3")}</td>
                  <td>{renderHorario(dia, "4")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListadoHorarios;
