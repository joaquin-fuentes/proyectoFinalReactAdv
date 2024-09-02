"use client";

import { useState, useEffect } from "react";
import { Card, Badge, Spinner } from "react-bootstrap";
import useStore from "../../stores/Asistencias-Store";
import useAuth from "../../stores/Auth-Store";

export default function AsistenciasAlumno() {
  const {
    asistencias,
    fetchAsistencias,
    usuarios,
    fetchUsuarios,
    materias,
    fetchMaterias,
  } = useStore();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAsistencias();
        await fetchUsuarios();
        await fetchMaterias();
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchAsistencias, fetchUsuarios, fetchMaterias]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filtra las asistencias del alumno en particular
  const alumnoAsistencias = asistencias.filter(
    (a) =>
      Array.isArray(a.alumnosPresentes) &&
      a.alumnosPresentes.some(
        (alumno) => String(alumno.alumnoID || alumno) === String(user.id)
      )
  );

  // Filtra por fecha si se selecciona una
  const asistenciasFiltradas = selectedDate
    ? asistencias.filter((a) => {
        const asistenciaDate = new Date(a.dia);
        return (
          asistenciaDate.getDate() === selectedDate.getDate() &&
          asistenciaDate.getMonth() === selectedDate.getMonth() &&
          asistenciaDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : asistencias;

  // Cálculo de totales
  const totalPresentes = alumnoAsistencias.length;
  const totalAusentes = asistencias.length - totalPresentes;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Card className="container p-4 border">
      <Card.Header>
        <Card.Title>
          Asistencias de {user?.nombre} {user?.apellido}
        </Card.Title>
      </Card.Header>
      <Card.Body className="d-flex flex-column gap-3">
        <div>
          <input
            type="date"
            className="form-control"
            value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
          />
        </div>
        <div>
          <h3 className="h5 mb-3">Resumen de asistencias</h3>
          <p>Total de presentes: {totalPresentes}</p>
          <p>Total de ausentes: {totalAusentes}</p>
        </div>
        <div>
          <h3 className="h5 mb-3">Asistencias del día</h3>
          <div className="row">
            {asistenciasFiltradas.length === 0 ? (
              <p>No se encontraron asistencias para la fecha seleccionada.</p>
            ) : (
              asistenciasFiltradas.map((asistencia) => (
                <div key={asistencia.id} className="col-md-4">
                  <div>
                    <h5>{asistencia.dia}</h5>
                    <ul>
                      {materias.map((materia) => {
                        const presente = asistencia.alumnosPresentes.some(
                          (alumno) =>
                            String(alumno.alumnoID || alumno) ===
                            String(user.id)
                        );
                        return (
                          <div
                            key={materia.id}
                            className="d-flex justify-content-between align-items-center border-bottom py-2"
                          >
                            <span className="fw-bold">{materia.nombre}:</span>
                            <Badge
                              className="m-1"
                              bg={presente ? "success" : "danger"}
                            >
                              {presente ? "Presente" : "Ausente"}
                            </Badge>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))
            )}{" "}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
