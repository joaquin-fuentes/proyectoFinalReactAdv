import React, { useEffect, useState } from "react";
import { Container, ProgressBar, Table } from "react-bootstrap";
import useAsistenciasStore from "../../stores/AsistenciasDocentes-Store";
import useAuth from "../../stores/Auth-Store";
import "../administrador/Administrador.css";

const AsistenciasDocente = () => {
  const { user } = useAuth();
  const { asistencias, getAsistencias } = useAsistenciasStore();
  const [asistenciasDocente, setAsistenciasDocente] = useState([]);
  const [totalAsistencias, setTotalAsistencias] = useState(0);
  const [totalPresentes, setTotalPresentes] = useState(0);
  const [totalAusentes, setTotalAusentes] = useState(0);

  useEffect(() => {
    getAsistencias();
  }, [getAsistencias]);

  useEffect(() => {
    if (asistencias.length > 0 && user) {
      const asistenciasDelDocente = asistencias.filter(
        (asistencia) =>
          asistencia.docentesPresentes.includes(user.id) ||
          asistencia.docentesAusentes.includes(user.id)
      );

      setAsistenciasDocente(asistenciasDelDocente);

      const total = asistenciasDelDocente.length;
      const presentes = asistenciasDelDocente.filter((asistencia) =>
        asistencia.docentesPresentes.includes(user.id)
      ).length;
      const ausentes = total - presentes;

      setTotalAsistencias(total);
      setTotalPresentes(presentes);
      setTotalAusentes(ausentes);
    }
  }, [asistencias, user]);

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

      {asistenciasDocente.length > 0 ? (
        <Table striped hover responsive className="rounded">
          <thead>
            <tr>
              <th className="tableMaterias fw-bold">Fecha</th>
              <th className="tableMaterias fw-bold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {asistenciasDocente.map((asistencia) => (
              <tr key={asistencia.fecha}>
                <td className="tableMaterias">{asistencia.fecha}</td>
                <td
                  className={`tableMaterias ${
                    asistencia.docentesPresentes.includes(user.id)
                      ? "text-success" 
                      : "text-danger" 
                  }`}
                >
                  {asistencia.docentesPresentes.includes(user.id)
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

export default AsistenciasDocente;
