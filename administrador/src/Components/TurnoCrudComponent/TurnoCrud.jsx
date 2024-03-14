import React from 'react'
import Navigation from '../NavigationComponent/Navigation'
import { Button, FormControl, Table } from 'react-bootstrap'

export default function TurnoCrud() {
  return (
    <div>
        <Navigation/>
        <h2 className="AGEMTitulo">Turno</h2>

        <div className="AGEMcontenedor1">
      
        <div className="AGEMBotonContainer">
          <Button variant="success" className="AGEMBotonverde">
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
    </div>
  )
}

