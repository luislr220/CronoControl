//Lucía Cristel Ramírez Romero

// Este componente representa un formulario para solicitar un horario específico.

//Importaciones
import React, { useState, useEffect } from "react";
import { useAuth } from "../../routes/AuthContext";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Navigation from "../NavigationConponent/Navigation";

export default function SolicitarHorario() {
  // Extrae el estado de autenticación y usuario del contexto de autenticación
  const { isAuthenticated, isLoading, user } = useAuth();
  // Define estados para almacenar datos del usuario, turnos disponibles y detalles de la solicitud
  const [userData, setUserData] = useState(null);
  const [turnos, setTurnos] = useState([]);
  const [selectedTurno, setSelectedTurno] = useState("");
  const [justificacion, setJustificacion] = useState("");

  // Efecto para cargar los datos del usuario cuando se complete la autenticación
  useEffect(() => {
    if (isLoading) {
      console.log("Autenticación en progreso...");   // Registra en la consola si la autenticación está en curso
    } else if (isAuthenticated) {
      if (user) {
        console.log("Usuario autenticado:", user);  // Registra en la consola los detalles del usuario autenticado
        if (!userData) {
          setUserData(user);  // Establece los datos del usuario una vez que estén disponibles
        }
      } else {
        console.error(
          'Error: El usuario está autenticado, pero el objeto "user" es undefined.'
        );  // Registra en la consola si hay un error con el objeto de usuario
      }
    } else {
      console.log("El usuario no está autenticado."); // Registra en la consola si el usuario no está autenticado
    }
  }, [isLoading, isAuthenticated, user, userData]);

  // Efecto para obtener los turnos disponibles cuando se monta el componente
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get("http://localhost:3002/turnos"); // Realiza una solicitud GET para obtener los turnos
        setTurnos(response.data);  // Almacena los turnos obtenidos en el estado
=======
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/turnos`);
        setTurnos(response.data);
>>>>>>> 493201dd4af993c60a91baf419c1ad2a3e0dc0eb
      } catch (error) {
        console.error("Error al obtener los turnos:", error); // Registra en la consola si hay un error al obtener los turnos
      }
    };
    fetchTurnos();
  }, []);

  // Función para enviar la solicitud de horario al servidor
  const enviarSolicitud = async () => {
    try {
      // Obtener el nombre del turno seleccionado
      const selectedTurnoObject = turnos.find(turno => turno._id === selectedTurno);
      const selectedTurnoName = selectedTurnoObject ? selectedTurnoObject.Nombre : '';

      // Realiza una solicitud POST a la ruta de permisoHorario con los detalles de la solicitud
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/permisoHorario`,
        {
          nombreCompleto: userData.Nombre + " " + userData.AppE + " " + userData.ApmE,
          correo: userData.Correo,
          sede: userData.Region,
          area: userData.AreaTrabajo,
          turno: selectedTurnoName, // Enviar el nombre del turno en lugar del ID
          justificacion: justificacion,
        }
      );
  
      // Restablecer los estados del formulario
      setSelectedTurno("");
      setJustificacion("");

      // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      console.log("Respuesta del servidor:", response.data);
      alert("Solicitud de horario enviada correctamente");
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la solicitud
      console.error("Error al enviar la solicitud:", error);
      alert("Ocurrió un error al enviar la solicitud");
    }
  };
  
  // Si la autenticación está en curso o los datos del usuario aún no están disponibles, muestra un mensaje de carga
  if (isLoading || !userData) {
    return <div>Cargando...</div>;
  }

  // Concatena el nombre completo del usuario
  const nombreCompleto = userData
    ? `${userData.Nombre} ${userData.AppE} ${userData.ApmE}`
    : "";

  return (
    // Renderiza el formulario de solicitud de horario
    <div className="SolicitarHorario">
        <Navigation />  {/* Renderiza el componente de navegación */}
      <div className="container mt-4 p-2">
        <Form>{/* Formulario de solicitud */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo:</Form.Label>
            <Form.Control type="text" value={nombreCompleto} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Correo:</Form.Label>
            <Form.Control type="email" value={userData.Correo} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sede:</Form.Label>
            <Form.Control type="text" value={userData.Region} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Área:</Form.Label>
            <Form.Control type="text" value={userData.AreaTrabajo} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Turno:</Form.Label>
             {/* Selector de turno con opciones obtenidas dinámicamente */}
            <Form.Select
              aria-label="Turno"
              value={selectedTurno}
              onChange={(e) => setSelectedTurno(e.target.value)}
            >
              <option value="">Selecciona un turno</option>
              {/* Mapea los turnos disponibles como opciones en el selector */}
              {turnos.map((turno) => (
                <option key={turno._id} value={turno._id}>
                  {turno.Nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Justificación:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={justificacion}
              onChange={(e) => setJustificacion(e.target.value)}
            />
          </Form.Group>
           {/* Botón para enviar la solicitud, deshabilitado si no se ha seleccionado un turno o no hay justificación */}
          <Button
            variant="primary"
            type="button"
            onClick={enviarSolicitud}
            disabled={!selectedTurno || !justificacion}
          >
            Enviar Solicitud
          </Button>
        </Form>
      </div>
    </div>
  );
}
