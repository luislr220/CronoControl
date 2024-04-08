import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function BtnSolicitarHorario({
  selectedTurno,
  justificacion,
  userData,
}) {
  const enviarSolicitud = async () => {
    try {
      // Realizar la solicitud POST a la ruta de validarSolicitud
      const response = await axios.post(
        "http://localhost:3002/turnos/validarSolicitud",
        {
          turnoSeleccionado: selectedTurno,
          justificacion: justificacion,
          usuario: userData,
        }
      );

      // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      console.log("Respuesta del servidor:", response.data);
      alert("Solicitud de horario enviada correctamente");
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la solicitud
      console.error("Error al enviar la solicitud:", error);
      alert("Ocurrió un error al enviar la solicitud");
    }
  };

  return (
    <Button variant="primary" onClick={enviarSolicitud}>
      Solicitar Horario
    </Button>
  );
}
