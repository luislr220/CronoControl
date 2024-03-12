import React, { useState, useEffect } from "react";
import { Button, FormControl, Table, Form, Modal } from "react-bootstrap";
import { format } from 'date-fns';
import "../AgregarEmpleadoComponent/css/agregarEmpleado.css";
import Navigation from "../NavigationComponent/Navigation";

export default function AgregarEmpleado() {
  const [empleados, setEmpleados] = useState([]);
  const [filtro, setFiltro] = useState("");
  const opcionesRol = ["Empleado"];
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    Nombre: "",
    AppE: "",
    ApmE: "",
    FechaNac: "",
    Correo: "",
    Contrasena: "",
    Region: "",
    AreaTrabajo: "",
    Rol: "",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [valoresEmpleadoSeleccionado, setValoresEmpleadoSeleccionado] =
    useState({
      Nombre: "",
      AppE: "",
      ApmE: "",
      FechaNac: "",
      Correo: "",
      Contrasena: "",
      Region: "",
      AreaTrabajo: "",
      Rol: "",
    });
  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);

  useEffect(() => {
    // Función para obtener la lista de empleados desde el backend
    const fetchEmpleados = async () => {
      try {
        const response = await fetch("http://localhost:3002/empleados");
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoEmpleado({ ...nuevoEmpleado, [name]: value });
  };

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const agregarEmpleado = async () => {
    try {
      const response = await fetch("http://localhost:3002/empleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEmpleado),
      });
      if (!response.ok) {
        throw new Error("No se pudo agregar el empleado");
      }
      const data = await response.json();
      setEmpleados([...empleados, data]);
      setNuevoEmpleado({
        Nombre: "",
        AppE: "",
        ApmE: "",
        FechaNac: "",
        Correo: "",
        Contrasena: "",
        Region: "",
        AreaTrabajo: "",
        Rol: "",
      });
      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarEmpleado = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/empleados/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar el empleado");
      }
      const nuevosEmpleados = empleados.filter(
        (empleado) => empleado._id !== id
      );
      setEmpleados(nuevosEmpleados);
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModalActualizar = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setValoresEmpleadoSeleccionado(empleado);
    setMostrarModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setEmpleadoSeleccionado(null);
    setMostrarModalActualizar(false);
  };

  const actualizarEmpleado = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/empleados/${empleadoSeleccionado._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valoresEmpleadoSeleccionado),
        }
      );
      if (!response.ok) {
        throw new Error("No se pudo actualizar el empleado");
      }
      const data = await response.json();
      const index = empleados.findIndex(
        (e) => e._id === empleadoSeleccionado._id
      );
      const nuevosEmpleados = [...empleados];
      nuevosEmpleados[index] = data;
      setEmpleados(nuevosEmpleados);
      cerrarModalActualizar();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navigation />
      <h2 className="AGEMTitulo">Dar de alta a empleado</h2>
      <div className="AGEMcontenedor1">
        <div className="AGEMBotonContainer">
          <Button
            variant="success"
            className="AGEMBotonverde"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar
          </Button>{" "}
          <FormControl
            type="text"
            placeholder="Buscar empleado..."
            className="AGEMBuscador"
            value={filtro}
            onChange={handleFiltroChange}
          />
        </div>
        <Modal
          show={mostrarFormulario}
          onHide={() => setMostrarFormulario(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Agregar Empleado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <FormControl
                  type="text"
                  name="Nombre"
                  value={nuevoEmpleado.Nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formAppE">
                <Form.Label>Apellido Paterno</Form.Label>
                <FormControl
                  type="text"
                  name="AppE"
                  value={nuevoEmpleado.AppE}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formApmE">
                <Form.Label>Apellido Materno</Form.Label>
                <FormControl
                  type="text"
                  name="ApmE"
                  value={nuevoEmpleado.ApmE}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formFechaNac">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <FormControl
                  type="date"
                  name="FechaNac"
                  value={nuevoEmpleado.FechaNac}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCorreo">
                <Form.Label>Correo</Form.Label>
                <FormControl
                  type="email"
                  name="Correo"
                  value={nuevoEmpleado.Correo}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formContrasena">
                <Form.Label>Contraseña</Form.Label>
                <FormControl
                  type="password"
                  name="Contrasena"
                  value={nuevoEmpleado.Contrasena}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formRegion">
                <Form.Label>Región</Form.Label>
                <FormControl
                  type="text"
                  name="Region"
                  value={nuevoEmpleado.Region}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formArea">
                <Form.Label>Área de Trabajo</Form.Label>
                <FormControl
                  type="text"
                  name="AreaTrabajo"
                  value={nuevoEmpleado.AreaTrabajo}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formRol">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  as="select"
                  name="Rol"
                  value={nuevoEmpleado.Rol}
                  onChange={handleInputChange}
                >
                  {opcionesRol.map((rol, index) => (
                    <option key={index} value={rol}>
                      {rol}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setMostrarFormulario(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={agregarEmpleado}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para actualizar */}
        <Modal show={mostrarModalActualizar} onHide={cerrarModalActualizar}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar Empleado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombreActualizar">
                <Form.Label>Nombre</Form.Label>
                <FormControl
                  type="text"
                  name="Nombre"
                  value={valoresEmpleadoSeleccionado.Nombre}
                  onChange={(e) =>
                    setValoresEmpleadoSeleccionado({
                      ...valoresEmpleadoSeleccionado,
                      Nombre: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formAppEActualizar">
                <Form.Label>Apellido Paterno</Form.Label>
                <FormControl
                  type="text"
                  name="AppE"
                  value={valoresEmpleadoSeleccionado.AppE}
                  onChange={(e) =>
                    setValoresEmpleadoSeleccionado({
                      ...valoresEmpleadoSeleccionado,
                      AppE: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formApmEActualizar">
                <Form.Label>Apellido Materno</Form.Label>
                <FormControl
                  type="text"
                  name="ApmE"
                  value={valoresEmpleadoSeleccionado.ApmE}
                  onChange={(e) =>
                    setValoresEmpleadoSeleccionado({
                      ...valoresEmpleadoSeleccionado,
                      ApmE: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formFechaNacActualizar">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <FormControl
                  type="date"
                  name="FechaNac"
                  value={valoresEmpleadoSeleccionado.FechaNac}
                  onChange={(e) =>
                    setValoresEmpleadoSeleccionado({
                      ...valoresEmpleadoSeleccionado,
                      FechaNac: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCorreoActualizar">
                <Form.Label>Correo</Form.Label>
                <FormControl
                  type="email"
                  name="Correo"
                  value={valoresEmpleadoSeleccionado.Correo}
                  onChange={(e) =>
                    setValoresEmpleadoSeleccionado({
                      ...valoresEmpleadoSeleccionado,
                      Correo: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formContrasenaActualizar">
                <Form.Label>Contraseña</Form.Label>
                <FormControl
                  type="password"
                  name="Contrasena"
                  value={valoresEmpleadoSeleccionado.Contrasena}
                  onChange={(e) =>
                    setValoresEmpleadoSeleccionado({
                      ...valoresEmpleadoSeleccionado,
                      Contrasena: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formRegionActualizar">
                <Form.Label>Región</Form.Label>
                <FormControl
                  type="text"
                  name="Region"
                  value={valoresEmpleadoSeleccionado.Region}
                  onChange={(e) =>
                    setValoresEmpleadoSeleccionado({
                      ...valoresEmpleadoSeleccionado,
                      Region: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formAreaActualizar">
                <Form.Label>Área de Trabajo</Form.Label>
                <FormControl
                  type="text"
                  name="AreaTrabajo"
                  value={valoresEmpleadoSeleccionado.AreaTrabajo}
                  onChange={(e) =>
                    setValoresEmpleadoSeleccionado({
                      ...valoresEmpleadoSeleccionado,
                      AreaTrabajo: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formRol">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  as="select"
                  name="Rol"
                  value={nuevoEmpleado.Rol}
                  onChange={handleInputChange}
                >
                  {opcionesRol.map((rol, index) => (
                    <option key={index} value={rol}>
                      {rol}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModalActualizar}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={actualizarEmpleado}>
              Actualizar
            </Button>
          </Modal.Footer>
        </Modal>

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
            {empleados
              .filter((empleado) =>
                `${empleado.Nombre} ${empleado.AppE} ${empleado.ApmE}`
                  .toLowerCase()
                  .includes(filtro.toLowerCase())
              )
              .map((empleado, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{`${empleado.Nombre} ${empleado.AppE} ${empleado.ApmE}`}</td>
                  <td>{format(new Date(empleado.FechaNac), 'dd/MM/yyyy')}</td>
                  <td>{empleado.Correo}</td>
                  <td>{empleado.Region}</td>
                  <td>{empleado.AreaTrabajo}</td>
                  <td>{empleado.Rol}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => abrirModalActualizar(empleado)}
                    >
                      Actualizar
                    </Button>{" "}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => eliminarEmpleado(empleado._id)}
                    >
                      Eliminar
                    </Button>{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}