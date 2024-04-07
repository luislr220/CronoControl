import React, { useState, useEffect } from "react";
import { useAuth } from "../../routes/AuthContext"; // Asegúrate de importar el contexto de autenticación
import Navigation from "../NavigationConponent/Navigation";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";

export default function Permisos() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [nombre, setNombre] = useState("");
  const [sede, setSede] = useState("");
  const [areaTrabajo, setAreaTrabajo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [sedes, setSedes] = useState([]);
  const [areasTrabajo, setAreasTrabajo] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserData(user);
    }
  }, [isAuthenticated, user]);

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
      }
    };

    fetchAreasTrabajo();
    fetchSedes();
  }, []);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSedeChange = (e) => {
    setSede(e.target.value);
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
    } catch (error) {
      setMensajeError("Error al enviar la solicitud");
      setMensajeExito("");
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const filteredAreas = areasTrabajo.filter(area => area.sede === sede);

  if (isLoading || !userData) {
    return null; // No renderizar nada mientras se está autenticando o cargando datos del usuario
  }

  return (
    <div className="">
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
                placeholder=""
                value={`${userData.Nombre} ${userData.AppE} ${userData.ApmE}`}
                readOnly // Hacer el campo de solo lectura
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
                readOnly // Hacer el campo de solo lectura
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
                readOnly // Hacer el campo de solo lectura
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
