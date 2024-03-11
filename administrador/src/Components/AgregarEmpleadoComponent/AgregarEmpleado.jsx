import React, { useState, useEffect } from "react";
import { Button, FormControl, Table } from "react-bootstrap";
import "../AgregarEmpleadoComponent/css/agregarEmpleado.css";
import Navigation from "../NavigationComponent/Navigation";

export default function AgregarEmpleado() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    // Aquí debes hacer una solicitud HTTP para obtener los empleados desde el backend
    // Por ejemplo, utilizando fetch o axios
    const fetchEmpleados = async () => {
      try {
        const response = await fetch("http://localhost:3002/empleados"); // Ruta de la API para obtener empleados
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de empleados");
        }
        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmpleados();
  }, []);

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
            {empleados.map((empleado, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{empleado.Nombre}</td>
                <td>{empleado.AreaTrabajo}</td>
                <td>{empleado.Rol}</td>
                <td>
                  <Button variant="info">Actualizar</Button>{" "}
                </td>
                <td>
                  <Button variant="danger">Eliminar</Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
