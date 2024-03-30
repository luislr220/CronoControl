import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Pagination } from 'react-bootstrap';
import Navigation from '../NavigationComponent/Navigation';
import { BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs'; // Importar los iconos necesarios
import "./TurnoCrud.css";

export default function TurnoCrud() {
  const [turnos, setTurnos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showAddTurnoModal, setShowAddTurnoModal] = useState(false);
  const [showUpdateTurnoModal, setShowUpdateTurnoModal] = useState(false);
  const [showViewTurnoModal, setShowViewTurnoModal] = useState(false);
  const [nuevoTurno, setNuevoTurno] = useState({
    Nombre: "",
    HoraInicio: "",
    HoraFinal: "",
    Area: "",
    Cupo: "",
    Estado: "Activo"
  });
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [valoresTurnoSeleccionado, setValoresTurnoSeleccionado] = useState({
    Nombre: "",
    HoraInicio: "",
    HoraFinal: "",
    AreaTrabajo: "",
    Cupo: "",
    Estado: "Activo"
  });
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [turnoSeleccionadoVisualizar, setTurnoSeleccionadoVisualizar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Número de elementos por página
  const [filtroArea, setFiltroArea] = useState(""); // Estado para almacenar el área seleccionada para filtrar
  const [filtroEstado, setFiltroEstado] = useState(""); // Estado para almacenar el filtro de estado
  const [filtroCupo, setFiltroCupo] = useState(""); // Estado para almacenar el filtro de cupo
  const [filtroHorario, setFiltroHorario] = useState(""); // Estado para almacenar el filtro de horario

  const fetchTurnos = async () => {
    try {
      const response = await fetch("http://localhost:3002/turnos");
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de turnos");
      }
      const data = await response.json();
      setTurnos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("http://localhost:3002/areas");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de areas");
        }
        const data = await response.json();
        const nombresAreas = data.map(area => area.nombre);
        setAreas(nombresAreas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAreas();
    fetchTurnos();
  }, []);

  const handleCloseAddTurnoModal = () => {
    setShowAddTurnoModal(false);
    setNuevoTurno({
      Nombre: "",
      HoraInicio: "",
      HoraFinal: "",
      Area: "",
      Cupo: "",
      Estado: "Activo"
    });
    setSelectedTurno(null);
    setFiltroArea(""); 
  };

  const handleCloseUpdateTurnoModal = () => {
    setShowUpdateTurnoModal(false);
    setTurnoSeleccionado(null);
  };

  const handleCloseViewTurnoModal = () => {
    setShowViewTurnoModal(false);
    setTurnoSeleccionadoVisualizar(null);
  };

  const handleShowAddTurnoModal = () => setShowAddTurnoModal(true);

  const handleShowUpdateTurnoModal = () => setShowUpdateTurnoModal(true);

  const handleShowViewTurnoModal = () => setShowViewTurnoModal(true);

  const addTurno = async () => {
    try {
      if (!nuevoTurno.Nombre || !nuevoTurno.HoraInicio || !nuevoTurno.HoraFinal || !nuevoTurno.Area || !nuevoTurno.Cupo || !nuevoTurno.Estado) {
        throw new Error("Todos los campos son obligatorios");
      }

      const response = await fetch("http://localhost:3002/turnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoTurno),
      });
      if (!response.ok) {
        throw new Error("No se pudo agregar el turno");
      }
      await fetchTurnos();
      handleCloseAddTurnoModal();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTurno = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/turnos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar el turno")
      }
      const nuevosTurnos = turnos.filter(
        (turno) => turno._id !== id
      );
      setTurnos(nuevosTurnos);
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModalActualizar = (turno) => {
    setTurnoSeleccionado(turno);
    setValoresTurnoSeleccionado({
      Nombre: turno.Nombre,
      HoraInicio: turno.HoraInicio,
      HoraFinal: turno.HoraFinal,
      AreaTrabajo: turno.Area,
      Cupo: turno.Cupo,
      Estado: turno.Estado
    });
    handleShowUpdateTurnoModal();
  };

  const cerrarModalActualizar = () => {
    handleCloseUpdateTurnoModal();
  };

  const cerrarModalVizualizar = () => {
    handleCloseViewTurnoModal();
  };

  const updateTurno = async () => {
    try {
      if (!valoresTurnoSeleccionado.Nombre || !valoresTurnoSeleccionado.HoraInicio || !valoresTurnoSeleccionado.HoraFinal || !valoresTurnoSeleccionado.AreaTrabajo || !valoresTurnoSeleccionado.Cupo || !valoresTurnoSeleccionado.Estado) {
        throw new Error("Todos los campos son obligatorios");
      }

      const response = await fetch(`http://localhost:3002/turnos/${turnoSeleccionado._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valoresTurnoSeleccionado),
      });
      if (!response.ok) {
        throw new Error("No se pudo actualizar el turno");
      }
      const data = await response.json();
      const index = turnos.findIndex(
        (e) => e._id === turnoSeleccionado._id
      );
      const nuevosTurnos = [...turnos];
      nuevosTurnos[index] = data;
      setTurnos(nuevosTurnos);
      cerrarModalActualizar();
    } catch (error) {
      console.error(error);
    }
  };

  const visualizarTurno = (turno) => {
    setTurnoSeleccionadoVisualizar(turno);
    handleShowViewTurnoModal();
  };

  // Obtener índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredTurnos = turnos.filter(turno => {
    if (filtroArea && filtroEstado && filtroCupo && filtroHorario) {
      return turno.Area === filtroArea && turno.Estado === filtroEstado && parseInt(turno.Cupo) >= parseInt(filtroCupo) && turno.HoraInicio <= filtroHorario && turno.HoraFinal >= filtroHorario;
    } else if (filtroArea && filtroCupo && filtroHorario) {
      return turno.Area === filtroArea && parseInt(turno.Cupo) >= parseInt(filtroCupo) && turno.HoraInicio <= filtroHorario && turno.HoraFinal >= filtroHorario;
    } else if (filtroEstado && filtroCupo && filtroHorario) {
      return turno.Estado === filtroEstado && parseInt(turno.Cupo) >= parseInt(filtroCupo) && turno.HoraInicio <= filtroHorario && turno.HoraFinal >= filtroHorario;
    } else if (filtroArea && filtroEstado && filtroHorario) {
      return turno.Area === filtroArea && turno.Estado === filtroEstado && turno.HoraInicio <= filtroHorario && turno.HoraFinal >= filtroHorario;
    } else if (filtroArea && filtroHorario) {
      return turno.Area === filtroArea && turno.HoraInicio <= filtroHorario && turno.HoraFinal >= filtroHorario;
    } else if (filtroEstado && filtroHorario) {
      return turno.Estado === filtroEstado && turno.HoraInicio <= filtroHorario && turno.HoraFinal >= filtroHorario;
    } else if (filtroCupo && filtroHorario) {
      return parseInt(turno.Cupo) >= parseInt(filtroCupo) && turno.HoraInicio <= filtroHorario && turno.HoraFinal >= filtroHorario;
    } else if (filtroHorario) {
      return turno.HoraInicio <= filtroHorario && turno.HoraFinal >= filtroHorario;
    } else {
      return true;
    }
  });

  // Obtener los turnos a mostrar en la página actual
  const currentItems = filteredTurnos.slice(indexOfFirstItem, indexOfLastItem);

  // Obtener números de página
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredTurnos.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='cuerpo'>
      <Navigation />
      <h2 className="AGEMTitulo">Lista de Turnos</h2>
      <div className="AGEMcontenedor1">
        <div className="AGEMBotonContainer">
          <Button variant="primary" className="custom-button" onClick={handleShowAddTurnoModal}>
            <span style={{ marginRight: '5px' }}>+</span> Nuevo Turno
          </Button>
          {/* Filtrar por área */}
          <Form.Group controlId="formAreaFiltro">
            <Form.Control as="select" value={filtroArea} onChange={(e) => setFiltroArea(e.target.value)}>
              <option value="">Todas las áreas</option>
              {areas.map((area, index) => (
                <option key={index} value={area}>{area}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* Filtrar por estado */}
          <Form.Group controlId="formEstadoFiltro">
            <Form.Control as="select" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Form.Control>
          </Form.Group>
          {/* Filtrar por cupo */}
          <Form.Group controlId="formCupoFiltro">
            <Form.Control type="number" placeholder="Filtrar por cupo" value={filtroCupo} onChange={(e) => setFiltroCupo(e.target.value)} />
          </Form.Group>
          {/* Filtrar por horario */}
          <Form.Group controlId="formHorarioFiltro">
            <Form.Control type="time" placeholder="Filtrar por horario" value={filtroHorario} onChange={(e) => setFiltroHorario(e.target.value)} />
          </Form.Group>
        </div>
        <Table className="AGEMTable">
          <thead style={{ backgroundColor: '#1C2B67', color: 'white' }}>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Hora Inicio</th>
              <th>Hora Final</th>
              <th>Área</th>
              <th>Cupo</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((turno, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{turno.Nombre}</td>
                <td>{turno.HoraInicio}</td>
                <td>{turno.HoraFinal}</td>
                <td>{turno.Area}</td>
                <td>{turno.Cupo}</td>
                <td>{turno.Estado}</td>
                <td>
                  <Button variant="warning" onClick={() => abrirModalActualizar(turno)} title="Actualizar">
                    <BsPencilSquare className="icono" size={20} /> {/* Icono de lápiz */}
                  </Button>{" "}
                  <Button variant="danger" onClick={() => deleteTurno(turno._id)} title="Eliminar">
                    <BsTrash className="icono" size={20} /> {/* Icono de basura */}
                  </Button>{" "}
                  <Button variant="info" onClick={() => visualizarTurno(turno)} title="Visualizar">
                    <BsEye className="icono" size={20} /> {/* Icono de ojo */}
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Paginación */}
        <Pagination>
          {pageNumbers.map((number) => (
            <Pagination.Item key={number} onClick={() => paginate(number)}>
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {/** AGREGAR TURNO */}
      <Modal show={showAddTurnoModal} onHide={handleCloseAddTurnoModal} className='todo'>
        <Modal.Header closeButton style={{ backgroundColor: '#1C2B67' }}>
          <Modal.Title style={{ fontFamily: 'Coolvetica', color: '#FFFFFF', fontSize: '22px', textAlign: 'center' }}>{selectedTurno ? "Actualizar Turno" : "Agregar Turno"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombreTurno" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Nombre del Turno</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="text" placeholder="Ingrese el nombre del turno" value={nuevoTurno.Nombre} onChange={(e) => setNuevoTurno({ ...nuevoTurno, Nombre: e.target.value })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formHoraInicio" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Hora de Inicio</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="time" placeholder="Ingrese la hora de inicio" value={nuevoTurno.HoraInicio} onChange={(e) => setNuevoTurno({ ...nuevoTurno, HoraInicio: e.target.value })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formHoraFinal" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Hora Final</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="time" placeholder="Ingrese la hora final" value={nuevoTurno.HoraFinal} onChange={(e) => setNuevoTurno({ ...nuevoTurno, HoraFinal: e.target.value })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formArea" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Área de Trabajo</Form.Label>
              <div className="col-sm-8">
                <Form.Control as="select" value={nuevoTurno.Area} onChange={(e) => setNuevoTurno({ ...nuevoTurno, Area: e.target.value })}>
                  <option value="">Seleccione...</option>
                  {areas.map((area, index) => (
                    <option key={index} value={area}>{area}</option>
                  ))}
                </Form.Control>
              </div>
            </Form.Group>
            <Form.Group controlId="formCupo" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Cupo</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="number" placeholder="Ingrese el cupo del turno" value={nuevoTurno.Cupo} onChange={(e) => setNuevoTurno({ ...nuevoTurno, Cupo: e.target.value })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formEstado" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Estado</Form.Label>
              <div className="col-sm-8">
                <Form.Control as="select" value={nuevoTurno.Estado} onChange={(e) => setNuevoTurno({ ...nuevoTurno, Estado: e.target.value })}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  {/* Agrega más opciones según sea necesario */}
                </Form.Control>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button variant="secondary" className="custom-button" onClick={handleCloseAddTurnoModal} style={{ color: '#FFFFFF', letterSpacing: '1px', fontWeight: 'normal' }}>
            Cancelar
          </Button>
          <Button variant="primary" className="custom-button" onClick={selectedTurno ? updateTurno : addTurno} style={{ color: '#FFFFFF', letterSpacing: '1px', fontWeight: 'normal' }}>
            {selectedTurno ? "Actualizar" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL ACTUALIZAR TURNO */}
      <Modal show={showUpdateTurnoModal} onHide={handleCloseUpdateTurnoModal} className='todo'>
        <Modal.Header closeButton style={{ backgroundColor: '#1C2B67' }}>
          <Modal.Title style={{ fontFamily: 'Coolvetica', color: '#FFFFFF', fontSize: '22px', textAlign: 'center' }}>Actualizar Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formNombreActualizar' className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Nombre del turno</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="text" name="Nombre" value={valoresTurnoSeleccionado.Nombre} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, Nombre: e.target.value })} />
              </div>
            </Form.Group>
            <Form.Group controlId='formHoraInicioActualizar' className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Hora Inicio</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="time" name="HoraInicio" value={valoresTurnoSeleccionado.HoraInicio} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, HoraInicio: e.target.value, })} />
              </div>
            </Form.Group>
            <Form.Group controlId='formHoraFinalActualizar' className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Hora Final</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="time" name="HoraFinal" value={valoresTurnoSeleccionado.HoraFinal} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, HoraFinal: e.target.value, })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formAreaActualizar" className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Área de Trabajo</Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  as="select"
                  name="AreaTrabajo"
                  value={valoresTurnoSeleccionado.AreaTrabajo}
                  onChange={(e) =>
                    setValoresTurnoSeleccionado({
                      ...valoresTurnoSeleccionado,
                      AreaTrabajo: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una área</option>
                  {areas.map((area) => (
                    <option key={area._id} value={area.nombre}>
                      {area.nombre}
                    </option>
                  ))}
                </Form.Control>
              </div>
            </Form.Group>
            <Form.Group controlId='formCupoActualizar' className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Cupo</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="number" name="Cupo" value={valoresTurnoSeleccionado.Cupo} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, Cupo: e.target.value, })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formEstadoActualizar" className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Estado</Form.Label>
              <div className="col-sm-8">
                <Form.Control as="select" value={valoresTurnoSeleccionado.Estado} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, Estado: e.target.value })}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  {/* Agrega más opciones según sea necesario */}
                </Form.Control>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button variant="danger" className="custom-button" onClick={cerrarModalActualizar} style={{ color: '#FFFFFF', letterSpacing: '1px', fontWeight: 'normal' }}>
            Cancelar
          </Button>
          <Button variant="warning" className="custom-button" onClick={updateTurno} style={{ color: '#FFFFFF', letterSpacing: '1px', fontWeight: 'normal' }}>
            Actualizar
          </Button>

        </Modal.Footer>
      </Modal>

      {/* MODAL VISUALIZAR TURNO */}
      <Modal show={showViewTurnoModal} onHide={handleCloseViewTurnoModal} className='todo'>
        <Modal.Header closeButton style={{ backgroundColor: '#1C2B67', textAlign: 'center', border: 'none' }}>
          <Modal.Title style={{ fontFamily: 'Coolvetica', color: '#FFFFFF', fontSize: '22px' }}>Visualizar Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ paddingLeft: '80px', paddingRight: '100px', fontWeight: 'lighter', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1C2B67' }}>
            <p><strong>Nombre:</strong></p>
            <p><strong>Hora de Inicio:</strong></p>
            <p><strong>Hora Final:</strong></p>
            <p><strong>Área de Trabajo:</strong></p>
            <p><strong>Cupo:</strong></p>
            <p><strong>Estado:</strong></p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '10px' }}>
            <p>{turnoSeleccionadoVisualizar?.Nombre}</p>
            <p>{turnoSeleccionadoVisualizar?.HoraInicio}</p>
            <p>{turnoSeleccionadoVisualizar?.HoraFinal}</p>
            <p>{turnoSeleccionadoVisualizar?.Area}</p>
            <p>{turnoSeleccionadoVisualizar?.Cupo}</p>
            <p>{turnoSeleccionadoVisualizar?.Estado}</p>
          </div>
        </Modal.Body>


        <Modal.Footer style={{ justifyContent: 'center' }}>
          <Button variant="secondary" className='custom-button' onClick={cerrarModalVizualizar} style={{ color: '#FFFFFF', letterSpacing: '1px', fontWeight: 'normal' }}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}