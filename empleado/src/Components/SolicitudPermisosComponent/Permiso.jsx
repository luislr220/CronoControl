import React, { useState, useEffect } from "react";
import { useAuth } from "../../routes/AuthContext";
import { Form, Button } from "react-bootstrap";
import Navigation from "../NavigationConponent/Navigation";
import axios from "axios";

export default function Permiso() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [justificacion, setJustificacion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinalizacion, setFechaFinalizacion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoading) {
      console.log("Autenticación en progreso...");
    } else if (isAuthenticated) {
      if (user) {
        console.log("Usuario autenticado:", user);
        if (!userData) {
          setUserData(user);
        }
      } else {
        console.error(
          'Error: El usuario está autenticado, pero el objeto "user" es undefined.'
        );
      }
    } else {
      console.log("El usuario no está autenticado.");
    }
  }, [isLoading, isAuthenticated, user, userData]);

  const enviarSolicitud = async (e) => {
    e.preventDefault(); // Evitar que el formulario haga un envío por defecto
    try {
      const response = await axios.post(
        "http://localhost:3002/permiso",
        {
          nombreCompleto: userData.Nombre + " " + userData.AppE + " " + userData.ApmE,
          correo: userData.Correo,
          fechaInicioVacaciones: fechaInicio,
          fechaFinVacaciones: fechaFinalizacion,
          justificacion: justificacion,
        }
      );

      console.log("Respuesta del servidor:", response.data);
      alert("Solicitud de vacaciones enviada correctamente");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setError("Ocurrió un error al enviar la solicitud");
    }
  };

  if (isLoading || !userData) {
    return <div>Cargando...</div>;
  }

  const nombreCompleto = `${userData.Nombre} ${userData.AppE} ${userData.ApmE}`;

  return (
    <div className="Permisos">
      <Navigation />
      <div className="container mt-4 p-2">
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

          <Button variant="primary" type="submit">
            Solicitar Vacaciones
          </Button>
          {error && <div className="text-danger mt-2">{error}</div>}
        </Form>
      </div>
    </div>
  );
}