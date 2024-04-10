/**
 * Nombre del Autor: Luis Armando Largo Ramirez
 *
 * Funcionalidad:
 * Componente principal para agregar usuarios, mostrar lista de usuarios y realizar operaciones CRUD.
 * Este componente renderiza un formulario para agregar nuevos usuarios, así como una lista de usuarios existentes.
 * También permite actualizar y eliminar usuarios existentes.
 * También tiene un boton para la carga de archivos, donde renderiza el componente
 */

import React, { useState, useEffect } from "react";
import "../AgregarUsuarioComponent/css/agregarEmpleado.css";
import { FormControl, Form, Alert, ProgressBar, Button } from "react-bootstrap";
import { useAuth } from "../../routes/AuthContext";
import Navigation from "../NavigationComponent/Navigation";
import BTNSobrecarga from "./btnSobrecarga";
import UsuarioGrid from "./usuarioGrid";
import AgregarUsuarioModal from "./AgregarUsuarioModal";
import ActualizarUsuarioModal from "./ActualizarUsuarioModal";
import ConfirmarEliminacionModal from "./ConfirmarEliminacionModal";

export default function AgregarUsuario() {
  //Estado para saber los datos del usuario autenticado
  const { user } = useAuth();
  //Estado para almecenar el rol edl usuario autenticado
  const [rolUsuarioActual, setRolUsuarioActual] = useState("");
  // Estado para los datos del administrador
  const [administrador, setAdministrador] = useState([]);
  // Estado para filtrar al usuario
  const [filtro, setFiltro] = useState("");
  // Estado para los datos de la sede
  const [sedes, setSedes] = useState([]);
  // Estado para los datos de area
  const [areas, setAreas] = useState([]);
  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(true);

  // Estado para los datos del nuevo administrador a agregar
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

  // Estado para controlar la visibilidad del formulario de agregar usuario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estado para el administrador seleccionado para actualizar
  const [administradorSeleccionado, setAdministradorSeleccionado] =
    useState(null);

  // Estado para los valores del administrador seleccionado para actualizar
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
    Rol: "",
  });

  // Estado para controlar la visibilidad del modal de actualización
  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  // Estado para filtrar por región
  const [filtroRegion, setFiltroRegion] = useState("");
  // Estado para filtrar por Área
  const [filtroArea, setFiltroArea] = useState("");
  // Estado para filtrar por apellido
  const [filtroApellidoModal, setFiltroApellidoModal] = useState("");
  // Estado para los roles
  const [roles, setRoles] = useState([]);
  // Estado para filtrar por rol
  const [filtroRol, setFiltroRol] = useState("");
  // Estado para controlar si el correo está duplicado al agregar un usuario
  const [errorCorreoDuplicado, setErrorCorreoDuplicado] = useState("");
  // Estado para controlar si el correo está duplicado al actualizar un usuario
  const [errorCorreoDuplicadoActualizar, setErrorCorreoDuplicadoActualizar] =
    useState("");
  // Estado para las áreas de trabajo disponibles basadas en la sede seleccionada
  const [areasPorRegion, setAreasPorRegion] = useState([]);
  // Estado para las áreas de trabajo disponibles basadas en la sede seleccionada para actualizar
  const [areasPorRegionActualizar, setAreasPorRegionActualizar] = useState([]);
  // Estado para las áreas de trabajo disponibles basadas en la sede seleccionada para actualizar
  const areasFiltradas = areas.filter((area) => area.sede === filtroRegion);

  // Estado para mostrar el modal de confirmación al eliminar un usuario
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] =
    useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad de la alerta
  const [progress, setProgress] = useState(0); //Barra de progreso
  const [alertMessage, setAlertMessage] = useState(""); // Mensaje de la alerta
  const [alertVariant, setAlertVariant] = useState("info"); // Estado para controlar el color de la alerta
  const [mostrarContraseña, setMostrarContraseña] = useState(true); // Estado para controlar la visibilidad del input de contraseña

  // Estado para mostrar la alerta de confirmación
  const mostrarAlerta = (mensaje, tipoAccion) => {
    let variant;
    switch (tipoAccion) {
      case "eliminar":
        variant = "danger"; // Eliminado
        break;
      case "agregar":
        variant = "success"; // agregado
        break;
      case "actualizar":
        variant = "primary"; // Actualizado
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

  // Estado para ocultar la alerta de confirmación
  const ocultarAlerta = () => {
    setShowAlert(false);
    setProgress(0); // Reiniciar el progreso de la barra al ocultar la alerta
  };

  //useEffect para usuarios autenticados
  useEffect(() => {
    // Verifica si hay un usuario autenticado y establece el rol del usuario actual
    if (user) {
      setRolUsuarioActual(user.Rol);
    }
  }, [user]);


// useEffect para obtener la lista de administradores, las áreas y sedes desde el backend
  useEffect(() => {
    const fetchAdministrador = async () => {
      try {
        const response = await fetch("http://localhost:3002/administrador");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de los administradores");
        }
        const data = await response.json();
        setAdministrador(data);

        // Estado para obtener roles únicos de los datos de administrador
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

    //Estado para obtener las sedes
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

    //Obtener las areas
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

  //Estado para mostrar el modal de confirmación
  const mostrarConfirmacion = (usuario) => {
    setUsuarioAEliminar(usuario);
    setMostrarModalConfirmacion(true);
  };

  //Estado para ocultar el modal de confirmación
  const ocultarConfirmacion = () => {
    setMostrarModalConfirmacion(false);
  };

  //Estado para manejar el cambio en el selector de roles
  const handleRolChange = (e) => {
    const rolSeleccionado = e.target.value;
    // Actualizar el estado para mostrar o ocultar el input de contraseña
    if (rolSeleccionado === "Empleado") {
      setMostrarContraseña(false);
    } else {
      setMostrarContraseña(true);
    }
  };

  //ESTADO PARA ACTUALIZAR Y LIMPIAR EL FORMULARIO
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

  //ESTADO PARA LOS FILTROS
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  //Estado para filtrar las áreas de trabajo disponibles basadas en la región seleccionada
  const filtrarAreasPorRegion = (regionSeleccionada) => {
    const areasFiltradas = areas.filter(
      (area) => area.sede === regionSeleccionada
    );
    setAreasPorRegion(areasFiltradas);
  };

  //Estado para manejar el cambio en la región seleccionada
  const handleRegionChange = (event) => {
    const regionSeleccionada = event.target.value;
    setNuevoAdministrador((prevState) => ({
      ...prevState,
      Region: regionSeleccionada,
    }));
    filtrarAreasPorRegion(regionSeleccionada);
    setFiltroArea(""); // Limpiamos el filtro de área al cambiar la región seleccionada
  };

  //ESTADO DE AGREGAR USUARIO
  const agregarAdministrador = async () => {
    // Validar que los campos requeridos estén llenos (solo se agregan estos porque eran los unicos que no se 
  //agregaban a la base de datos aunque fueran requeridos)
    if (!nuevoAdministrador.Region || !nuevoAdministrador.AreaTrabajo) {
      console.error("Error: Todos los campos son requeridos.");
      return;
    }

    // Verificar si el correo electrónico ya está en uso
    const correoExistente = administrador.find(
      (administrador) => administrador.Correo === nuevoAdministrador.Correo
    );

    //Verificar si el correo es existente y manejar el error
    if (correoExistente) {
      setErrorCorreoDuplicado("Este correo electrónico ya está en uso");
      return;
    }

    // Añadir el rol al objeto de nuevo empleado
    const nuevoAdministradorConRol = {
      ...nuevoAdministrador,
    };

    //Manjear la solicitud post para nuevo administrador
    try {
      const response = await fetch("http://localhost:3002/administrador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAdministradorConRol)
      });

      if (!response.ok) {
        const errorData = await response.text();
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
        Rol: "",
      });
      setMostrarFormulario(false);

      // Limpiar el estado de errorCorreoDuplicado
      setErrorCorreoDuplicado("");
      mostrarAlerta("El usuario se ha agregado correctamente.", "agregar");
    } catch (error) {
      console.error(error);
    }
  };

  //ESTADO PARA ELIMINAR A UN USUARIO
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
      ocultarConfirmacion();

      // Mostrar la alerta de confirmación
      mostrarAlerta("El usuario se ha Eliminado correctamente.", "eliminar");
    } catch (error) {
      console.error(error);
    }
  };

  //ESTADO PARA EL MODAL DE ACTUALIZAR Y NOSTRAR LOS DATOS EN EL FORMULARIO EL USUARIO SELECCIONADO
  const abrirModalActualizar = (administrador) => {
    setAdministradorSeleccionado(administrador);
    const fechaFormateada = new Date(administrador.FechaNac)
      .toISOString()
      .split("T")[0]; //Convierte la fecha ISO8601 en un formato leible
    setValoresAdministradorSeleccionado({
      ...administrador, // Usa directamente el objeto en lugar de asignar campo por campo
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

  //ESTADO PARA ACTUALIZAR AL USUARIO
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

  return (
    <div>
      <Navigation />
      <div className="AGEMcontenedorUsuario">
        {/**Componente que contiene el boton y logica para la carga de archivos */}
        <BTNSobrecarga />
        <br />
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
                  area
                ) => (
                  <option key={area._id} value={area.nombre}>
                    {area.nombre}
                  </option>
                )
              )
            )}
          </Form.Control>
          {rolUsuarioActual !== "Administrador" && (
            <Form.Control
              as="select"
              className="AGEMBuscador"
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
            >
              <option value="">Todos los roles</option>
              {loading ? (
                <option disabled>Cargando roles...</option>
              ) : (
                Array.isArray(roles) &&
                roles.map(
                  (rol, index) =>
                    // No mostrar la opción 'root' si el usuario actual es un root
                    (rolUsuarioActual !== "root" || rol !== "root") && (
                      <option key={index} value={rol}>
                        {rol}
                      </option>
                    )
                )
              )}
            </Form.Control>
          )}
        </div>

        {/*MODAL PARA AGREGAR UN Administrador */}
        <AgregarUsuarioModal
          mostrar={mostrarFormulario}
          onClose={() => setMostrarFormulario(false)}
          nuevoAdministrador={nuevoAdministrador}
          handleInputChange={handleInputChange}
          handleRegionChange={handleRegionChange}
          agregarAdministrador={agregarAdministrador}
          loading={loading}
          sedes={sedes}
          areasPorRegion={areasPorRegion}
          errorCorreoDuplicado={errorCorreoDuplicado}
          handleRolChange={handleRolChange}
          mostrarContraseña={mostrarContraseña}
          rolUsuarioActual={rolUsuarioActual}
        />

        {/* Modal para actualizar */}
        <ActualizarUsuarioModal
          mostrar={mostrarModalActualizar}
          onClose={cerrarModalActualizar}
          valoresAdministradorSeleccionado={valoresAdministradorSeleccionado}
          handleInputChange={handleInputChange}
          handleRegionChange={handleRegionChange}
          actualizarAdministrador={actualizarAdministrador}
          loading={loading}
          sedes={sedes}
          areasPorRegionActualizar={areasPorRegionActualizar}
          errorCorreoDuplicadoActualizar={errorCorreoDuplicadoActualizar}
          setMostrarContraseña={setMostrarContraseña}
          areas={areas}
          setAreasPorRegionActualizar={setAreasPorRegionActualizar}
          setValoresAdministradorSeleccionado={
            setValoresAdministradorSeleccionado
          }
          rolUsuarioActual={rolUsuarioActual}
        />

        {/* MODAL PARA CONFIRMAR SI DESEA ELIMINAR*/}
        <ConfirmarEliminacionModal
          mostrarModalConfirmacion={mostrarModalConfirmacion}
          ocultarConfirmacion={ocultarConfirmacion}
          eliminarAdministrador={eliminarAdministrador}
          usuarioAEliminar={usuarioAEliminar}
        />

        {/*ALERTA QUE SE MUESTRA CUANDO SE AGREGA, ACTUALIZA Y ELIMINA A UN USUARIO */}
        <Alert
          show={showAlert}
          variant={alertVariant}
          onClose={ocultarAlerta}
          dismissible
        >
          {alertMessage}
          <ProgressBar now={progress} />
        </Alert>

        {/*CARDS PARA MOSTRAR A LOS USUARIOS*/}
        <UsuarioGrid
          administrador={administrador}
          filtro={filtro}
          filtroRegion={filtroRegion}
          filtroArea={filtroArea}
          filtroApellidoModal={filtroApellidoModal}
          filtroRol={filtroRol}
          abrirModalActualizar={abrirModalActualizar}
          mostrarConfirmacion={mostrarConfirmacion}
          rolUsuarioActual={rolUsuarioActual}
        />
      </div>
    </div>
  );
}
