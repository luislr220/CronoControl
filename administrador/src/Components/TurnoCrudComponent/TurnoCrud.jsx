import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import Navigation from '../NavigationComponent/Navigation';
import "./TurnoCrud.css";
import { BsPencilSquare, BsTrash } from 'react-icons/bs'; // Importar los iconos necesarios


export default function TurnoCrud() {
  const [turnos, setTurnos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showAddTurnoModal, setShowAddTurnoModal] = useState(false);
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
  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

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

  const handleClose = () => {
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
  };

  const handleShow = () => setShowAddTurnoModal(true);

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
      handleClose();
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
    setMostrarModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setTurnoSeleccionado(null);
    setMostrarModalActualizar(false);
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

  return (
    <div className='cuerpo'>
      <Navigation />
      <h2 className="AGEMTitulo">Lista de Turnos</h2>
      <div className="AGEMcontenedor1">
        <div className="AGEMBotonContainer">
          <Button variant="primary" className="custom-button" onClick={handleShow}>
            <span style={{ marginRight: '5px' }}>+</span> Nuevo Turno
          </Button>
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
            {turnos.map((turno, index) => (
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
                    {" "}
                  </Button>{" "}

                  <Button variant="danger" onClick={() => deleteTurno(turno._id)} title="Eliminar">
                    <BsTrash className="icono" size={20} /> {/* Icono de basura */}
                    {" "}
                  </Button>{" "}
                </td>

              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/** AGREGAR TURNO */}
      <Modal show={showAddTurnoModal} onHide={handleClose} className='todo'>
        <Modal.Header closeButton style={{ backgroundColor: '#1C2B67' }}>
          <Modal.Title style={{ fontFamily: 'Coolvetica', color: '#FFFFFF', fontSize: '22px', textAlign: 'center' }}>{selectedTurno ? "Actualizar Turno" : "Agregar Turno"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombreTurno" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Nombre del Turno</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="text" placeholder="Ingrese el nombre del turno" value={nuevoTurno.Nombre} onChange={(e) => setNuevoTurno({ ...nuevoTurno, Nombre: e.target.value })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formHoraInicio" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Hora de Inicio</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="time" placeholder="Ingrese la hora de inicio" value={nuevoTurno.HoraInicio} onChange={(e) => setNuevoTurno({ ...nuevoTurno, HoraInicio: e.target.value })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formHoraFinal" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Hora Final</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="time" placeholder="Ingrese la hora final" value={nuevoTurno.HoraFinal} onChange={(e) => setNuevoTurno({ ...nuevoTurno, HoraFinal: e.target.value })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formArea" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Área de Trabajo</Form.Label>
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
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Cupo</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="number" placeholder="Ingrese el cupo del turno" value={nuevoTurno.Cupo} onChange={(e) => setNuevoTurno({ ...nuevoTurno, Cupo: e.target.value })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formEstado" className="d-flex align-items-center FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Estado</Form.Label>
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
        <Modal.Footer>
          <Button variant="secondary" className="custom-button" onClick={handleClose}style={{ color: '#FFFFFF', letterSpacing: '1px', fontWeight: 'normal' }}>
            Cancelar
          </Button>
          <Button variant="primary" className="custom-button" onClick={selectedTurno ? updateTurno : addTurno} style={{ color: '#FFFFFF', letterSpacing: '1px', fontWeight: 'normal' }}>
            {selectedTurno ? "Actualizar" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/*  ACTUALIZAR  */}
      <Modal show={mostrarModalActualizar} onHide={cerrarModalActualizar} className='todo'>
        <Modal.Header closeButton style={{ backgroundColor: '#1C2B67' }}>
          <Modal.Title style={{ fontFamily: 'Coolvetica', color: '#FFFFFF', fontSize: '22px', textAlign: 'center' }}>Actualizar Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formNombreActualizar' className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Nombre del turno</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="text" name="Nombre" value={valoresTurnoSeleccionado.Nombre} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, Nombre: e.target.value })} />
              </div>
            </Form.Group>
            <Form.Group controlId='formHoraInicioActualizar' className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Hora Inicio</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="time" name="HoraInicio" value={valoresTurnoSeleccionado.HoraInicio} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, HoraInicio: e.target.value, })} />
              </div>
            </Form.Group>
            <Form.Group controlId='formHoraFinalActualizar' className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Hora Final</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="time" name="HoraFinal" value={valoresTurnoSeleccionado.HoraFinal} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, HoraFinal: e.target.value, })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formAreaActualizar" className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Área de Trabajo</Form.Label>
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
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Cupo</Form.Label>
              <div className="col-sm-8">
                <Form.Control type="number" name="Cupo" value={valoresTurnoSeleccionado.Cupo} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, Cupo: e.target.value, })} />
              </div>
            </Form.Group>
            <Form.Group controlId="formEstadoActualizar" className="row FormGroupMargin">
              <Form.Label style={{ color: '#1C2B67' }} className="col-sm-4">Estado</Form.Label>
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
        <Modal.Footer>
          <Button variant="danger" className="custom-button" onClick={cerrarModalActualizar} style={{ color: '#FFFFFF', letterSpacing: '1px', fontWeight: 'normal' }}>
            Cancelar
          </Button>
          <Button variant="warning" className="custom-button" onClick={updateTurno} style={{ color: '#FFFFFF', letterSpacing: '1px', fontWeight: 'normal' }}>
            Actualizar
          </Button>

        </Modal.Footer>
      </Modal>

    </div>
  );
}
