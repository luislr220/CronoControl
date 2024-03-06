import React from "react";
import { Button, FormControl, Table } from "react-bootstrap";
import "../AgregarEmpleadoComponent/css/agregarEmpleado.css";
import Navigation from "../NavigationComponent/Navigation";

export default function AgregarEmpleado() {
  return (
    <div>
      <Navigation />
      <h2 className="AGEMTitulo">Dar de alta a empleado</h2>
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
              <th>Área</th>
              <th>Rol</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Luis Armando Largo Ramirez</td>
              <td>Desarrollo de Software</td>
              <td>Empleado</td>
              <td>
                <Button variant="info">Actualizar</Button>{" "}
              </td>
              <td>
                <Button variant="danger">Eliminar</Button>{" "}
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>Fredy Esparza</td>
              <td>Desarrollo de Software</td>
              <td>Empleado</td>
              <td>
                <Button variant="info">Actualizar</Button>{" "}
              </td>
              <td>
                <Button variant="danger">Eliminar</Button>{" "}
              </td>
            </tr>

            <tr>
              <td>3</td>
              <td>Cristel</td>
              <td>Desarrollo de Software</td>
              <td>Empleado</td>
              <td>
                <Button variant="info">Actualizar</Button>{" "}
              </td>
              <td>
                <Button variant="danger">Eliminar</Button>{" "}
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>Fernando</td>
              <td>Desarrollo de Software</td>
              <td>Empleado</td>
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
  );
}
