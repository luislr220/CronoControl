import React, { useState, useEffect } from "react";
import { useAuth } from "../../routes/AuthContext"; // Asegúrate de importar el contexto de autenticación
import Navigation from "../NavigationConponent/Navigation";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";

const Permisos = () => {
  const { isAuthenticated, user } = useAuth();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [sede, setSede] = useState("");
  const [areaTrabajo, setAreaTrabajo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setNombre(`${user.Nombre} ${user.AppE} ${user.ApmE}`);
      setCorreo(user.Correo);
      setSede(user.Region); // Establecer la sede por defecto
      setAreaTrabajo(user.AreaTrabajo); // Establecer el área de trabajo por defecto
    }
  }, [isAuthenticated, user]);

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinalChange = (e) => {
    setFechaFinal(e.target.value);
  };

  const handleJustificacionChange = (e) => {
    setJustificacion(e.target.value);
  };

  // Implementa la función handleSubmit para enviar la solicitud y enviar la información al componente de Gantt
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado.");

    const solicitud = {
      nombre: nombre,
      correo: correo,
      sede: sede,
      areaTrabajo: areaTrabajo,
      fechaInicio: fechaInicio,
      fechaFinal: fechaFinal,
      justificacion: justificacion
    };

    setIsLoadingSubmit(true);

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

      // Después de enviar la solicitud con éxito, envía la información al componente de Gantt
      enviarSolicitudGantt(solicitud);
    } catch (error) {
      setMensajeError("Error al enviar la solicitud");
      setMensajeExito("");
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  // Implementa la función enviarSolicitudGantt para enviar la información al componente de Gantt
  const enviarSolicitudGantt = (solicitud) => {
    // Lógica para enviar la información al componente de Gantt
    // Por ejemplo, podrías usar un método o un evento para enviar la solicitud al componente de Gantt
    // Pero esta implementación depende de cómo esté diseñado y estructurado tu código del componente de Gantt
  };

  return (
    <div className="col">
      <Navigation />
      <br />
      <br />
      <h1>Solicitar Vacaciones</h1>
      <br />
      <div className="permisos-form-container" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
        
        <br />
        <br />
        {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}
        {mensajeError && <Alert variant="danger">{mensajeError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="nombre">
            <Form.Label column sm={3}>Nombre:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                value={nombre}
                readOnly
              />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="correo" style={{ padding: '1%' }}>
            <Form.Label column sm={3}>Correo:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                value={correo}
                readOnly
              />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="sede" style={{ padding: '1%' }}>
            <Form.Label column sm={3}>Sede:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                value={sede}
                readOnly
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="areaTrabajo" style={{ padding: '1%' }}>
            <Form.Label column sm={3}>Área de trabajo:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                value={areaTrabajo}
                readOnly
              />
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} controlId="fechaInicio" style={{ padding: '1%' }}>
            <Form.Label column sm={3}>Fecha de inicio:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                value={fechaInicio}
                onChange={handleFechaInicioChange}
              />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="fechaFinal" style={{ padding: '1%' }}>
            <Form.Label column sm={3}>Fecha de finalización:</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                value={fechaFinal}
                onChange={handleFechaFinalChange}
              />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="justificacion" style={{ padding: '1%' }}>
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

          <br />
  
          <div className="text-center">
            <Button variant="primary" type="submit" disabled={isLoadingSubmit}>
              Enviar Solicitud
            </Button>
            {isLoadingSubmit && <Spinner animation="border" variant="primary" />}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Permisos;
