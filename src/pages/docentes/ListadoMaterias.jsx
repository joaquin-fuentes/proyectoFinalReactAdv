import { Container, Form, Table } from "react-bootstrap";
import "./Docentes.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import useDocenteStore from "../../stores/Docentes-Store";
import useMateriasStore from "../../stores/Materias-Store";
import useAuth from "../../stores/Auth-Store";
import { useEffect, useState } from "react";
import useCursosStore from "../../stores/Cursos-Store";

const ListadoMaterias = () => {
  const { docente, obtenerDocente } = useDocenteStore();
  const { materias, obtenerMaterias } = useMateriasStore();
  const { cursos, obtenerCursos } = useCursosStore();
  const { user } = useAuth();

  const [busqueda, setBusqueda] = useState("");

  const horariosManana = {
    1: "8:00 - 9:00",
    2: "9:10 - 10:10",
    3: "11:20 - 12:20",
    4: "13:30 - 14:30",
  };

  const horariosTarde = {
    1: "15:00 - 16:00",
    2: "16:10 - 17:10",
    3: "17:20 - 18:20",
    4: "18:30 - 19:30",
  };

  useEffect(() => {
    obtenerDocente(user.id);
    obtenerMaterias();
    obtenerCursos();
  }, [obtenerDocente, obtenerMaterias, obtenerCursos, user.id]);

  const materiasDelDocente = materias.filter(
    (materia) => materia.docenteId === user.id
  );

  const materiasConHorarios = materiasDelDocente.map((materia) => {
    const cursosConMateria = cursos.filter((curso) =>
      curso.materias.includes(materia.id)
    );

    const horarios = cursosConMateria.flatMap((curso) =>
      curso.horarios.filter((horario) => horario.materiaID === materia.id)
    );
    return { ...materia, horarios };
  });

  const normalizarTexto = (texto) => {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };


  const materiasFiltradas = materiasConHorarios.filter((materia) =>
    normalizarTexto(materia.nombre.toLowerCase()).includes(normalizarTexto(busqueda).toLowerCase())
  );

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const obtenerHorario = (modulo, turno) => {
    if (turno === "Mañana") {
      return horariosManana[modulo];
    } else if (turno === "Tarde") {
      return horariosTarde[modulo];
    } else {
      return "Horario no definido";
    }
  };

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h4 className="my-5 titulo">MIS MATERIAS</h4>

      <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
        <Form.Label className="m-0 p-2">Buscar Materia:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre materia"
          className="w-50"
          value={busqueda}
          onChange={handleBusqueda}
        />
      </Form.Group>
      <Table striped hover responsive className="mt-3 rounded fuenteTabla">
        <thead>
          <tr className="">
            <th className="tableMaterias fw-bold">Materia</th>
            <th className="tableMaterias fw-bold">Año</th>
            <th className="tableMaterias fw-bold">División</th>
            <th className="tableMaterias fw-bold">Horario</th>
            <th className="tableMaterias fw-bold">Turno</th>
          </tr>
        </thead>
        <tbody>
          {materiasFiltradas.length > 0 ? (
            materiasFiltradas.map((materia) =>
              materia.horarios.map((horario, index) => (
                <tr key={`${materia.id}-${index}`}>
                  <td className="tableMaterias">{materia.nombre}</td>
                  <td className="tableMaterias">{materia.anio}</td>
                  <td className="tableMaterias">{materia.division}</td>
                  <td className="tableMaterias">
                    {horario.dia} {obtenerHorario(horario.modulo, materia.turno)}
                  </td>
                  <td className="tableMaterias">{materia.turno}</td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan="5">No se encontraron materias</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListadoMaterias;