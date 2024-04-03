import React, { useState, useEffect } from "react";
import "./css/permisos.css";
import Navigation from "../NavigationConponent/Navigation";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

export default function Permisos() {
  const [nombre, setNombre] = useState("");
  const [sede, setSede] = useState(""); // Nuevo estado para la sede seleccionada
  const [areaTrabajo, setAreaTrabajo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [sedes, setSedes] = useState([]); // Nuevo estado para almacenar las sedes
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

    const fetchSedes = async () => { // Nueva función para obtener las sedes
      try {
        const response = await fetch("http://localhost:3002/sedes");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de sedes");
        }
        const data = await response.json();
        setSedes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAreasTrabajo();
    fetchSedes(); // Llamada a la función para obtener las sedes al cargar el componente
  }, []);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSedeChange = (e) => { // Manejador para el cambio de sede
    setSede(e.target.value);
    // Reiniciar el valor del área seleccionada al cambiar la sede
    setAreaTrabajo("");
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
      console.error("Error:", error);
      // Aquí podrías manejar el error de alguna manera (mostrar un mensaje al usuario, etc.)
    }
  };

  // Función para actualizar la lista de solicitudes de permisos después de enviar una nueva solicitud
  const actualizarSolicitudesPermisos = async () => {
    try {
      const response = await fetch("http://localhost:3002/solicitudes-permisos");
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de solicitudes de permisos");
      }
      //const data = await response.json();
      // Actualizar el estado de las solicitudes de permisos con los datos obtenidos
      //setSolicitudesPermisos(data);
    } catch (error) {
      console.error(error);
      setMensajeError("Error al enviar la solicitud");
      setMensajeExito("");
    }
  };

  // Filtrar las áreas de trabajo basadas en la sede seleccionada
  const filteredAreas = areasTrabajo.filter(area => area.sede === sede);

  return (
    <div className="">
      <Navigation />
      <br />
      <br />
      <div className="permisos-form-container" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
        <h2>Solicitud de Vacaciones</h2>
        <br />
        <br />
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
              <br />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="sede" style={{ padding: '1%' }}>
            <Form.Label column sm={3}>Sede:</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                value={sede}
                onChange={handleSedeChange}
              >
                <br />
                <option>Selecciona la sede</option>
                {sedes.map((sede) => (
                  <option key={sede._id} value={sede.nombre}>
                    {sede.nombre}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="areaTrabajo" style={{ padding: '1%' }}>
            <Form.Label column sm={3}>Área de trabajo:</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                value={areaTrabajo}
                onChange={handleAreaTrabajoChange}
              >
                <br />
                <option>Selecciona tu área</option>
                {filteredAreas.map((area) => (
                  <option key={area._id} value={area.nombre}>
                    {area.nombre}
                  </option>
                ))}
              </Form.Control>
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
            <Button variant="primary" type="submit">
              Enviar Solicitud
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
