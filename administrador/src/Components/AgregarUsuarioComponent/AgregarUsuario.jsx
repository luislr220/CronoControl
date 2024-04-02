import React, { useState, useEffect } from "react";
import {
  FormControl,
  Form,
  Modal,
  Alert,
  ProgressBar,
  Button,InputGroup
} from "react-bootstrap";
import { format } from "date-fns";
import "../AgregarUsuarioComponent/css/agregarEmpleado.css";
import Navigation from "../NavigationComponent/Navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

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
    Contraseña: "",
    Region: "",
    AreaTrabajo: "",
    Rol: "",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [administradorSeleccionado, setAdministradorSeleccionado] =
    useState(null);
  const [
    valoresAdministradorSeleccionado,
    setValoresAdministradorSeleccionado,
  ] = useState({
    Nombre: "",
    AppE: "",
    ApmE: "",
    FechaNac: "",
    Correo: "",
    Contraseña: "",
    Region: "",
    AreaTrabajo: "",
    Rol: "", // Establecer valor por defecto
  });

  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);

  const [filtroRegion, setFiltroRegion] = useState(""); // Nuevo estado para el filtro por región
  const [filtroArea, setFiltroArea] = useState(""); // Nuevo estado para el filtro por Área
  const [filtroApellidoModal, setFiltroApellidoModal] = useState(""); // Estado para filtrar por apellido
  const [roles, setRoles] = useState("");
  const [filtroRol, setFiltroRol] = useState("");
  const [errorCorreoDuplicado, setErrorCorreoDuplicado] = useState("");
  const [errorCorreoDuplicadoActualizar, setErrorCorreoDuplicadoActualizar] =
    useState("");
  // Estado para las áreas de trabajo disponibles basadas en la región seleccionada
  const [areasPorRegion, setAreasPorRegion] = useState([]);
  const [areasPorRegionActualizar, setAreasPorRegionActualizar] = useState([]);
  const areasFiltradas = areas.filter((area) => area.sede === filtroRegion);

  //Estados para mostrar advertencia de si desea eliminar
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] =
    useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad de la alerta
  const [progress, setProgress] = useState(0); //Barra de progreso
  const [alertMessage, setAlertMessage] = useState(""); // Mensaje de la alerta
  const [alertVariant, setAlertVariant] = useState("info"); // Estado para controlar el color de la alerta
  const [mostrarContraseña, setMostrarContraseña] = useState(true); // Estado para controlar la visibilidad del input de contraseña

  // Función para mostrar la alerta de confirmación
  const mostrarAlerta = (mensaje, tipoAccion) => {
    let variant;
    switch (tipoAccion) {
      case "eliminar":
        variant = "danger"; // Rojo
        break;
      case "agregar":
        variant = "success"; // Verde
        break;
      case "actualizar":
        variant = "primary"; // Azul
        break;
      default:
        variant = "info"; // Color por defecto si no se especifica un tipo de acción válido
    }

    setAlertVariant(variant); // Establecer el color de la alerta
    setAlertMessage(mensaje); // Establecer el mensaje de la alerta
    setShowAlert(true);
    setProgress(0); // Reiniciar el progreso de la barra
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setShowAlert(false); // Ocultar la alerta cuando el progreso alcance el 100%
        } else {
          return prevProgress + 1;
        }
      });
    }, 30); // Actualizar la barra de progreso cada 30 milisegundos
  };

  // Función para ocultar la alerta de confirmación
  const ocultarAlerta = () => {
    setShowAlert(false);
    setProgress(0); // Reiniciar el progreso de la barra al ocultar la alerta
  };

  useEffect(() => {
    // Función para obtener la lista de administradores, las áreas y sedes desde el backend
    const fetchAdministrador = async () => {
      try {
        const response = await fetch("http://localhost:3002/administrador");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de los administradores");
        }
        const data = await response.json();
        setAdministrador(data);

        // Obtener roles únicos de los datos de administrador
        const rolesUnicos = [
          ...new Set(data.map((administrador) => administrador.Rol)),
        ];
        setRoles(rolesUnicos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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

  //useEffect para mostrar o no el campo contraseña dependiendo del rol
  useEffect(() => {
    if (valoresAdministradorSeleccionado.Rol === "Administrador") {
      // Mostrar el campo de contraseña
      setMostrarContraseña(true);
    } else {
      // Ocultar el campo de contraseña
      setMostrarContraseña(false);
    }
  }, [valoresAdministradorSeleccionado.Rol]);

  // Función para mostrar el modal de confirmación
  const mostrarConfirmacion = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarModalConfirmacion(true);
  };

  // Función para ocultar el modal de confirmación
  const ocultarConfirmacion = () => {
    setMostrarModalConfirmacion(false);
  };

  // Evento para manejar el cambio en el selector de roles
  const handleRolChange = (e) => {
    const rolSeleccionado = e.target.value;
    // Actualizar el estado para mostrar o ocultar el input de contraseña
    if (rolSeleccionado === "Empleado") {
      setMostrarContraseña(false);
    } else {
      setMostrarContraseña(true);
    }
  };

  //CONSTANTE PARA ACTUALIZAR Y LIMPIAR EL FORMULARIO
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "filtroApellidoModal") {
      setFiltroApellidoModal(value);
    } else if (mostrarModalActualizar) {
      setValoresAdministradorSeleccionado((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      if (name === "Correo") {
        setErrorCorreoDuplicadoActualizar(""); // Limpiar solo cuando se cambie el correo electrónico
      }
    } else {
      setNuevoAdministrador((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      if (name === "Correo") {
        setErrorCorreoDuplicado(""); // Limpiar solo cuando se cambie el correo electrónico
      }
    }
  };

  //CONSTANTE PARA LOS FILTRO
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

  //CONSTANTE DE AGREGAR USUARIO

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
    const nuevoAdministradorConRol = {
      ...nuevoAdministrador,
    };

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
        Contraseña: "",
        Region: "",
        AreaTrabajo: "",
        Rol: "", // Limpiar el campo Rol después de agregar un empleado
      });
      setMostrarFormulario(false);

      // Limpiar el estado de errorCorreoDuplicado
      setErrorCorreoDuplicado("");
      mostrarAlerta("El usuario se ha agregado correctamente.", "agregar");
    } catch (error) {
      console.error(error);
    }
  };

  //CONSTANTE PARA ELIMINAR A UN USUARIO
  const eliminarAdministrador = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3002/administrador/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("No se pudo eliminar el administrador");
      }
      const nuevosAdministradores = administrador.filter(
        (administrador) => administrador._id !== id
      );
      setAdministrador(nuevosAdministradores);
      ocultarConfirmacion(); // Aquí cierras el modal de confirmación después de eliminar al usuario

      // Mostrar la alerta de confirmación
      mostrarAlerta("El usuario se ha Eliminado correctamente.", "eliminar");
    } catch (error) {
      console.error(error);
    }
  };

  //CONSTANTES PARA EL MODAL DE ACTUALIZAR
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

  //CONSTANTE PARA ACTUALIZAR AL USUARIO
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
      mostrarAlerta(
        "El usuario se ha Actualizado correctamente.",
        "actualizar"
      );
    } catch (error) {
      console.error(error);
      setErrorCorreoDuplicadoActualizar("Error al actualizar el empleado");
    }
  };

  //FUNCIONES DEL AVATAR DEL USUARIO
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(Nombre) {
    // Verificar si el nombre tiene al menos dos partes separadas por un espacio
    const nombreParts = Nombre.split(" ");
    if (nombreParts.length >= 2) {
      return {
        sx: {
          bgcolor: stringToColor(Nombre),
          width: 150,
          height: 150,
          fontSize: 80,
        },
        children: `${nombreParts[0][0]}${nombreParts[1][0]}`,
      };
    } else if (nombreParts.length === 1) {
      // Si el nombre tiene solo una parte, usar la primera letra de esa parte
      return {
        sx: {
          bgcolor: stringToColor(Nombre),
          width: 150,
          height: 150,
          fontSize: 80,
        },
        children: `${nombreParts[0][0]}`,
      };
    } else {
      // Si el nombre no tiene el formato esperado, manejarlo según sea necesario
      return {
        sx: {
          bgcolor: stringToColor(Nombre),
          width: 150,
          height: 150,
          fontSize: 80,
        },
        children: "", // O proporcionar una cadena predeterminada
      };
    }
  }

  return (
    <div>
      <Navigation />
      <div className="AGEMcontenedorUsuario">
        {/*SECCIÓN DE BOTON AGREGAR Y FILTROS*/}
        <div className="AGEMBotonContainerUsuario">
          <Button
            variant="primary"
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
          <Form.Control
            as="select"
            className="AGEMBuscador"
            value={filtroRol} // Utiliza filtroRol en lugar de roles aquí
            onChange={(e) => setFiltroRol(e.target.value)}
          >
            <option value="">Todos los roles</option>
            {loading ? (
              <option disabled>Cargando roles...</option>
            ) : (
              roles.map((rol, index) => (
                <option key={index} value={rol}>
                  {rol}
                </option>
              ))
            )}
          </Form.Control>
        </div>

        {/*MODAL PARA AGREGAR UN Administrador */}
        <Modal
          show={mostrarFormulario}
          onHide={() => setMostrarFormulario(false)}
        >
          <Modal.Header closeButton style={{ backgroundColor: "#1C2B67" }}>
            <Modal.Title style={{ color: "#FFFFFF" }}>
              Agregar Usuario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Nombre
                </Form.Label>
                <FormControl
                  type="text"
                  name="Nombre"
                  value={nuevoAdministrador.Nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formAppE">
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Apellido Paterno
                </Form.Label>
                <FormControl
                  type="text"
                  name="AppE"
                  value={nuevoAdministrador.AppE}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formApmE">
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Apellido Materno
                </Form.Label>
                <FormControl
                  type="text"
                  name="ApmE"
                  value={nuevoAdministrador.ApmE}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formFechaNac">
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Fecha de Nacimiento
                </Form.Label>
                <FormControl
                  type="date"
                  name="FechaNac"
                  value={nuevoAdministrador.FechaNac}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCorreo">
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Correo
                </Form.Label>
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

              <Form.Group controlId="formRol">
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Rol
                </Form.Label>
                <Form.Control
                  as="select"
                  name="Rol"
                  value={nuevoAdministrador.Rol}
                  onChange={(e) => {
                    handleInputChange(e); // Manejar el cambio de forma común
                    handleRolChange(e); // Llamar al manejador de cambio de rol
                  }}
                >
                  <option value="">Selecciona un rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Empleado">Empleado</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formContraseña">
                {mostrarContraseña && (
                  <>
                    <Form.Label
                      style={{ color: "#1C2B67", fontWeight: "bold" }}
                    >
                      Contraseña
                    </Form.Label>
                    <FormControl
                      type="password"
                      name="Contraseña"
                      value={nuevoAdministrador.Contraseña}
                      onChange={handleInputChange}
                    />
                  </>
                )}
              </Form.Group>

              <Form.Group controlId="formRegion">
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Sede
                </Form.Label>
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
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Área de Trabajo
                </Form.Label>
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="AGEMBotonverde"
              onClick={agregarAdministrador}
            >
              Agregar
            </Button>
            <Button
              variant="primary"
              className="AGEMBotonverde"
              onClick={() => setMostrarFormulario(false)}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para actualizar */}
        <Modal show={mostrarModalActualizar} onHide={cerrarModalActualizar}>
          <Modal.Header closeButton style={{ backgroundColor: "#1C2B67" }}>
            <Modal.Title style={{ color: "#FFFFFF" }}>
              Actualizar Usuario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombreActualizar">
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Nombre
                </Form.Label>
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
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Apellido Paterno
                </Form.Label>
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
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Apellido Materno
                </Form.Label>
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
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Fecha de Nacimiento
                </Form.Label>
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
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Correo
                </Form.Label>
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

              <Form.Group controlId="formRolActualizar">
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Rol
                </Form.Label>
                <Form.Control
                  as="select"
                  name="Rol"
                  value={valoresAdministradorSeleccionado.Rol}
                  onChange={(e) => {
                    const nuevoRol = e.target.value;
                    setValoresAdministradorSeleccionado({
                      ...valoresAdministradorSeleccionado,
                      Rol: nuevoRol,
                      Contraseña:
                        nuevoRol === "Empleado"
                          ? ""
                          : valoresAdministradorSeleccionado.Contraseña, // Resetear la contraseña si el nuevo rol es "Empleado"
                    });
                  }}
                >
                  <option value="">Selecciona un rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Empleado">Empleado</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formContraseñaActualizar">
                {valoresAdministradorSeleccionado.Rol === "Administrador" && (
                  <div>
                    <Form.Label
                      style={{ color: "#1C2B67", fontWeight: "bold" }}
                    >
                      Nueva Contraseña
                    </Form.Label>
                    <InputGroup>
                      <FormControl
                        type={mostrarContraseña ? "password" : "text"}
                        name="Contraseña"
                        value={valoresAdministradorSeleccionado.Contraseña}
                        onChange={handleInputChange}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setMostrarContraseña(!mostrarContraseña)}
                      >
                        {mostrarContraseña ? "Mostrar" : "Ocultar"}
                      </Button>
                    </InputGroup>
                  </div>
                )}
              </Form.Group>

              <Form.Group controlId="formRegionActualizar">
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Sede
                </Form.Label>
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
                <Form.Label style={{ color: "#1C2B67", fontWeight: "bold" }}>
                  Área de Trabajo
                </Form.Label>
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="AGEMBotonverde"
              onClick={actualizarAdministrador}
            >
              Actualizar
            </Button>
            <Button
              variant="primary"
              className="AGEMBotonverde"
              onClick={cerrarModalActualizar}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* MODAL PARA CONFIRMAR SI DESEA ELIMINAR*/}
        <Modal show={mostrarModalConfirmacion} onHide={ocultarConfirmacion}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que quieres eliminar este usuario?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="AGEMBotonverde"
              onClick={() => eliminarAdministrador(usuarioAEliminar._id)}
            >
              Sí, eliminar
            </Button>

            <Button
              variant="primary"
              className="AGEMBotonverde"
              onClick={ocultarConfirmacion}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        {/*ALERTA QUE SE MUESTRA CUANDO SE AGREGA, ACTUALIZA Y ELIMINA A UN USUARIO */}
        <Alert
          show={showAlert}
          variant={alertVariant} // Usar alertVariant para establecer el color de la alerta
          onClose={ocultarAlerta}
          dismissible
        >
          {alertMessage}
          <ProgressBar now={progress} />
        </Alert>

        {/*CARDS PARA MOSTRAR A LOS USUARIOS*/}
        <Grid container spacing={2}>
          {administrador
            .filter((administrador) =>
              administrador.Nombre.toLowerCase().includes(filtro.toLowerCase())
            )
            .filter((administrador) =>
              administrador.Region.toLowerCase().includes(
                filtroRegion.toLowerCase()
              )
            )
            .filter((administrador) =>
              administrador.AreaTrabajo.toLowerCase().includes(
                filtroArea.toLowerCase()
              )
            )
            .filter((administrador) =>
              `${administrador.AppE} ${administrador.ApmE}`
                .toLowerCase()
                .includes(filtroApellidoModal.toLowerCase())
            )
            .filter(
              (administrador) =>
                filtroRol === "" ||
                administrador.Rol.toLowerCase().includes(
                  filtroRol.toLowerCase()
                )
            )
            .map((administrador, index) => (
              <Grid
                key={index}
                item
                xl={2}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                sx={{ width: "100%", p: 2 }}
                className="GridCardUsuario"
              >
                <Card
                  sx={{
                    maxWidth: 300,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  className="AGEMCard"
                >
                  <CardActionArea>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ display: "flex", justifyContent: "center", pt: 2 }}
                    >
                      <Avatar {...stringAvatar(administrador.Nombre)} />
                    </Stack>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {`${administrador.Nombre} ${administrador.AppE} ${administrador.ApmE}`}
                      </Typography>
                      <Typography variant="body2">
                        Correo: {administrador.Correo}
                      </Typography>
                      {administrador.Rol === "Administrador" && (
                        <Typography variant="body2">
                          Contraseña:{" "}
                          {administrador.Contraseña.replace(/./g, "*")}{" "}
                          {/* Reemplaza cada carácter de la contraseña con un asterisco */}
                        </Typography>
                      )}
                      <Typography variant="body2">
                        Rol: {administrador.Rol}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Fecha de nacimiento:{" "}
                        {format(new Date(administrador.FechaNac), "yyyy-MM-dd")}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Sede: {administrador.Region}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Área: {administrador.AreaTrabajo}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className="myCardActions">
                    <Button
                      variant="primary"
                      className="AGEMBotonverde"
                      onClick={() => abrirModalActualizar(administrador)}
                    >
                      Actualizar
                    </Button>{" "}
                    <Button
                      variant="primary"
                      className="AGEMBotonverde"
                      onClick={() => mostrarConfirmacion(administrador)}
                    >
                      Eliminar
                    </Button>{" "}
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}
