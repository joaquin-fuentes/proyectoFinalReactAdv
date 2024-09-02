"use client";

import { useState, useEffect } from "react";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import useStore from "../../stores/Asistencias-Store";
import useAuth from "../../stores/Auth-Store";

export default function Component() {
  const {
    asistencias,
    fetchAsistencias,
    usuarios,
    fetchUsuarios,
    materias,
    fetchMaterias,
  } = useStore();
  const { user } = useAuth();
  const [alumnoId, setAlumnoId] = useState("1"); // Suponiendo que el ID del alumno actual es '1'
  const [selectedDate, setSelectedDate] = useState(new Date());
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
  }, [fetchAsistencias, fetchUsuarios, fetchMaterias, asistencias]);
  console.log(asistencias);
  console.log(materias);
  console.log(user.id);
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

  const alumno = usuarios.find((u) => u.id === alumnoId);
  const alumnoAsistencias = asistencias.filter(
    (a) =>
      Array.isArray(a.alumnosPresentes) && a.alumnosPresentes.includes(alumnoId)
  );

  const asistenciasDelDia = alumnoAsistencias.filter((a) => {
    const asistenciaDate = new Date(a.dia);
    return (
      selectedDate &&
      asistenciaDate.getDate() === selectedDate.getDate() &&
      asistenciaDate.getMonth() === selectedDate.getMonth() &&
      asistenciaDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Card className="w-100 mx-auto" style={{ maxWidth: "800px" }}>
      <Card.Header>
        <Card.Title>
          Asistencias de {alumno?.nombre} {alumno?.apellido}
        </Card.Title>
      </Card.Header>
      <Card.Body className="d-flex flex-column flex-md-row gap-3">
        <div className="flex-grow-1">
          <input
            type="date"
            className="form-control"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
          />
        </div>
        <div className="flex-grow-1">
          <h3 className="h5 mb-3">Asistencias del día</h3>
          <div>
            {asistencias.map((asistencia) => (
              <ul>
                <li>
                <span>{asistencia.dia}</span>
                <Badge
                  key={asistencia.id}
                  className="m-1"
                  bg={
                    asistencia.alumnosPresentes.includes(alumnoId)
                      ? "success"
                      : "danger"
                  }
                >
                  {asistencia.alumnosPresentes.includes(alumnoId)
                    ? "Presente"
                    : "Ausente"}
                </Badge>
                </li>
             
              </ul>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
