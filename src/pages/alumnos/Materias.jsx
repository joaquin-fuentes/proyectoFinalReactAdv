import React from "react";
import { Container, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Alumnos.css";

const Materias = () => {
  return (
    <Container className="text-center">
      <h4 className="mt-3">Listado de materias en curso</h4>

      <Form.Group className="d-flex align-items-center w-50 ms-3">
        <Form.Label className="m-0 p-2">Buscar Materia:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre materia"
          className="w-50"
        />
      </Form.Group>
      <Table
        striped
        bordered
        hover
        responsive
        variant="dark"
        className="mt-3 rounded"
      >
        <thead>
          <tr>
            <th>Materia</th>
            <th>Año</th>
            <th>Docente</th>
            <th>1er trimestre</th>
            <th>2do trimestre</th>
            <th>3er trimestre</th>
            <th>Nota Final</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Matemáticas</td>
            <td>2°B</td>
            <td>Prof. Juan Perez</td>
            <td>6</td>
            <td>9</td>
            <td>7</td>
            <td>7.3</td>
            <td className="text-success">Aprobado</td>
          </tr>
          <tr>
            <td>Matemáticas</td>
            <td>2°B</td>
            <td>Prof. Juan Perez</td>
            <td>6</td>
            <td>9</td>
            <td>7</td>
            <td>7.3</td>
            <td className="text-success">Aprobado</td>
          </tr>
          <tr>
            <td>Matemáticas</td>
            <td>2°B</td>
            <td>Prof. Juan Perez</td>
            <td>4</td>
            <td>4</td>
            <td>7</td>
            <td>5</td>
            <td className="text-danger">Desaprobado</td>
          </tr>
        </tbody>
      </Table>
      <section className="mt-4">
        <h6>Listado Materias previas de año anterior (en caso de tener)</h6>
        <Table
          striped
          bordered
          hover
          responsive
          variant="dark"
          className="mt-3 rounded"
        >
          <thead>
            <tr>
              <th>Materia</th>
              <th>Año</th>
              <th>Docente</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Quimica</td>
              <td>1°B</td>
              <td>Prof. Juan Perez</td>
              <th className="text-warning">Previa</th>
            </tr>
          </tbody>
        </Table>
      </section>
    </Container>
  );
};

export default Materias;
