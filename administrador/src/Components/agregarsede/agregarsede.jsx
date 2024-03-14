import React, { useState, useEffect } from "react";
import { Button, FormControl, Table, Form, Modal } from "react-bootstrap";
import Navigation from "../NavigationComponent/Navigation";
import "../agregarsede/css/sede.css";

export default function GestionarSedes() {
  const [sedes, setSedes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [nuevaSede, setNuevaSede] = useState({
    nombre: "",
    ubicacion: ""
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
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

    fetchSedes();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaSede((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const agregarSede = async () => {
    try {
      const response = await fetch("http://localhost:3002/sedes", {
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

  const eliminarSede = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/sedes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar la sede");
      }
      const nuevasSedes = sedes.filter(
        (sedes) => sedes._id !== id
      );
      setSedes(nuevasSedes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navigation />
      <h2 className="titulo">Gestionar Sedes</h2>
      <div className="contenedor">
        <div className="boton-container">
          <Button
            variant="success"
            className="boton-verde"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar Sede
          </Button>{" "}
          <FormControl
            type="text"
            placeholder="Buscar sede..."
            className="buscador"
            value={filtro}
            onChange={handleFiltroChange}
          />
        </div>
        <Modal
          show={mostrarFormulario}
          onHide={() => setMostrarFormulario(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Agregar Sede</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre de la Sede</Form.Label>
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
            <Button
              variant="secondary"
              onClick={() => setMostrarFormulario(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={agregarSede}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>

        <Table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {sedes
              .filter((sede) =>
                sede.nombre.toLowerCase().includes(filtro.toLowerCase())
              )
              .map((sede, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{sede.nombre}</td>
                  <td>{sede.ubicacion}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => eliminarSede(sede._id)}
                    >
                      Eliminar
                    </Button>{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
