//Lucía Cristel Ramírez Romero

// Importar los módulos y componentes necesarios de React y React Bootstrap
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Pagination } from 'react-bootstrap';
import Navigation from '../NavigationComponent/Navigation';
import { BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs'; // Importar los iconos necesarios
import "./TurnoCrud.css";

// Función principal del componente
export default function TurnoCrud() {
  // Definición de estados utilizando el hook useState
  const [turnos, setTurnos] = useState([]); // Lista de turnos
  const [areas, setAreas] = useState([]); // Lista de áreas
  const [contratos, setContratos] = useState([]); // Lista de contratos
  const [showAddTurnoModal, setShowAddTurnoModal] = useState(false);  // Estado para mostrar/ocultar modal de agregar turno
  const [showUpdateTurnoModal, setShowUpdateTurnoModal] = useState(false);  // Estado para mostrar/ocultar modal de actualizar turno
  const [showViewTurnoModal, setShowViewTurnoModal] = useState(false);  // Estado para almacenar los datos del nuevo turno
  const [nuevoTurno, setNuevoTurno] = useState({
    Nombre: "",
    HoraInicio: "",
    HoraFinal: "",
    Area: "",
    Cupo: "",
    Estado: "Activo",
    Contrato: ""
  });
  const [selectedTurno, setSelectedTurno] = useState(null); // Estado para almacenar el turno seleccionado para actualizar
  const [valoresTurnoSeleccionado, setValoresTurnoSeleccionado] = useState({  // Estado para almacenar los valores del turno seleccionado para actualizar
    Nombre: "",
    HoraInicio: "",
    HoraFinal: "",
    Area: "",
    Cupo: "",
    Estado: "Activo",
    Contrato: ""
  });
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null); // Estado para almacenar el turno seleccionado para actualizar
  const [turnoSeleccionadoVisualizar, setTurnoSeleccionadoVisualizar] = useState(null); // Estado para almacenar el turno seleccionado para visualizar
  const [currentPage, setCurrentPage] = useState(1);  // Estado para almacenar el número de página actual
  const [itemsPerPage] = useState(5); // Número de elementos por página
  const [filtroArea, setFiltroArea] = useState(""); // Estado para almacenar el área seleccionada para filtrar
  const [filtroEstado, setFiltroEstado] = useState(""); // Estado para almacenar el filtro de estado
  const [filtroCupo, setFiltroCupo] = useState(""); // Estado para almacenar el filtro de cupo


  // Función para obtener la lista de turnos desde el servidor
  const fetchTurnos = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/turnos`);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de turnos");
      }
      const data = await response.json();
      setTurnos(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para obtener la lista de áreas desde el servidor
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/areas`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de areas");
        }
        const data = await response.json();
        const nombresAreas = data.map(area => area.nombre); // Obtener solo los nombres
        setAreas(nombresAreas); // Almacenar solo los nombres en el estado 'areas'
      } catch (error) {
        console.error(error);
      }
    };

    fetchAreas();
    fetchTurnos();
  }, []);

  // Obtener los contratos
  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contratos`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de contratos");
        }
        const data = await response.json(); // Obtener solo los nombres
        setContratos(data); // Almacenar los objetos completos de contrato en el estado 'contratos'
      } catch (error) {
        console.error(error);
      }
    };
    fetchContratos(); // Llamar a la función para obtener las áreas
    fetchTurnos();  // Llamar a la función para obtener los turnos
  }, []);

  // Función para obtener la lista de contratos desde el servidor
  const handleCloseAddTurnoModal = () => {
    setShowAddTurnoModal(false);
    setNuevoTurno({
      Nombre: "",
      HoraInicio: "",
      HoraFinal: "",
      Area: "",
      Cupo: "",
      Estado: "Activo",
      Contrato: ""
    });
    setSelectedTurno(null);
    setFiltroArea("");
  };

  // Función para cerrar el modal de actualizar turno
  const handleCloseUpdateTurnoModal = () => {
    setShowUpdateTurnoModal(false);
    setTurnoSeleccionado(null);
  };

  // Función para cerrar el modal de visualizar turno
  const handleCloseViewTurnoModal = () => {
    setShowViewTurnoModal(false);
    setTurnoSeleccionadoVisualizar(null);
  };

  // Función para mostrar el modal de agregar turno
  const handleShowAddTurnoModal = () => setShowAddTurnoModal(true);

  // Función para mostrar el modal de actualizar turno
  const handleShowUpdateTurnoModal = () => setShowUpdateTurnoModal(true);

  // Función para mostrar el modal de visualizar turno
  const handleShowViewTurnoModal = () => setShowViewTurnoModal(true);

  // Función para agregar un nuevo turno
  const addTurno = async () => {
    try {
      // Validar que todos los campos estén completos
      if (!nuevoTurno.Nombre || !nuevoTurno.HoraInicio || !nuevoTurno.HoraFinal || !nuevoTurno.Area || !nuevoTurno.Cupo || !nuevoTurno.Estado || !nuevoTurno.Contrato) {
        throw new Error("Todos los campos son obligatorios");
      }
<<<<<<< HEAD
      // Enviar la solicitud POST al servidor para agregar el turno
      const response = await fetch("http://localhost:3002/turnos", {
=======

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/turnos`, {
>>>>>>> 493201dd4af993c60a91baf419c1ad2a3e0dc0eb
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoTurno),
      });
      if (!response.ok) {
        throw new Error("No se pudo agregar el turno");
      }
      // Actualizar la lista de turnos llamando a la función fetchTurnos
      await fetchTurnos();
      // Cerrar el modal de agregar turno
      handleCloseAddTurnoModal();
    } catch (error) {
      console.error(error);
    }
  };

  // Función para eliminar un turno
  const deleteTurno = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/turnos/${id}`, {
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

  // Función para abrir el modal de actualizar turno
  const abrirModalActualizar = (turno) => {
    setTurnoSeleccionado(turno);
    setValoresTurnoSeleccionado({
      Nombre: turno.Nombre,
      HoraInicio: turno.HoraInicio,
      HoraFinal: turno.HoraFinal,
      Area: turno.Area,
      Cupo: turno.Cupo,
      Estado: turno.Estado,
      Contrato: turno.Contrato
    });
    handleShowUpdateTurnoModal();
  };

  // Función para cerrar el modal de actualizar turno
  const cerrarModalActualizar = () => {
    handleCloseUpdateTurnoModal();
  };

  // Función para cerrar el modal de visualizar turno
  const cerrarModalVizualizar = () => {
    handleCloseViewTurnoModal();
  };

  // Función para actualizar un turno existente
  const updateTurno = async () => {
    try {
      if (!valoresTurnoSeleccionado.Nombre || !valoresTurnoSeleccionado.HoraInicio || !valoresTurnoSeleccionado.HoraFinal || !valoresTurnoSeleccionado.Area || !valoresTurnoSeleccionado.Cupo || !valoresTurnoSeleccionado.Estado) {
        throw new Error("Todos los campos son obligatorios");
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/turnos/${turnoSeleccionado._id}`, {
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

  // Función para visualizar un turno
  const visualizarTurno = (turno) => {
    setTurnoSeleccionadoVisualizar(turno);
    handleShowViewTurnoModal();
  };

  // Obtener índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Función para filtrar los turnos según los criterios seleccionados
  const filteredTurnos = turnos.filter(turno => {
    if (filtroArea && filtroEstado && filtroCupo) {
      return turno.Area === filtroArea && turno.Estado === filtroEstado && parseInt(turno.Cupo) >= parseInt(filtroCupo);
    } else if (filtroArea && filtroCupo) {
      return turno.Area === filtroArea && parseInt(turno.Cupo) >= parseInt(filtroCupo);
    } else if (filtroEstado && filtroCupo) {
      return turno.Estado === filtroEstado && parseInt(turno.Cupo) >= parseInt(filtroCupo);
    } else if (filtroArea && filtroEstado) {
      return turno.Area === filtroArea && turno.Estado === filtroEstado;
    } else if (filtroArea) {
      return turno.Area === filtroArea;
    } else if (filtroEstado) {
      return turno.Estado === filtroEstado;
    } else if (filtroCupo) {
      return parseInt(turno.Cupo) >= parseInt(filtroCupo);
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
      <Navigation /> {/* Componente de navegación */}
      <h2 className="AGEMTitulo">Lista de Turnos</h2>
      <div className="AGEMcontenedor1">
        {/* Botones de agregar turno y filtros */}
        <div className="AGEMBotonContainer custom-button-container">
          {/* Botones de agregar turno y filtros */}
          <Button variant="primary" className="custom-button" onClick={handleShowAddTurnoModal}>
            <span style={{ marginRight: '5px' }}>+</span> Nuevo Turno
          </Button>
          {/* Filtros por área, estado y cupo */}
          <Form.Group controlId="formAreaFiltro" className="custom-filter-group">
            {/* Selección de área */}
            <Form.Control as="select" value={filtroArea} onChange={(e) => setFiltroArea(e.target.value)}>
              <option value="">Todas las áreas</option>
              {areas.map((area, index) => (
                <option key={index} value={area}>{area}</option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* Filtrar por estado */}
          <Form.Group controlId="formEstadoFiltro" className="custom-filter-group">
            {/* Selección de estado */}
            <Form.Control as="select" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </Form.Control>
          </Form.Group>
          {/* Filtrar por cupo */}
          <Form.Group controlId="formCupoFiltro" className="custom-filter-group">
            <Form.Control type="number" placeholder="Filtrar por cupo" value={filtroCupo} onChange={(e) => setFiltroCupo(e.target.value)} />
          </Form.Group>
        </div>
        {/* Tabla de turnos */}
        <Table className="AGEMTable">
          {/* Encabezados de la tabla */}
          <thead style={{ backgroundColor: '#1C2B67', color: 'white' }}>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Hora Inicio</th>
              <th>Hora Final</th>
              <th>Área</th>
              <th>Cupo</th>
              <th>Estado</th>
              <th>Contrato</th>
              <th>Acción</th>
            </tr>
          </thead>
          {/* Filas de la tabla */}
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
                <td>{turno.Contrato}</td>
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

      {/* Modales para agregar, actualizar y visualizar turnos */}
      {/* Modal para agregar turno */}
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
            <Form.Group controlId="formContrato" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Contrato</Form.Label>
              <div className="col-sm-8">
                <Form.Control as="select" value={nuevoTurno.Contrato} onChange={(e) => setNuevoTurno({ ...nuevoTurno, Contrato: e.target.value })}>
                  <option>Selecciona un contrato...</option>
                  {contratos.map((contrato, index) => (
                    <option key={index} value={contrato.nombreContrato}>{contrato.nombreContrato}</option>
                  ))}
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

      {/* Modal para actualizar turno */}
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
                  name="Area"
                  value={valoresTurnoSeleccionado.Area}
                  onChange={(e) =>
                    setValoresTurnoSeleccionado({
                      ...valoresTurnoSeleccionado,
                      Area: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una área</option>
                  {areas.map((area) => (
                    <option key={area} value={area.nombre}>
                      {area}
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
            <Form.Group controlId="formActualizarContrato" className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67', fontWeight: 'lighter' }} className="col-sm-4">Contrato</Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  as="select"
                  value={valoresTurnoSeleccionado.Contrato}  // Cambia esto
                  onChange={(e) =>
                    setValoresTurnoSeleccionado({
                      ...valoresTurnoSeleccionado,
                      Contrato: e.target.value,
                    })
                  }
                >
                  <option>Selecciona un contrato...</option>
                  {contratos.map((contrato) => (
                    <option key={contrato._id} value={contrato.nombreContrato}>{contrato.nombreContrato}</option>
                  ))}
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

      {/* Modal para visualizar turno */}
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
            <p><strong>Contrato:</strong></p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '10px' }}>
            <p>{turnoSeleccionadoVisualizar?.Nombre}</p>
            <p>{turnoSeleccionadoVisualizar?.HoraInicio}</p>
            <p>{turnoSeleccionadoVisualizar?.HoraFinal}</p>
            <p>{turnoSeleccionadoVisualizar?.Area}</p>
            <p>{turnoSeleccionadoVisualizar?.Cupo}</p>
            <p>{turnoSeleccionadoVisualizar?.Estado}</p>
            <p>{turnoSeleccionadoVisualizar?.Contrato}</p>
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
