import React from "react";
import { Button, FormControl, Table} from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import Navigation from "../NavigationComponent/Navigation";

export default function AgregarUsuario() {
  return (
    <div>
      <Navigation />
      <h2 className="AGEMTitulo">Dar de alta a empleado</h2>
      <div className="AGEMcontenedor1">
        <div className="AGEMBotonContainer">
          <Button
            variant="success"
            className="AGEMBotonverde"
          >
            Agregar
          </Button>{" "}
          <FormControl
            type="text"
            placeholder="Buscar empleado..."
            className="AGEMBuscador"
          />
          <FaFilter/>
        </div>

        <Table className="AGEMTable">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Fecha Nacimiento</th>
              <th>Correo</th>
              <th>Región</th>
              <th>Área</th>
              <th>Rol</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <Button
                      variant="info"
                    >
                      Actualizar
                    </Button>{" "}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                    >
                      Eliminar
                    </Button>{" "}
                  </td>
                </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
