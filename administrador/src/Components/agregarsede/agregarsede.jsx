import React, { useState, useEffect } from "react";
import { Button, FormControl, Card, Modal, Row, Col, Form } from "react-bootstrap";
import Navigation from "../NavigationComponent/Navigation";
import "../agregarsede/css/sede.css";

export default function GestionarSedes() {
  const [sedes, setSedes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroUbicacion, setFiltroUbicacion] = useState("");
  const [nuevaSede, setNuevaSede] = useState({
    nombre: "",
    ubicacion: ""
  });
  const [sedeEditando, setSedeEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarFormularioArea, setMostrarFormularioArea] = useState(false);
  const [nuevaArea, setNuevaArea] = useState({
    nombre: "",
    sede: ""
  });

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sedes`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de sedes");
        }
        const data = await response.json();
        console.log("Sedes:", data); // Verificar datos recibidos desde la API
        setSedes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSedes();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaSede((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFiltroNombreChange = (event) => {
    setFiltroNombre(event.target.value);
  };

  const handleFiltroUbicacionChange = (event) => {
    setFiltroUbicacion(event.target.value);
  };

  const agregarSede = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sedes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaSede),
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar la sede");
      }

      const data = await response.json();
      setSedes([...sedes, data]);
      setNuevaSede({ nombre: "", ubicacion: "" });
      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editarSede = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sedes/${sedeEditando._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaSede),
      });

      if (!response.ok) {
        throw new Error("No se pudo editar la sede");
      }

      const data = await response.json();
      const index = sedes.findIndex(sede => sede._id === sedeEditando._id);
      const nuevasSedes = [...sedes];
      nuevasSedes[index] = data;
      setSedes(nuevasSedes);
      setSedeEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarSede = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sedes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar la sede");
      }
      const nuevasSedes = sedes.filter(
        (sede) => sede._id !== id
      );
      setSedes(nuevasSedes);
    } catch (error) {
      console.error(error);
    }
  };

  const mostrarEditarSede = (sede) => {
    setSedeEditando(sede);
    setNuevaSede({
      nombre: sede.nombre,
      ubicacion: sede.ubicacion
    });
    setMostrarFormulario(true);
  };

  const handleInputChangeArea = (event) => {
    const { name, value } = event.target;
    setNuevaArea((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const agregarArea = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/areas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaArea),
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar el área");
      }

      const data = await response.json();
      const index = sedes.findIndex(sede => sede._id === nuevaArea.sede);
      if (index !== -1) {
        const nuevasSedes = [...sedes];
        if (!nuevasSedes[index].areas) {
          nuevasSedes[index].areas = [];
        }
        nuevasSedes[index].areas.push(data);
        setSedes(nuevasSedes);
      }
      setNuevaArea({ nombre: "", sede: "" });
      setMostrarFormularioArea(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="AGEMcontenedor1">
        <h2 className="AGEMTitulo">Gestionar Sedes</h2>
        <div className="AGEMBotonContainer">
          <Button
            variant="success"
            className="AGEMBotonAgregar"
            onClick={() => {
              setSedeEditando(null);
              setMostrarFormulario(true);
            }}
          >
            Agregar Sede
          </Button>{" "}
          <Button
            variant="primary"
            className="AGEMBotonAgregar"
            onClick={() => setMostrarFormularioArea(true)}
          >
            Agregar Área
          </Button>{" "}
          <FormControl
            type="text"
            placeholder="Buscar por nombre..."
            className="AGEMBuscador"
            value={filtroNombre}
            onChange={handleFiltroNombreChange}
          />
          <FormControl
            type="text"
            placeholder="Buscar por ubicación..."
            className="AGEMBuscador"
            value={filtroUbicacion}
            onChange={handleFiltroUbicacionChange}
          />
        </div>
        <Modal
          show={mostrarFormulario}
          onHide={() => {
            setSedeEditando(null);
            setMostrarFormulario(false);
            setNuevaSede({ nombre: "", ubicacion: "" });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{sedeEditando ? 'Actualizar Sede' : 'Agregar Sede'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <FormControl
                  type="text"
                  name="nombre"
                  value={nuevaSede.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formUbicacion">
                <Form.Label>Ubicación</Form.Label>
                <FormControl
                  type="text"
                  name="ubicacion"
                  value={nuevaSede.ubicacion}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setMostrarFormulario(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={sedeEditando ? editarSede : agregarSede}>
              {sedeEditando ? 'Actualizar' : 'Agregar'}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={mostrarFormularioArea}
          onHide={() => {
            setMostrarFormularioArea(false);
            setNuevaArea({ nombre: "", sede: "" });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Agregar Área</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombreArea">
                <Form.Label>Nombre del Área</Form.Label>
                <FormControl
                  type="text"
                  name="nombre"
                  value={nuevaArea.nombre}
                  onChange={handleInputChangeArea}
                />
              </Form.Group>
              <Form.Group controlId="formSedeArea">
                <Form.Label>Seleccione la Sede</Form.Label>
                <Form.Control
                  as="select"
                  name="sede"
                  value={nuevaArea.sede}
                  onChange={handleInputChangeArea}
                >
                  <option value="">Selecciona una sede</option>
                  {sedes.map((sede) => (
                    <option key={sede._id} value={sede._id}>
                      {sede.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setMostrarFormularioArea(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={agregarArea}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>

        <Row xs={1} md={1} lg={5} className="g-2">
          {sedes
            .filter((sede) =>
              sede.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
              sede.ubicacion.toLowerCase().includes(filtroUbicacion.toLowerCase())
            )
            .map((sede, index) => (
              <Col key={index}>
                <Card className="AGEMCard">
                  <Card.Body>
                    <Card.Title>{sede.nombre}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{sede.ubicacion}</Card.Subtitle>
                    <Button variant="primary" onClick={() => mostrarEditarSede(sede)}>Editar</Button>{" "}
                    <Button variant="danger" onClick={() => eliminarSede(sede._id)}>Eliminar</Button>{" "}
                    {sede.areas && sede.areas.length > 0 && (
                      <div>
                        <h5>Áreas de trabajo:</h5>
                        <ul>
                          {sede.areas.map((area) => (
                            <li key={area._id}>{area.nombre}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
