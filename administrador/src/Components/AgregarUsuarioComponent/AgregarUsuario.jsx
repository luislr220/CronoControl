import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Table,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import { format } from "date-fns";
import "../AgregarEmpleadoComponent/css/agregarEmpleado.css";
import Navigation from "../NavigationComponent/Navigation";

export default function AgregarUsuario() {
  const [administrador, setAdministrador] = useState([]);
  const [filtro, setFiltro] = useState(""); // Filtro por nombre
  const [sedes, setSedes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoAdministrador, setNuevoAdministrador] = useState({
    Nombre: "",
    AppE: "",
    ApmE: "",
    FechaNac: "",
    Correo: "",
    Region: "",
    AreaTrabajo: "",
    Rol: "Administrador",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [administradorSeleccionado, setAdministradorSeleccionado] = useState(null);
  const [valoresAdministradorSeleccionado, setValoresAdministradorSeleccionado] =
    useState({
      Nombre: "",
      AppE: "",
      ApmE: "",
      FechaNac: "",
      Correo: "",
      Region: "",
      AreaTrabajo: "",
      Rol: "Administrador", // Establecer valor por defecto
    });

  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);

  const [filtroRegion, setFiltroRegion] = useState(""); // Nuevo estado para el filtro por región
  const [filtroArea, setFiltroArea] = useState(""); // Nuevo estado para el filtro por Área
  const [filtroApellidoModal, setFiltroApellidoModal] = useState(""); // Estado para filtrar por apellido
  const [errorCorreoDuplicado, setErrorCorreoDuplicado] = useState("");
  const [errorCorreoDuplicadoActualizar, setErrorCorreoDuplicadoActualizar] =
    useState("");
  // Estado para las áreas de trabajo disponibles basadas en la región seleccionada
  const [areasPorRegion, setAreasPorRegion] = useState([]);
  const [areasPorRegionActualizar, setAreasPorRegionActualizar] = useState([]);
  const areasFiltradas = areas.filter((area) => area.sede === filtroRegion);

  useEffect(() => {
    // Función para obtener la lista de empleados, las áres y sedes desde el backend
    const fetchAdministrador = async () => {
      try {
        const response = await fetch("http://localhost:3002/administrador");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de los administradores");
        }
        const data = await response.json();
        setAdministrador(data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchSedes = async () => {
      try {
        const response = await fetch("http://localhost:3002/sedes");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de sedes");
        }
        const data = await response.json();
        setSedes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAreas = async () => {
      try {
        const response = await fetch("http://localhost:3002/areas");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de areas");
        }
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdministrador();
    fetchSedes();
    fetchAreas();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "filtroApellidoModal") {
      setFiltroApellidoModal(value);
    } else if (mostrarModalActualizar) {
      // Asegúrate de que solo se actualice el estado cuando se muestre el formulario de actualización
      setValoresAdministradorSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrorCorreoDuplicadoActualizar(""); // Limpia el estado de errorCorreoDuplicadoActualizar cuando se realiza un cambio en el formulario de actualización
    } else {
      setNuevoAdministrador((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setErrorCorreoDuplicado(""); // Limpia el estado de errorCorreoDuplicado cuando se realiza un cambio en el formulario de agregar
    }
  };

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  // Función para filtrar las áreas de trabajo disponibles basadas en la región seleccionada
  const filtrarAreasPorRegion = (regionSeleccionada) => {
    const areasFiltradas = areas.filter(
      (area) => area.sede === regionSeleccionada
    );
    setAreasPorRegion(areasFiltradas);
  };

  // Función para manejar el cambio en la región seleccionada
  const handleRegionChange = (event) => {
    const regionSeleccionada = event.target.value;
    setNuevoAdministrador((prevState) => ({
      ...prevState,
      Region: regionSeleccionada,
    }));
    filtrarAreasPorRegion(regionSeleccionada); // Añadimos esta línea para actualizar las áreas disponibles
    setFiltroArea(""); // Limpiamos el filtro de área al cambiar la región seleccionada
  };

  const agregarAdministrador = async () => {
    // Validar que los campos requeridos estén llenos
    if (!nuevoAdministrador.Region || !nuevoAdministrador.AreaTrabajo) {
      console.error("Error: Todos los campos son requeridos.");
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario.
      return;
    }

    // Verificar si el correo electrónico ya está en uso
    const correoExistente = administrador.find(
      (administrador) => administrador.Correo === nuevoAdministrador.Correo
    );

    if (correoExistente) {
      setErrorCorreoDuplicado("Este correo electrónico ya está en uso");
      return;
    }

    // Añadir el rol al objeto de nuevo empleado
    const nuevoAdministradorConRol = { ...nuevoAdministrador, Rol: "Administrador" };

    try {
      const response = await fetch("http://localhost:3002/administrador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAdministradorConRol), // Enviar el nuevo objeto con el rol
      });

      if (!response.ok) {
        const errorData = await response.text(); // Intenta capturar cualquier respuesta no JSON
        console.error("Error en la respuesta:", errorData);
        throw new Error(`Error al agregar empleado: ${errorData}`);
      }

      const data = await response.json();
      setAdministrador([...administrador, data]);
      setNuevoAdministrador({
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

      // Limpiar el estado de errorCorreoDuplicado
      setErrorCorreoDuplicado("");
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarAdministrador = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/administrador/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar el administrador");
      }
      const nuevosAdministradores = administrador.filter(
        (administrador) => administrador._id !== id
      );
      setAdministrador(nuevosAdministradores);
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModalActualizar = (administrador) => {
    setAdministradorSeleccionado(administrador);
    const fechaFormateada = new Date(administrador.FechaNac)
      .toISOString()
      .split("T")[0]; //Convierte la fecha ISO8601 en un formato leible
      setValoresAdministradorSeleccionado({
      ...administrador, // Usa directamente el objeto 'empleado' en lugar de asignar campo por campo
      FechaNac: fechaFormateada,
    });
    setMostrarModalActualizar(true);

    // Filtrar las áreas por región seleccionada
    const areasFiltradas = areas.filter(
      (area) => area.sede === administrador.Region
    );
    setAreasPorRegionActualizar(areasFiltradas);
  };

  const cerrarModalActualizar = () => {
    setAdministradorSeleccionado(null);
    setMostrarModalActualizar(false);
  };

  const actualizarAdministrador = async () => {
    try {
      // Verificar si el correo electrónico ya está en uso
      const correoExistente = administrador.find(
        (administrador) =>
          administrador.Correo === valoresAdministradorSeleccionado.Correo &&
          administrador._id !== administradorSeleccionado._id
      );

      if (correoExistente) {
        setErrorCorreoDuplicadoActualizar(
          "Este correo electrónico ya está en uso"
        );
        return;
      }

      const response = await fetch(
        `http://localhost:3002/administrador/${administradorSeleccionado._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valoresAdministradorSeleccionado),
        }
      );
      if (!response.ok) {
        throw new Error("No se pudo actualizar el empleado");
      }
      const data = await response.json();
      const index = administrador.findIndex(
        (e) => e._id === administradorSeleccionado._id
      );
      const nuevosAdministradores = [...administrador];
      nuevosAdministradores[index] = data;
      setAdministrador(nuevosAdministradores);
      cerrarModalActualizar();
    } catch (error) {
      console.error(error);
      setErrorCorreoDuplicadoActualizar("Error al actualizar el empleado");
    }
  };

  return (
    <div>
      <Navigation />
      <h2 className="AGEMTitulo">Dar de alta a Administrador</h2>
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
            placeholder="Buscar por nombre..."
            className="AGEMBuscador"
            value={filtro}
            onChange={handleFiltroChange}
          />
          <FormControl
            type="text"
            placeholder="Buscar por apellido..."
            className="AGEMBuscador"
            value={filtroApellidoModal}
            name="filtroApellidoModal"
            onChange={handleInputChange}
          />
          <Form.Control
            as="select"
            className="AGEMBuscador"
            value={filtroRegion}
            onChange={(e) => setFiltroRegion(e.target.value)}
          >
            <option value="">Todas las sedes</option>
            {loading ? (
              <option disabled>Cargando sedes...</option>
            ) : (
              sedes.map((sede) => (
                <option key={sede._id} value={sede.nombre}>
                  {sede.nombre}
                </option>
              ))
            )}
          </Form.Control>
          <Form.Control
            as="select"
            className="AGEMBuscador"
            value={filtroArea}
            onChange={(e) => setFiltroArea(e.target.value)}
          >
            <option value="">Todas las áreas</option>
            {loading ? (
              <option disabled>Cargando áreas...</option>
            ) : (
              areasFiltradas.map(
                (
                  area // Utilizamos areasFiltradas aquí
                ) => (
                  <option key={area._id} value={area.nombre}>
                    {area.nombre}
                  </option>
                )
              )
            )}
          </Form.Control>
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
                  value={nuevoAdministrador.Nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formAppE">
                <Form.Label>Apellido Paterno</Form.Label>
                <FormControl
                  type="text"
                  name="AppE"
                  value={nuevoAdministrador.AppE}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formApmE">
                <Form.Label>Apellido Materno</Form.Label>
                <FormControl
                  type="text"
                  name="ApmE"
                  value={nuevoAdministrador.ApmE}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formFechaNac">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <FormControl
                  type="date"
                  name="FechaNac"
                  value={nuevoAdministrador.FechaNac}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCorreo">
                <Form.Label>Correo</Form.Label>
                <FormControl
                  type="email"
                  name="Correo"
                  value={nuevoAdministrador.Correo}
                  onChange={handleInputChange}
                />
                {errorCorreoDuplicado && (
                  <Alert variant="danger">{errorCorreoDuplicado}</Alert>
                )}
              </Form.Group>

              <Form.Group controlId="formRegion">
                <Form.Label>Sede</Form.Label>
                <Form.Control
                  as="select"
                  name="Region"
                  value={nuevoAdministrador.Region}
                  onChange={handleRegionChange}
                >
                  <option value="">Selecciona una Sede</option>
                  {loading ? (
                    <option disabled>Cargando sedes...</option>
                  ) : (
                    sedes.map((sede) => (
                      <option key={sede._id} value={sede.nombre}>
                        {sede.nombre}
                      </option>
                    ))
                  )}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formArea">
                <Form.Label>Área de Trabajo</Form.Label>
                <Form.Control
                  as="select"
                  name="AreaTrabajo"
                  value={nuevoAdministrador.AreaTrabajo}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona una área</option>
                  {loading ? (
                    <option disabled>Cargando áreas...</option>
                  ) : (
                    areasPorRegion.map((area) => (
                      <option key={area._id} value={area.nombre}>
                        {area.nombre}
                      </option>
                    ))
                  )}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formRol">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  as="select"
                  name="Rol"
                  value={nuevoAdministrador.Rol}
                  onChange={handleInputChange}
                  disabled // Deshabilitar el campo para evitar cambios
                >
                  <option value="Administrador">Administrador</option>
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
            <Button variant="primary" onClick={agregarAdministrador}>
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
                  value={valoresAdministradorSeleccionado.Nombre}
                  onChange={(e) =>
                    setValoresAdministradorSeleccionado({
                      ...valoresAdministradorSeleccionado,
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
                  value={valoresAdministradorSeleccionado.AppE}
                  onChange={(e) =>
                    setValoresAdministradorSeleccionado({
                      ...valoresAdministradorSeleccionado,
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
                  value={valoresAdministradorSeleccionado.ApmE}
                  onChange={(e) =>
                    setValoresAdministradorSeleccionado({
                      ...valoresAdministradorSeleccionado,
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
                  value={valoresAdministradorSeleccionado.FechaNac}
                  onChange={(e) =>
                    setValoresAdministradorSeleccionado({
                      ...valoresAdministradorSeleccionado,
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
                  value={valoresAdministradorSeleccionado.Correo}
                  onChange={handleInputChange}
                />
                {errorCorreoDuplicadoActualizar && (
                  <Alert variant="danger">
                    {errorCorreoDuplicadoActualizar}
                  </Alert>
                )}
              </Form.Group>

              <Form.Group controlId="formRegionActualizar">
                <Form.Label>Sede</Form.Label>
                <Form.Control
                  as="select"
                  name="Region"
                  value={valoresAdministradorSeleccionado.Region}
                  onChange={(e) => {
                    const regionSeleccionada = e.target.value;
                    setValoresAdministradorSeleccionado({
                      ...valoresAdministradorSeleccionado,
                      Region: regionSeleccionada,
                    });
                    // Filtrar las áreas por región seleccionada
                    const areasFiltradas = areas.filter(
                      (area) => area.sede === regionSeleccionada
                    );
                    setAreasPorRegionActualizar(areasFiltradas);
                  }}
                >
                  <option value="">Selecciona una sede</option>
                  {sedes.map((sede) => (
                    <option key={sede._id} value={sede.nombre}>
                      {sede.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formAreaActualizar">
                <Form.Label>Área de Trabajo</Form.Label>
                <Form.Control
                  as="select"
                  name="AreaTrabajo"
                  value={valoresAdministradorSeleccionado.AreaTrabajo}
                  onChange={(e) =>
                    setValoresAdministradorSeleccionado({
                      ...valoresAdministradorSeleccionado,
                      AreaTrabajo: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una área</option>
                  {areasPorRegionActualizar.map((area) => (
                    <option key={area._id} value={area.nombre}>
                      {area.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formRolActualizar">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  as="select"
                  name="Rol"
                  value={valoresAdministradorSeleccionado.Rol}
                  onChange={(e) =>
                    setValoresAdministradorSeleccionado({
                      ...valoresAdministradorSeleccionado,
                      Rol: e.target.value,
                    })
                  }
                  disabled // Deshabilitar el campo para evitar cambios
                >
                  <option value="Administrador">Administrador</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModalActualizar}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={actualizarAdministrador}>
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
              <th>Sede</th>
              <th>Área</th>
              <th>Rol</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {administrador
              .filter((administrador) =>
              administrador.Nombre.toLowerCase().includes(filtro.toLowerCase())
              )
              .filter((administrador) =>
                // Aplicar filtro por región
                administrador.Region.toLowerCase().includes(
                  filtroRegion.toLowerCase()
                )
              )
              .filter((administrador) =>
                // Aplicar filtro por área
                administrador.AreaTrabajo.toLowerCase().includes(
                  filtroArea.toLowerCase()
                )
              )
              .filter((administrador) =>
                //Aplicar Filtro por apellido
                `${administrador.AppE} ${administrador.ApmE}`
                  ?.toLowerCase()
                  .startsWith(filtroApellidoModal.toLowerCase())
              )
              .map((administrador, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{`${administrador.Nombre} ${administrador.AppE} ${administrador.ApmE}`}</td>
                  <td>{format(new Date(administrador.FechaNac), "yyyy-MM-dd")}</td>
                  <td>{administrador.Correo}</td>
                  <td>{administrador.Region}</td>
                  <td>{administrador.AreaTrabajo}</td>
                  <td>{administrador.Rol}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => abrirModalActualizar(administrador)}
                    >
                      Actualizar
                    </Button>{" "}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => eliminarAdministrador(administrador._id)}
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
