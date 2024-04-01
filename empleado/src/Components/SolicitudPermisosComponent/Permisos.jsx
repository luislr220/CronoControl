import React, { useState, useEffect } from "react";
import "./css/permisos.css"; // Agregamos un archivo CSS separado para los estilos específicos de este componente
import Navigation from "../NavigationConponent/Navigation";
import { Form, Button} from "react-bootstrap";

export default function Permisos() {
  const [nombre, setNombre] = useState("");
  const [areaTrabajo, setAreaTrabajo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [areasTrabajo, setAreasTrabajo] = useState([]);
  const [solicitudesPermisos, setSolicitudesPermisos] = useState([]); // Estado para las solicitudes de permisos

  useEffect(() => {
    // Función para obtener las áreas de trabajo disponibles
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

    // Llamamos a la función para obtener las áreas de trabajo al cargar el componente
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

    // Construir el objeto de solicitud
    const solicitud = {
      nombre: nombre,
      areaTrabajo: areaTrabajo,
      fechaInicio: fechaInicio,
      fechaFinal: fechaFinal,
      justificacion: justificacion
    };

    try {
      // Enviar la solicitud al servidor (aquí deberías tener tu URL y método correctos)
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

      // Actualizar la lista de solicitudes de permisos después de enviar la solicitud
      actualizarSolicitudesPermisos();

      // Aquí podrías mostrar un mensaje de éxito o redireccionar al usuario a otra página
      console.log("Solicitud enviada exitosamente");
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
      const data = await response.json();
      // Actualizar el estado de las solicitudes de permisos con los datos obtenidos
      setSolicitudesPermisos(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="permisos-container"> {/* Aplicamos una clase CSS para el contenedor principal */}
      <Navigation />
      <div className="permisos-form-container"> {/* Aplicamos una clase CSS para el contenedor del formulario */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={handleNombreChange}
            />
          </Form.Group>
          <Form.Group controlId="areaTrabajo">
            <Form.Label>Área de trabajo</Form.Label>
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
          </Form.Group>
          <Form.Group controlId="fechaInicio">
            <Form.Label>Fecha de inicio de vacaciones</Form.Label>
            <Form.Control
              type="date"
              value={fechaInicio}
              onChange={handleFechaInicioChange}
            />
          </Form.Group>
          <Form.Group controlId="fechaFinal">
            <Form.Label>Fecha de finalización de vacaciones</Form.Label>
            <Form.Control
              type="date"
              value={fechaFinal}
              onChange={handleFechaFinalChange}
            />
          </Form.Group>
          <Form.Group controlId="justificacion">
            <Form.Label>Justificación</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={justificacion}
              onChange={handleJustificacionChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  );
}
