import React, { useState } from 'react';
import Navigation from '../NavigationComponent/Navigation';
import { Button, FormControl, Table, Modal, Form } from 'react-bootstrap';

export default function TurnoCrud() {
  const [showAddTurnoModal, setShowAddTurnoModal] = useState(false);

  const handleClose = () => setShowAddTurnoModal(false);
  const handleShow = () => setShowAddTurnoModal(true);

  return (
    <div>
      <Navigation />
      <h2 className="AGEMTitulo">Turno</h2>

      <div className="AGEMcontenedor1">
      
        <div className="AGEMBotonContainer">
          <Button variant="success" className="AGEMBotonverde" onClick={handleShow}>
            Agregar
          </Button>{" "}
          <FormControl
            type="text"
            placeholder="Buscar empleado..."
            className="AGEMBuscador"
          />
        </div>
        <Table className="AGEMTable">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Hora Inicio</th>
              <th>Hora Final</th>
              <th>Área</th>
              <th>Cupo</th>
              <th>Estado</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Turno 1</td>
              <td>16:00</td>
              <td>22:00</td>
              <td>Recursos</td>
              <td>5</td>
              <td>Activo</td>
              <td>
                <Button variant="info">Actualizar</Button>{" "}
              </td>
              <td>
                <Button variant="danger">Eliminar</Button>{" "}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Floating Add Turno Modal */}
      <Modal show={showAddTurnoModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombreTurno">
              <Form.Label>Nombre del Turno</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el nombre del turno" />
            </Form.Group>
            <Form.Group controlId="formHoraInicio">
              <Form.Label>Hora de Inicio</Form.Label>
              <Form.Control type="time" placeholder="Ingrese la hora de inicio" />
            </Form.Group>
            <Form.Group controlId="formHoraFinal">
              <Form.Label>Hora Final</Form.Label>
              <Form.Control type="time" placeholder="Ingrese la hora final" />
            </Form.Group>
            <Form.Group controlId="formArea">
              <Form.Label>Área</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el área" />
            </Form.Group>
            <Form.Group controlId="formCupo">
              <Form.Label>Cupo</Form.Label>
              <Form.Control type="number" placeholder="Ingrese el cupo" />
            </Form.Group>
            <Form.Group controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select">
                <option>Activo</option>
                <option>Inactivo</option>
              </Form.Control>
            </Form.Group>
            {/* Otros campos del formulario */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
