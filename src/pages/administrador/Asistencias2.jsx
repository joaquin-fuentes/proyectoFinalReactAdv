import React, { useEffect, useState } from "react";
import { Button, Container, Table, Form } from "react-bootstrap";
import useCursosStore from "../../stores/Cursos-Store";
import useAsistenciasStore from "../../stores/AsistenciasDocentes-Store";
import CargarAsistenciasModal from "./ModalesAsistencias/CargarAsistenciasModal";
import CargarAsistenciasDocentesModal from "./ModalesAsistencias/CargarAsistenciasDocentesModal";
import CrearAsistenciaDocente from "./ModalesAsistencias/CrearAsistenciaDocente";
import DetalleAsistenciaAlumnos from "./ModalesAsistencias/DetalleAsistenciaAlumnos";
import DetalleAsistenciaDocentes from "./ModalesAsistencias/DetalleAsistenciaDocentes";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Administrador.css";

const Assitencias2 = () => {
  const { cursos, obtenerCursos } = useCursosStore();
  const { asistencias, getAsistencias } = useAsistenciasStore();
  const [showDocenteModal, setShowDocenteModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    obtenerCursos();
    getAsistencias();
  }, []);

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const anio = hoy.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const fechaHoy = obtenerFechaActual();

  const handleCargarNuevaFecha = () => {
    setSelectedDate(fechaHoy);
    setShowDocenteModal(true);
  };

  const asistenciasOrdenadas = [...asistencias].sort((a, b) => {
    const fechaA = new Date(a.fecha.split("/").reverse().join("-"));
    const fechaB = new Date(b.fecha.split("/").reverse().join("-"));
    return fechaA - fechaB;
  });

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h2 className="disenoTitulo my-5">Asistencias Alumnos</h2>

      {cursos.length > 0 ? (
        <Table striped hover responsive className="rounded">
          <thead>
            <tr>
              <th className="tableMaterias fw-bold">Curso</th>
              <th className="tableMaterias fw-bold">Turno</th>
              <th className="tableMaterias fw-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td className="tableMaterias">
                  {curso.anio}° {curso.division}
                </td>
                <td className="tableMaterias">{curso.turno}</td>
                <td className="tableMaterias">
                  <div className="d-flex justify-content-center">
                    <CargarAsistenciasModal curso={curso} />
                    <DetalleAsistenciaAlumnos curso={curso} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No se encontraron cursos.</p>
      )}

      <h2 className="disenoTitulo my-5">Asistencias Docentes</h2>

      <Table striped hover responsive className="rounded">
        <thead>
          <tr>
            <th className="tableMaterias fw-bold">Fecha</th>
            <th className="tableMaterias fw-bold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asistenciasOrdenadas.map((asistencia) => (
            <tr key={asistencia.id}>
              <td className="tableMaterias">{asistencia.fecha}</td>
              <td className="tableMaterias">
                <div className="d-flex justify-content-around">
                  <CargarAsistenciasDocentesModal asistencia={asistencia} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="m-2 d-flex justify-content-start">
        <CrearAsistenciaDocente />
        <DetalleAsistenciaDocentes />
      </div>
    </Container>
  );
};

export default Assitencias2;
