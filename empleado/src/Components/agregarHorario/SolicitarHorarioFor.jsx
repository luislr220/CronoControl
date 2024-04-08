import React, { useState, useEffect } from "react";
import { useAuth } from "../../routes/AuthContext";
import { Form } from "react-bootstrap";
import axios from "axios";
import BtnSolicitarHorario from "./BtnSolicitarHorario";

export default function SolicitarHorarioForm() {
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

  if (isLoading || !userData) {
    return <div>Cargando...</div>;
  }

  const nombreCompleto = userData
    ? `${userData.Nombre} ${userData.AppE} ${userData.ApmE}`
    : "";

  return (
    <div className="SolicitarHorarioForm">
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

          <BtnSolicitarHorario
            selectedTurno={selectedTurno}
            justificacion={justificacion}
            userData={userData}
          />
        </Form>
      </div>
    </div>
  );
}
