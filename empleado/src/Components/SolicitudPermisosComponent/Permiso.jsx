//Lucía Cristel Ramírez Romero

// Este componente representa un formulario para solicitar permisos de vacaciones.

//Importaciones
import React, { useState, useEffect } from "react";
import { useAuth } from "../../routes/AuthContext";
import { Form, Button } from "react-bootstrap";
import Navigation from "../NavigationConponent/Navigation";
import axios from "axios";

export default function Permiso() {
  // Extrae el estado de autenticación y usuario del contexto de autenticación
  const { isAuthenticated, isLoading, user } = useAuth();
  // Define estados para almacenar datos del usuario y detalles de la solicitud
  const [userData, setUserData] = useState(null);
  const [justificacion, setJustificacion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinalizacion, setFechaFinalizacion] = useState("");
  const [error, setError] = useState("");

  // Efecto para cargar los datos del usuario cuando se complete la autenticación
  useEffect(() => {
    if (isLoading) {
      console.log("Autenticación en progreso...");  // Registra en la consola si la autenticación está en curso
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

  // Función para enviar la solicitud de permiso de vacaciones al servidor
  const enviarSolicitud = async (e) => {
    e.preventDefault(); // Evitar que el formulario haga un envío por defecto
    try {
      // Realiza una solicitud POST al servidor con los datos de la solicitud
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/permiso`,
        {
          nombreCompleto: userData.Nombre + " " + userData.AppE + " " + userData.ApmE,
          correo: userData.Correo,
          fechaInicioVacaciones: fechaInicio,
          fechaFinVacaciones: fechaFinalizacion,
          justificacion: justificacion,
        }
      );

      console.log("Respuesta del servidor:", response.data);  // Registra en la consola la respuesta del servidor
      alert("Solicitud de vacaciones enviada correctamente");  // Muestra una alerta de éxito
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);  // Registra en la consola si hay un error al enviar la solicitud
      setError("Ocurrió un error al enviar la solicitud");  // Establece un mensaje de error
    }
  };

  // Si la autenticación está en curso o los datos del usuario aún no están disponibles, muestra un mensaje de carga
  if (isLoading || !userData) {
    return <div>Cargando...</div>;
  }

  // Concatena el nombre completo del usuario
  const nombreCompleto = `${userData.Nombre} ${userData.AppE} ${userData.ApmE}`;

  return (
    // Renderiza el formulario de solicitud de permiso de vacaciones
    <div className="Permisos">
      <Navigation />   {/* Renderiza el componente de navegación */}
      <div className="container mt-4 p-2">
        {/* Formulario de solicitud */}
        <Form onSubmit={enviarSolicitud}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo:</Form.Label>
            <Form.Control type="text" value={nombreCompleto} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Correo:</Form.Label>
            <Form.Control
              type="email"
              value={userData.Correo}
              readOnly // El correo es solo de lectura
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Inicio:</Form.Label>
            <Form.Control
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Finalización:</Form.Label>
            <Form.Control
              type="date"
              value={fechaFinalizacion}
              onChange={(e) => setFechaFinalizacion(e.target.value)}
            />
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
          {/* Botón para enviar la solicitud */}
          <Button variant="primary" type="submit">
            Solicitar Vacaciones
          </Button>
          {/* Muestra un mensaje de error si existe */}
          {error && <div className="text-danger mt-2">{error}</div>}
        </Form>
      </div>
    </div>
  );
}