import React, { useState, useEffect } from "react";
import "./css/permisos.css";
import Navigation from "../NavigationConponent/Navigation";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

export default function Permisos() {
  const [nombre, setNombre] = useState("");
  const [areaTrabajo, setAreaTrabajo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [areasTrabajo, setAreasTrabajo] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const fetchAreasTrabajo = async () => {
      try {
        const response = await fetch("http://localhost:3002/areas");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de áreas de trabajo");
        }
        const data = await response.json();
        setAreasTrabajo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAreasTrabajo();
  }, []);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleAreaTrabajoChange = (e) => {
    setAreaTrabajo(e.target.value);
  };

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinalChange = (e) => {
    setFechaFinal(e.target.value);
  };

  const handleJustificacionChange = (e) => {
    setJustificacion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const solicitud = {
      nombre: nombre,
      areaTrabajo: areaTrabajo,
      fechaInicio: fechaInicio,
      fechaFinal: fechaFinal,
      justificacion: justificacion
    };

    try {
      const response = await fetch("http://localhost:3002/permisos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(solicitud)
      });

      if (!response.ok) {
        throw new Error("Error al enviar la solicitud");
      }

      setMensajeExito("Solicitud enviada exitosamente");
      setMensajeError("");
    } catch (error) {
      setMensajeError("Error al enviar la solicitud");
      setMensajeExito("");
    }
  };

  return (
    <div className="">
      <Navigation />
      <div className="permisos-form-container">
        <h2>Solicitud de Vacaciones</h2>
        {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}
        {mensajeError && <Alert variant="danger">{mensajeError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="nombre">
            <Form.Label column sm={3}>Nombre completo:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={handleNombreChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="areaTrabajo">
            <Form.Label column sm={3}>Área de trabajo:</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                value={areaTrabajo}
                onChange={handleAreaTrabajoChange}
                
              >
                <option>Selecciona tu área</option>
                {areasTrabajo.map((area) => (
                  <option key={area._id} value={area.nombre}>
                    {area.nombre}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="fechaInicio">
            <Form.Label column sm={3}>Fecha de inicio:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                value={fechaInicio}
                onChange={handleFechaInicioChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="fechaFinal">
            <Form.Label column sm={3}>Fecha de finalización:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                value={fechaFinal}
                onChange={handleFechaFinalChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="justificacion">
            <Form.Label column sm={3}>Justificación:</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                rows={3}
                value={justificacion}
                onChange={handleJustificacionChange}
              />
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Enviar Solicitud
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}