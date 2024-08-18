import React, { useEffect, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import EditarMateria from "./ModalesMaterias/EditarMateria";
import CrearMateria from "./ModalesMaterias/CrearMateria";
import useMateriasStore from "../../stores/Materias-Store";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useDocenteStore from "../../stores/Docentes-Store";

const Materias = () => {
  const { materias, obtenerMaterias, borrarMateria } = useMateriasStore();
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroAnio, setFiltroAnio] = useState("");

  const { docentes, obtenerDocentes } = useDocenteStore();

  useEffect(() => {
    obtenerMaterias();
    obtenerDocentes();
  }, [obtenerMaterias, obtenerDocentes]);

  const eliminarMateria = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await borrarMateria(id);
          Swal.fire("Eliminada", "La materia ha sido eliminada.", "success");
        } catch (error) {
          Swal.fire(
            "Error",
            error.message || "No se pudo eliminar la materia.",
            "error"
          );
        }
      }
    });
  };

  // Filtrado de materias según los filtros de nombre y año
  const materiasFiltradas = materias.filter((materia) => {
    const coincideNombre = materia.nombre
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());
    const coincideAnio = filtroAnio
      ? materia.anio.toString() === filtroAnio
      : true;
    return coincideNombre && coincideAnio;
  });

  const obtenerNombreDocente = (id) => {
    // Utilizamos find para buscar el docente con el ID correspondiente
    const docente = docentes.find((docente) => docente.id === id);
    // Si se encuentra el docente, devolvemos su nombre; de lo contrario, devolvemos "Libre"
    return docente ? docente.nombre + " " + docente.apellido : "Libre";
  };

  return (
    <Container className="text-center px-md-5 py-md-2">
      <h2 className="my-5 disenoTitulo">Materias</h2>

      <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
        <Form.Label className="m-0 p-2">
          <span className="fw-bold buscarUsuario">BUSCAR:</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese una materia"
          className="w-50 me-2"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
        <Form.Select
          className="w-25"
          value={filtroAnio}
          onChange={(e) => setFiltroAnio(e.target.value)}
        >
          <option value="">Todos los años</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </Form.Select>
      </Form.Group>

      <div className="my-2 d-flex justify-content-start">
        <CrearMateria />
      </div>

      {materiasFiltradas.length > 0 ? (
        <Table striped hover responsive className="rounded">
          <thead>
            <tr>
              <th className="tableMaterias fw-bold">Nombre</th>
              <th className="tableMaterias fw-bold">Año</th>
              <th className="tableMaterias fw-bold">División</th>
              <th className="tableMaterias fw-bold">Docente a Cargo</th>
              <th className="tableMaterias fw-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materiasFiltradas.map((materia) => {
              return (
                <tr key={materia.id}>
                  <td className="tableMaterias">{materia.nombre}</td>
                  <td className="tableMaterias">{materia.anio}°</td>
                  <td className="tableMaterias">{materia.division}</td>
                  <td className="tableMaterias">
                    {obtenerNombreDocente(materia.docenteId)}
                  </td>
                  <td className="tableMaterias d-flex justify-content-center">
                    <EditarMateria materia={materia} />
                    <button
                      className="btn text-danger fs-6"
                      onClick={() => eliminarMateria(materia.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>No se encontró ninguna materia que coincida con los filtros.</p>
      )}
    </Container>
  );
};

export default Materias;