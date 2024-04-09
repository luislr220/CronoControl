import React, { useState, useEffect } from "react";
import { useAuth } from "../../routes/AuthContext";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Navigation from "../NavigationConponent/Navigation";

export default function SolicitarHorario() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [turnos, setTurnos] = useState([]);
  const [selectedTurno, setSelectedTurno] = useState("");
  const [justificacion, setJustificacion] = useState("");

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

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await axios.get("http://localhost:3002/turnos");
        setTurnos(response.data);
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      }
    };
    fetchTurnos();
  }, []);

  const enviarSolicitud = async () => {
    try {
      // Obtener el nombre del turno seleccionado
      const selectedTurnoObject = turnos.find(turno => turno._id === selectedTurno);
      const selectedTurnoName = selectedTurnoObject ? selectedTurnoObject.Nombre : '';

      // Realizar la solicitud POST a la ruta de permisoHorario
      const response = await axios.post(
        "http://localhost:3002/permisoHorario",
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
  
  if (isLoading || !userData) {
    return <div>Cargando...</div>;
  }

  const nombreCompleto = userData
    ? `${userData.Nombre} ${userData.AppE} ${userData.ApmE}`
    : "";

  return (
    <div className="SolicitarHorario">
        <Navigation />
      <div className="container mt-4 p-2">
        <Form>
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
            <Form.Select
              aria-label="Turno"
              value={selectedTurno}
              onChange={(e) => setSelectedTurno(e.target.value)}
            >
              <option value="">Selecciona un turno</option>
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
