import React from "react";
import { Container, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Alumnos.css";

const Materias = () => {
  return (
    <Container className="text-center px-md-5 py-md-2">
      <h4 className="my-3 titulo">Listado de materias en curso</h4>

      <Form.Group className="d-flex align-items-center justify-content-center w-md-50 ms-3">
        <Form.Label className="m-0 p-2">Buscar Materia:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre materia"
          className="w-50"
        />
      </Form.Group>
      <Table
        striped
        hover
        responsive
        className="mt-3 rounded"
      >
        <thead>
          <tr className="">
            <th className="tableMaterias fw-bold">Materia</th>
            <th className="tableMaterias fw-bold">Año</th>
            <th className="tableMaterias fw-bold">Docente</th>
            <th className="tableMaterias fw-bold">1er trimestre</th>
            <th className="tableMaterias fw-bold">2do trimestre</th>
            <th className="tableMaterias fw-bold">3er trimestre</th>
            <th className="tableMaterias fw-bold">Nota Final</th>
            <th className="tableMaterias fw-bold">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
          <tr>
            <td className="tableMaterias">Matemáticas</td>
            <td className="tableMaterias">2°B</td>
            <td className="tableMaterias">Prof. Juan Perez</td>
            <td className="tableMaterias">6</td>
            <td className="tableMaterias">9</td>
            <td className="tableMaterias">7</td>
            <td className="tableMaterias">7.3</td>
            <td className="tableMaterias text-success">Aprobado</td>
          </tr>
        </tbody>
      </Table>
      <section className="mt-4">
        <h6 className="fs-5 text-primary-emphasis">Listado Materias previas de año anterior (en caso de tener)</h6>
        <Table hover responsive className="my-3 rounded ">
          <thead className="">
            <tr>
              <th className="tableMaterias">Materia</th>
              <th className="tableMaterias">Año</th>
              <th className="tableMaterias">Docente</th>
              <th className="tableMaterias">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tableMaterias">Quimica</td>
              <td className="tableMaterias">1°B</td>
              <td className="tableMaterias">Prof. Juan Perez</td>
              <th className="text-warning tableMaterias">Previa</th>
            </tr>
          </tbody>
        </Table>
      </section>
    </Container>
  );
};

export default Materias;
