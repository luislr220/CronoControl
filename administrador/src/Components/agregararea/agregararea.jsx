// Importa useState para manejar estados locales
import React, { useState, useEffect } from "react";
import { Button, FormControl, Form, Modal, Card, Col, Row } from "react-bootstrap";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import Navigation from "../NavigationComponent/Navigation";

const AreaForm = ({ nuevaArea, sedes, handleInputChange, agregarArea }) => (
  <Form>
    <Form.Group controlId="formNombre">
      <Form.Label>Nombre</Form.Label>
      <FormControl
        type="text"
        name="nombre"
        value={nuevaArea.nombre}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="formSede">
      <Form.Label>Sede</Form.Label>
      <Form.Control
        as="select"
        name="sede"
        value={nuevaArea.sede}
        onChange={handleInputChange}
      >
        <option value="">Selecciona una sede</option>
        {sedes.map((sede) => (
          <option key={sede._id} value={sede.nombre}>
            {sede.nombre}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  </Form>
);


const AreasTrabajo = () => {
  const [areas, setAreas] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [nuevaArea, setNuevaArea] = useState({ nombre: "", sede: "" });
  const [nuevaSede, setNuevaSede] = useState({ nombre: "", ubicacion: "" }); // Nuevo estado para la sede
  const [mostrarFormularioArea, setMostrarFormularioArea] = useState(false); // Nuevo estado para la modal de agregar área
  const [mostrarFormularioSede, setMostrarFormularioSede] = useState(false); // Nuevo estado para la modal de agregar sede
  const [mostrarFormularioEliminarSede, setMostrarFormularioEliminarSede] = useState(false); // Nuevo estado para la modal de eliminar sede
  const [sedeAEliminar, setSedeAEliminar] = useState(""); // Nuevo estado para la sede a eliminar
  const [areaSeleccionadaId, setAreaSeleccionadaId] = useState(null);
  const [valoresAreaSeleccionada, setValoresAreaSeleccionada] = useState({
    nombre: "",
    sede: "",
  });
  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  const [filtroArea, setFiltroArea] = useState("");
  const [filtroSede, setFiltroSede] = useState("");
  const [expandedArea, setExpandedArea] = useState(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/areas`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de áreas");
        }
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSedes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sedes`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de sedes");
        }
        const data = await response.json();
        setSedes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAreas();
    fetchSedes();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaArea((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSedeInputChange = (event) => { // Función para manejar cambios en los inputs de la sede
    const { name, value } = event.target;
    setNuevaSede((prevState) => ({
      ...prevState,
      [name]: value,
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
      setAreas([...areas, data]);
      setNuevaArea({ nombre: "", sede: "" });
      setMostrarFormularioArea(false); // Cerrar la modal de agregar área
    } catch (error) {
      console.error("Error al agregar el área:", error);
    }
  };
  const agregarSede = async () => { // Función para agregar una nueva sede
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
      setNuevaSede({ nombre: "", ubicacion: "" }); // Limpiar los campos de la sede después de agregarla
      setMostrarFormularioSede(false); // Cerrar la modal de agregar sede
    } catch (error) {
      console.error("Error al agregar la sede:", error);
    }
  };

  const eliminarSede = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sedes/${sedeAEliminar}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar la sede");
      }
  
      // Eliminar todas las áreas asociadas a la sede seleccionada
      await Promise.all(
        areas
          .filter((area) => area.sedeId === sedeAEliminar)
          .map(async (area) => {
            const areaResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/areas/${area._id}`, {
              method: "DELETE",
            });
            if (!areaResponse.ok) {
              throw new Error(`No se pudo eliminar el área ${area.nombre}`);
            }
          })
      );
  
      // Actualizar el estado de las sedes y las áreas después de eliminar la sede y sus áreas asociadas
      const nuevasSedes = sedes.filter((sede) => sede._id !== sedeAEliminar);
      const nuevasAreas = areas.filter((area) => area.sedeId !== sedeAEliminar);
      setSedes(nuevasSedes);
      setAreas(nuevasAreas);
      setSedeAEliminar(""); // Limpiar el valor de sedeAEliminar después de eliminar la sede
      setMostrarFormularioEliminarSede(false); // Cerrar el formulario de eliminar sede
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const eliminarArea = async (areaId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/areas/${areaId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar el área");
      }
      const nuevasAreas = areas.filter((area) => area._id !== areaId);
      setAreas(nuevasAreas);
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModalActualizar = (areaId) => {
    setAreaSeleccionadaId(areaId);
    const areaSeleccionada = areas.find(area => area._id === areaId);
    setValoresAreaSeleccionada(areaSeleccionada);
    setMostrarModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setMostrarModalActualizar(false);
  };

  const actualizarArea = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/areas/${areaSeleccionadaId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valoresAreaSeleccionada),
        }
      );
      if (!response.ok) {
        throw new Error("No se pudo actualizar el área");
      }
      const data = await response.json();
      const index = areas.findIndex((a) => a._id === areaSeleccionadaId);
      const nuevasAreas = [...areas];
      nuevasAreas[index] = data;
      setAreas(nuevasAreas);
      cerrarModalActualizar();
    } catch (error) {
      console.error(error);
    }
  };

  // Función para filtrar las sedes por el nombre ingresado en el filtro
  const filtrarSedes = (sede) => {
    return sede.nombre.toLowerCase().includes(filtroSede.toLowerCase());
  };

  return (
    <div>
      <Navigation />
      <h2 className="titulo">Gestión de Áreas y Sedes de Trabajo</h2>
      <div className="contenedor">
        <div className="boton-container">
          <Button
            variant="success"
            className="boton-verde"
            onClick={() => setMostrarFormularioArea(true)} // Mostrar la modal de agregar área al hacer clic
          >
            Agregar Área
          </Button>{" "} {/* Botón para agregar área */}
          <Button
            variant="primary"
            className="boton-azul"
            onClick={() => setMostrarFormularioSede(true)} // Mostrar la modal de agregar sede al hacer clic
          >
            Agregar Sede {/* Botón para agregar sede */}
          </Button>{" "}
          <Button
            variant="danger"
            onClick={() => setMostrarFormularioEliminarSede(true)} // Mostrar la modal de eliminar sede al hacer clic
          >
            Eliminar Sede {/* Botón para eliminar sede */}
          </Button>{" "}
          <FormControl
            type="text"
            placeholder="Filtrar por área..."
            className="filtro"
            value={filtroArea}
            onChange={(e) => setFiltroArea(e.target.value)}
          />
          <FormControl
            type="text"
            placeholder="Filtrar por sede..."
            className="filtro"
            value={filtroSede}
            onChange={(e) => setFiltroSede(e.target.value)}
          />
        </div>
        <Modal
          show={mostrarFormularioArea} // Mostrar la modal de agregar área si mostrarFormularioArea es verdadero
          onHide={() => setMostrarFormularioArea(false)} // Actualizar estado para cerrar la modal de agregar área
        >
          <Modal.Header closeButton>
            <Modal.Title>Agregar Área de Trabajo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AreaForm
              nuevaArea={nuevaArea}
              sedes={sedes}
              handleInputChange={handleInputChange}
              agregarArea={agregarArea}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setMostrarFormularioArea(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={agregarArea}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Agregar modal para agregar sede */}
        <Modal
          show={mostrarFormularioSede} // Mostrar la modal de agregar sede si mostrarFormularioSede es verdadero
          onHide={() => setMostrarFormularioSede(false)} // Actualizar estado para cerrar la modal de agregar sede
        >
          <Modal.Header closeButton>
            <Modal.Title>Agregar Sede</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombreSede">
                <Form.Label>Nombre</Form.Label>
                <FormControl
                  type="text"
                  name="nombre"
                  value={nuevaSede.nombre}
                  onChange={handleSedeInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formUbicacionSede">
                <Form.Label>Ubicación</Form.Label>
                <FormControl
                  type="text"
                  name="ubicacion"
                  value={nuevaSede.ubicacion}
                  onChange={handleSedeInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setMostrarFormularioSede(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={agregarSede}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Agregar modal para eliminar sede */}
        <Modal
          show={mostrarFormularioEliminarSede} // Mostrar la modal de eliminar sede si mostrarFormularioEliminarSede es verdadero
          onHide={() => setMostrarFormularioEliminarSede(false)} // Actualizar estado para cerrar la modal de eliminar sede
        >
          <Modal.Header closeButton>
            <Modal.Title>Eliminar Sede</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formSedeAEliminar">
                <Form.Label>Selecciona la sede a eliminar:</Form.Label>
                <Form.Control
                  as="select"
                  value={sedeAEliminar}
                  onChange={(e) => setSedeAEliminar(e.target.value)}
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
            <Button
              variant="secondary"
              onClick={() => setMostrarFormularioEliminarSede(false)}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={eliminarSede}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={mostrarModalActualizar} onHide={cerrarModalActualizar}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar Área de Trabajo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombreActualizar">
                <Form.Label>Nombre</Form.Label>
                <FormControl
                  type="text"
                  name="nombre"
                  value={valoresAreaSeleccionada.nombre}
                  onChange={(e) =>
                    setValoresAreaSeleccionada({
                      ...valoresAreaSeleccionada,
                      nombre: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModalActualizar}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={actualizarArea}>
              Actualizar
            </Button>
          </Modal.Footer>
        </Modal>

        <Row>
          {sedes.filter(filtrarSedes).map((sede, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <Card className="mb-3">
                <Card.Header>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>{sede.nombre}</h3>
                    <Button
                      variant="link"
                      onClick={() =>
                        setExpandedArea(
                          expandedArea === index ? null : index
                        )
                      }
                    >
                      {expandedArea === index ? <BsChevronUp /> : <BsChevronDown />}
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body
                  className={
                    expandedArea === index ? "show" : "collapse"
                  }
                >
                  <Card.Text>
                    {areas
                      .filter((area) => area.sede === sede.nombre)
                      .map((area, areaIndex) => (
                        <div key={areaIndex}>
                          <p>{area.nombre}</p>
                          <Button
                            variant="info"
                            onClick={() => abrirModalActualizar(area._id)}
                          >
                            Actualizar
                          </Button>{" "}
                          <Button
                            variant="danger"
                            onClick={() => eliminarArea(area._id)}
                          >
                            Eliminar
                          </Button>{" "}
                        </div>
                      ))}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AreasTrabajo;
