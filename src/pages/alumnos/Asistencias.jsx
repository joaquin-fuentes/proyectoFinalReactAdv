import React, { useEffect, useState } from "react";
import { Container, ProgressBar, Table } from "react-bootstrap";
import useCursosStore from "../../stores/Cursos-Store";
import useAuth from "../../stores/Auth-Store";
import "./Alumnos.css"; // Asegúrate de ajustar la ruta si es necesario

const Asistencias = () => {
  const { user } = useAuth();
  const { cursos, obtenerCursos } = useCursosStore();
  const [asistenciasAlumno, setAsistenciasAlumno] = useState([]);
  const [totalAsistencias, setTotalAsistencias] = useState(0);
  const [totalPresentes, setTotalPresentes] = useState(0);
  const [totalAusentes, setTotalAusentes] = useState(0);

  useEffect(() => {
    obtenerCursos(); // Obtener todos los cursos al montar el componente
  }, [obtenerCursos]);

  useEffect(() => {
    if (cursos.length > 0 && user) {
      // Buscar el curso al que pertenece el alumno
      const cursoAlumno = cursos.find((curso) =>
        curso.alumnos.includes(user.id)
      );

      if (cursoAlumno) {
        // Filtrar las asistencias del alumno actual
        const asistenciasDelAlumno = cursoAlumno.asistencias || [];

        const presentes = asistenciasDelAlumno.filter((asistencia) =>
          asistencia.presentes.includes(user.id)
        ).length;
        const ausentes = asistenciasDelAlumno.filter((asistencia) =>
          asistencia.ausentes.includes(user.id)
        ).length;

        setAsistenciasAlumno(asistenciasDelAlumno);
        setTotalAsistencias(asistenciasDelAlumno.length);
        setTotalPresentes(presentes);
        setTotalAusentes(ausentes);
      }
    }
  }, [cursos, user]);

  const calcularPorcentajeAsistencia = () => {
    if (totalAsistencias === 0) return 0;
    return (totalPresentes / totalAsistencias) * 100;
  };

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h2 className="disenoTitulo my-5">Mis Asistencias</h2>

      <div className="my-4">
        <h4>Total de asistencias: {totalAsistencias}</h4>
        <h4>Presentes: {totalPresentes}</h4>
        <h4>Ausentes: {totalAusentes}</h4>
      </div>

      <div className="my-4">
        <h5>Porcentaje de Asistencia</h5>
        <ProgressBar
          now={calcularPorcentajeAsistencia()}
          label={`${calcularPorcentajeAsistencia().toFixed(2)}%`}
        />
      </div>

      {asistenciasAlumno.length > 0 ? (
        <Table striped hover responsive className="rounded">
          <thead>
            <tr>
              <th className="tableMaterias fw-bold">Fecha</th>
              <th className="tableMaterias fw-bold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {asistenciasAlumno.map((asistencia) => (
              <tr key={asistencia.fecha}>
                <td className="tableMaterias">{asistencia.fecha}</td>
                <td
                  className={`tableMaterias ${
                    asistencia.presentes.includes(user.id)
                      ? "text-success" 
                      : "text-danger" 
                  }`}
                >
                  {asistencia.presentes.includes(user.id)
                    ? "Presente"
                    : "Ausente"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No se encontraron asistencias registradas.</p>
      )}
    </Container>
  );
};

export default Asistencias;
