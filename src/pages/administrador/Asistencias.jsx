import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Form, Container, Pagination } from 'react-bootstrap';
import useStore from '../../stores/Asistencias-Store';
import Swal from 'sweetalert2';

const AsistenciasDocente = () => {
  const { usuarios, materias, fetchUsuarios, fetchMaterias, marcarAsistencia, historialAsistencias, fetchHistorial, cursos, fetchCursos } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [selectedAlumnos, setSelectedAlumnos] = useState([]);
  const [selectedDocentes, setSelectedDocentes] = useState([]);
  const [selectedAsistencia, setSelectedAsistencia] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsuarios();
    fetchMaterias();
    fetchHistorial();
    fetchCursos();
    console.log(usuarios, materias, historialAsistencias);
  }, [fetchUsuarios, fetchMaterias, fetchHistorial, fetchCursos]);

  const handleCheckboxChange = (type, id) => {
    if (type === 'alumno') {
      setSelectedAlumnos((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setSelectedDocentes((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const handleSave = async () => {
    const dia = new Date().toLocaleDateString();
    const nuevaAsistencia = {
      id: Date.now(),
      dia,
      materiaID: selectedMateria,
      alumnosPresentes: selectedAlumnos,
      docentesPresentes: selectedDocentes,
    };
    marcarAsistencia(dia, selectedMateria, selectedAlumnos, selectedDocentes);
    await fetchHistorial();
    Swal.fire({
      title: '¡Éxito!',
      text: '¡Asistencia guardada exitosamente!',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      timer: 3000,
    });
    setShowModal(false);
  };
  // historial de asistencias logica 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'dia', direction: 'ascending' });

  const sortedAsistencias = React.useMemo(() => {
    let sortedAsistencias = [...historialAsistencias];
    if (sortConfig !== null) {
      sortedAsistencias.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedAsistencias;
  }, [historialAsistencias, sortConfig]);

  const paginatedAsistencias = sortedAsistencias.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const openDetailModal = (asistencia) => {
    setSelectedAsistencia(asistencia);
    setShowDetailModal(true);
  };
  return (
    <>
       <Container className="asistencias-container pt-md-3">
        <h1 className="text-center mb-4 p-3 disenoTitulo">Asistencias</h1>
        <Table striped bordered hover className="text-center rounded mt-3">
          <thead>
            <tr>
              <th style={{ backgroundColor: '#071f40', color: 'white' }}>Año</th>
              <th style={{ backgroundColor: '#071f40', color: 'white' }}>Materia</th>
              <th style={{ backgroundColor: '#071f40', color: 'white' }}>División</th>
              <th style={{ backgroundColor: '#071f40', color: 'white' }}>Lista de Alumnos y docentes</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr style={{ backgroundColor: '#071f40', color: 'white' }} key={materia.id}>
                <td style={{ backgroundColor: '#071f40', color: 'white' }}>{materia.anio}</td>
                <td style={{ backgroundColor: '#071f40', color: 'white' }}>{materia.nombre}</td>
                <td style={{ backgroundColor: '#071f40', color: 'white' }}>{materia.division}</td>
                <td style={{ backgroundColor: '#071f40', color: 'white' }}>
                  <Button
                    variant="outline-light"
                    size="sm"
                    className=" m-2 p-2"

                    onClick={() => {
                      setSelectedMateria(materia.id);
                      setShowModal(true);
                    }}
                  >
                    Ver →
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Tomar Asistencia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Alumnos</h5>
            <Form.Control
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {cursos?.find(c => c.materias.includes(selectedMateria))?.alumnos
              ?.filter(alumnoId => {
                const alumnoData = usuarios.find(u => u.id === alumnoId);
                if (!alumnoData) return false;
                const nombreCompleto = `${alumnoData.nombre} ${alumnoData.apellido}`;
                return nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase());
              })
              .map(alumnoId => {
                const alumnoData = usuarios.find(u => u.id === alumnoId);
                return (
                  <Form.Check
                    key={alumnoId}
                    type="checkbox"
                    label={alumnoData ? `${alumnoData.nombre} ${alumnoData.apellido}` : 'Alumno no encontrado'}
                    onChange={() => handleCheckboxChange('alumno', alumnoId)}
                  />
                );
              })}
            <h5>Docentes</h5>
            {usuarios
              .filter((usuario) =>
                usuario.rol === 'Docente' &&
                usuario.id === materias.find(m => m.id === selectedMateria)?.docenteId
              )
              .map((docente) => (
                <Form.Check
                  key={docente.id}
                  type="checkbox"
                  label={`${docente.nombre} ${docente.apellido}`}
                  onChange={() => handleCheckboxChange('docente', docente.id)}
                />
              ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button
              disabled={!selectedAlumnos.length || !selectedDocentes.length}
              style={{ backgroundColor: '#071f40' }}
              onClick={handleSave}
            >
              Guardar Asistencia
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      {/* historial de asistencias */}
      <section>
        <h1 className="text-center mb-4 p-3 disenoTitulo">Historial de Asistencias</h1>
        <Container className="asistencias-container pt-md-3">

          <Table striped bordered hover className="text-center rounded mt-3">
            <thead>
              <tr>
                <th style={{ backgroundColor: '#071f40', color: 'white' }}>Fecha</th>
                <th style={{ backgroundColor: '#071f40', color: 'white' }}>Materia</th>
                <th style={{ backgroundColor: '#071f40', color: 'white' }}>Ver Detalles</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAsistencias.reverse().map((asistencia) => {
                let materia = materias.find((m) => m.id === asistencia.materiaID);

                return (
                  <tr key={asistencia.id}>
                    <td style={{ backgroundColor: '#071f40', color: 'white' }}>{asistencia.dia}</td>
                    <td style={{ backgroundColor: '#071f40', color: 'white' }}>{materia ? materia.nombre : 'Materia no encontrada'}</td>
                    <td style={{ backgroundColor: '#071f40', color: 'white' }}>
                      <Button
                        variant="outline-light"
                        size="sm"
                        onClick={() => openDetailModal(asistencia)}
                      >
                        Ver  →
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination className="d-flex justify-content-center mt-3" size="sm" activePage={currentPage}>
            <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
            <Pagination.Item>{currentPage}</Pagination.Item>
            <Pagination.Next onClick={() => setCurrentPage(prev => prev + 1)} />
          </Pagination>
        </Container>

        {/* Modal para ver detalles de asistencia */}
        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de Asistencia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedAsistencia && (
              <>
                <h5>Materia: {materias.find((m) => m.id === selectedAsistencia.materiaID)?.nombre}</h5>
                <h6>Fecha: {selectedAsistencia.dia}</h6>
                <h5>Alumnos Presentes</h5>
                <ul>
                  {selectedAsistencia.alumnosPresentes.map((alumnoID) => {
                    const alumno = usuarios.find((u) => u.id === alumnoID);
                    return <li key={alumnoID}>{alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Alumno no encontrado'}</li>;
                  })}
                </ul>
                <h5>Docentes Presentes</h5>
                <ul>
                  {selectedAsistencia.docentesPresentes.map((docenteID) => {
                    const docente = usuarios.find((u) => u.id === docenteID);
                    return <li key={docenteID}>{docente ? `${docente.nombre} ${docente.apellido}` : 'Docente no encontrado'}</li>;
                  })}
                </ul>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowDetailModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
};

export default AsistenciasDocente;
