import React, { useState, useEffect } from "react";
import { Button, FormControl, Form, Modal } from "react-bootstrap";
import Navigation from "../NavigationComponent/Navigation";
import { v4 as uuidv4 } from 'uuid';

const AsignarActividades = () => {
  const [actividades, setActividades] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [nuevaActividad, setNuevaActividad] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    administrador: "",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await fetch("http://localhost:3002/actividades");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de actividades");
        }
        const data = await response.json();
        setActividades(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAdministradores = async () => {
        try {
          const response = await fetch('http://localhost:3002/administrador');
          if (response.ok) {
            const data = await response.json();
            setAdministradores(data);
          } else {
            console.error('Error al obtener los administradores:', response.statusText);
          }
        } catch (error) {
          console.error('Error de red al obtener los administradores:', error);
        }
      };
      
    fetchActividades();
    fetchAdministradores();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaActividad((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const asignarActividad = async () => {
    try {
      const response = await fetch("http://localhost:3002/actividades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaActividad),
      });

      if (!response.ok) {
        throw new Error("No se pudo asignar la actividad");
      }

      const data = await response.json();
      setActividades([...actividades, data]);
      setNuevaActividad({
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        administrador: "",
      });
      setMostrarFormulario(false); // Cerrar el formulario después de asignar la actividad
    } catch (error) {
      console.error("Error al asignar la actividad:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <h2 className="titulo">Asignar Actividades a los usuarios</h2>
      <div className="contenedor">
        <div className="boton-container">
          <Button
            variant="success"
            className="boton-verde"
            onClick={() => setMostrarFormulario(true)}
          >
            Asignar Actividad
          </Button>{" "}
        </div>
        <Modal
          show={mostrarFormulario}
          onHide={() => setMostrarFormulario(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Asignar Nueva Actividad</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre de la Actividad</Form.Label>
                <FormControl
                  type="text"
                  name="nombre"
                  value={nuevaActividad.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescripcion">
                <Form.Label>Descripción de la Actividad</Form.Label>
                <FormControl
                  as="textarea"
                  name="descripcion"
                  value={nuevaActividad.descripcion}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formFechaInicio">
                <Form.Label>Fecha de Inicio</Form.Label>
                <FormControl
                  type="date"
                  name="fechaInicio"
                  value={nuevaActividad.fechaInicio}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formFechaFin">
                <Form.Label>Fecha de Fin</Form.Label>
                <FormControl
                  type="date"
                  name="fechaFin"
                  value={nuevaActividad.fechaFin}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formAdministrador">
                <Form.Label>Administrador Asignado</Form.Label>
                <Form.Control
                  as="select"
                  name="administrador"
                  value={nuevaActividad.administrador}
                  onChange={handleInputChange}
                >
                  <option key="default" value="">Selecciona un usuario</option>
                  {administradores.map((admin) => (
                    <option key={uuidv4()} value={admin.id}>
                      {admin.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setMostrarFormulario(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={asignarActividad}>
              Asignar
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="actividades-container">
          {/* Aquí puedes mostrar las actividades asignadas */}
          {actividades.map((actividad) => (
            <div key={actividad.id} className="actividad">
              <h3>{actividad.nombre}</h3>
              <p>Descripción: {actividad.descripcion}</p>
              <p>Fecha de Inicio: {actividad.fechaInicio}</p>
              <p>Fecha de Fin: {actividad.fechaFin}</p>
              <p>Administrador Asignado: {actividad.administrador}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AsignarActividades;
