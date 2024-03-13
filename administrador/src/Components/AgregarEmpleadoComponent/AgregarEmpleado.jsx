import React, { useState, useEffect } from "react";
import { Button, FormControl, Table, Form, Modal } from "react-bootstrap";
import { format } from "date-fns";
import { FaFilter } from "react-icons/fa";
import "../AgregarEmpleadoComponent/css/agregarEmpleado.css";
import Navigation from "../NavigationComponent/Navigation";

export default function AgregarEmpleado() {
  const [empleados, setEmpleados] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [showFiltroRegion, setShowFiltroRegion] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    Nombre: "",
    AppE: "",
    ApmE: "",
    FechaNac: "",
    Correo: "",
    Region: "Guanajuato", // Valor por defecto para Region
    AreaTrabajo: "Desarrollo web", // Valor por defecto para AreaTrabajo
    Rol: "Empleado",
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
      Region: "Guanajuato", // Establecer valor por defecto
      AreaTrabajo: "Desarrollo web", // Establecer valor por defecto
      Rol: "Empleado", // Establecer valor por defecto
    });

  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);

  const [filtroRegion, setFiltroRegion] = useState(""); // Nuevo estado para el filtro por región
  const [filtroArea, setFiltroArea] = useState(""); // Nuevo estado para el filtro por región

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
    setNuevoEmpleado((prevState) => {
      const updatedState = { ...prevState, [name]: value };
      console.log("Nuevo estado de nuevoEmpleado:", updatedState);
      return updatedState;
    });
  };

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const agregarEmpleado = async () => {
    // Validar que los campos requeridos estén llenos
    if (!nuevoEmpleado.Region || !nuevoEmpleado.AreaTrabajo) {
      console.error("Error: Todos los campos son requeridos.");
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario.
      return;
    }

    // Añadir el rol al objeto de nuevo empleado
    const nuevoEmpleadoConRol = { ...nuevoEmpleado, Rol: "Empleado" };

    try {
      const response = await fetch("http://localhost:3002/empleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEmpleadoConRol), // Enviar el nuevo objeto con el rol
      });

      if (!response.ok) {
        const errorData = await response.text(); // Intenta capturar cualquier respuesta no JSON
        console.error("Error en la respuesta:", errorData);
        throw new Error(`Error al agregar empleado: ${errorData}`);
      }

      const data = await response.json();
      setEmpleados([...empleados, data]);
      setNuevoEmpleado({
        Nombre: "",
        AppE: "",
        ApmE: "",
        FechaNac: "",
        Correo: "",
        Region: "",
        AreaTrabajo: "",
        Rol: "", // Limpiar el campo Rol después de agregar un empleado
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
    const fechaFormateada = new Date(empleado.FechaNac)
      .toISOString()
      .split("T")[0]; //Convierte la fecha ISO8601 en un formato leible
    setValoresEmpleadoSeleccionado({
      ...empleado, // Usa directamente el objeto 'empleado' en lugar de asignar campo por campo
      FechaNac: fechaFormateada,
    });
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
          <FaFilter onClick={() => setShowFiltroRegion(!showFiltroRegion)} />
          <Modal
            show={showFiltroRegion}
            onHide={() => setShowFiltroRegion(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Filtrar datos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formRegion">
                  <Form.Label>Selecciona una región</Form.Label>
                  <Form.Control
                    as="select"
                    value={filtroRegion}
                    onChange={(e) => setFiltroRegion(e.target.value)}
                  >
                    <option value="">Todas las regiones</option>
                    <option value="Guanajuato">Guanajuato</option>
                    <option value="Celaya">Celaya</option>
                    <option value="Leon">Leon</option>
                    <option value="Dolores Hidalgo">Dolores Hidalgo</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formArea">
                  <Form.Label>Selecciona una Área</Form.Label>
                  <Form.Control
                    as="select"
                    value={filtroArea}
                    onChange={(e) => setFiltroArea(e.target.value)}
                  >
                    <option value="">Todas las áreas</option>
                    <option value="Desarrollo web">Desarrollo web</option>
                    <option value="Base de datos">Base de datos</option>
                    <option value="Diseño">Diseño</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowFiltroRegion(false)}
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
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
              <Form.Group controlId="formRegion">
                <Form.Label>Region</Form.Label>
                <Form.Control
                  as="select"
                  name="Region"
                  value={nuevoEmpleado.Region}
                  onChange={handleInputChange}
                >
                  <option value="Guanajuato">Guanajuato</option>
                  <option value="Celaya">Celaya</option>
                  <option value="Leon">Leon</option>
                  <option value="Dolores Hidalgo">Dolores Hidalgo</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formArea">
                <Form.Label>Área de Trabajo</Form.Label>
                <Form.Control
                  as="select"
                  name="AreaTrabajo"
                  value={nuevoEmpleado.AreaTrabajo}
                  onChange={handleInputChange}
                >
                  <option value="Desarrollo web">Desarrollo web</option>
                  <option value="Base de datos">Base de datos</option>
                  <option value="Diseño">Diseño</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formRol">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  as="select"
                  name="Rol"
                  value={nuevoEmpleado.Rol}
                  onChange={handleInputChange}
                  disabled // Deshabilitar el campo para evitar cambios
                >
                  <option value="Empleado">Empleado</option>
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
              <Form.Group controlId="formRegionActualizar">
                <Form.Label>Region</Form.Label>
                <Form.Control
                  as="select"
                  name="Region"
                  value={valoresEmpleadoSeleccionado.Region}
                  onChange={(e) =>
                    setValoresEmpleadoSeleccionado({
                      ...valoresEmpleadoSeleccionado,
                      Region: e.target.value,
                    })
                  }
                >
                  <option value="Guanajuato">Guanajuato</option>
                  <option value="Celaya">Celaya</option>
                  <option value="Leon">Leon</option>
                  <option value="Dolores Hidalgo">Dolores Hidalgo</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formAreaActualizar">
                <Form.Label>Área de Trabajo</Form.Label>
                <Form.Control
                  as="select"
                  name="AreaTrabajo"
                  value={valoresEmpleadoSeleccionado.AreaTrabajo}
                  onChange={(e) =>
                    setValoresEmpleadoSeleccionado({
                      ...valoresEmpleadoSeleccionado,
                      AreaTrabajo: e.target.value,
                    })
                  }
                >
                  <option value="Desarrollo web">Desarrollo web</option>
                  <option value="Base de datos">Base de datos</option>
                  <option value="Diseño">Diseño</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formRolActualizar">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  as="select"
                  name="Rol"
                  value={valoresEmpleadoSeleccionado.Rol}
                  onChange={(e) =>
                    setValoresEmpleadoSeleccionado({
                      ...valoresEmpleadoSeleccionado,
                      Rol: e.target.value,
                    })
                    
                  }
                  disabled // Deshabilitar el campo para evitar cambios
                >
                  <option value="Empleado">Empleado</option>
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
                  ?.toLowerCase()
                  .includes(filtro.toLowerCase())
              )
              .filter((empleado) =>
                // Aplicar filtro por región
                empleado.Region.toLowerCase().includes(
                  filtroRegion.toLowerCase()
                )
              )
              .filter((empleado) =>
                // Aplicar filtro por área
                empleado.AreaTrabajo.toLowerCase().includes(
                  filtroArea.toLowerCase()
                )
              )
              .map((empleado, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{`${empleado.Nombre} ${empleado.AppE} ${empleado.ApmE}`}</td>
                  <td>{format(new Date(empleado.FechaNac), "yyyy-MM-dd")}</td>
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
