import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/vali.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faCheck,
  faTimes,
  faSyncAlt
} from "@fortawesome/free-solid-svg-icons";
import Navigation from "../NavigationComponent/Navigation";

const ValidarSolis = () => {
  const [turnos, setTurnos] = useState([]);
  const [searchInputEmpleado, setSearchInputEmpleado] = useState("");
  const [searchInputEstado, setSearchInputEstado] = useState("");
  const [searchInputCupo, setSearchInputCupo] = useState("");
  const [filteredTurnos, setFilteredTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await fetch("http://localhost:3002/turnos");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de turnos");
        }
        const data = await response.json();
        setTurnos(data);
        setFilteredTurnos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTurnos();
  }, []);

  useEffect(() => {
    const filterTurnos = () => {
      let filtered = turnos.filter((turno) => {
        return (
          turno.Nombre.toLowerCase().includes(
            searchInputEmpleado.toLowerCase()
          ) &&
          turno.Estado.toLowerCase().includes(
            searchInputEstado.toLowerCase()
          ) &&
          turno.Cupo.toString().includes(searchInputCupo)
        );
      });
      setFilteredTurnos(filtered);
    };

    filterTurnos();
  }, [turnos, searchInputEmpleado, searchInputEstado, searchInputCupo]);

  const handleValidar = (turnoId) => {
    console.log(`Validando turno con ID ${turnoId}`);
    const updatedTurnos = filteredTurnos.map((turno) => {
      if (turno._id === turnoId) {
        return { ...turno, Estatus: "Aceptada" };
      }
      return turno;
    });
    setFilteredTurnos(updatedTurnos);
    alert("Turno validado correctamente");
  };

  const handleRechazar = (turnoId) => {
    console.log(`Rechazando turno con ID ${turnoId}`);
    const updatedTurnos = filteredTurnos.filter(
      (turno) => turno._id !== turnoId
    );
    setFilteredTurnos(updatedTurnos);
    alert("Turno rechazado correctamente");
  };

  const handleAceptarTodos = () => {
    const updatedTurnos = filteredTurnos.map((turno) => {
      return { ...turno, Estatus: "Aceptada" };
    });
    setFilteredTurnos(updatedTurnos);
    alert("Todos los turnos fueron aceptados correctamente");
  };

  const handleDenegarTodos = () => {
    setFilteredTurnos([]);
    alert("Todos los turnos fueron denegados correctamente");
  };

  const handleActualizar = async () => {
    try {
      const response = await fetch("http://localhost:3002/turnos");
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de turnos");
      }
      const data = await response.json();
      setTurnos(data);
      setFilteredTurnos(data);
      alert("Lista de turnos actualizada correctamente");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navigation />
      {/* Contenido Principal */}
      <Container className="col-12">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Validar Solicitudes</h1>
            </div>
            <br></br>
            <div className="col-5">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar por empleado..."
                  aria-label="Search"
                  value={searchInputEmpleado}
                  onChange={(e) => setSearchInputEmpleado(e.target.value)}
                />
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar por estado..."
                  aria-label="Search"
                  value={searchInputEstado}
                  onChange={(e) => setSearchInputEstado(e.target.value)}
                />
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar por cupo..."
                  aria-label="Search"
                  value={searchInputCupo}
                  onChange={(e) => setSearchInputCupo(e.target.value)}
                />
                <button className="btn btn-outline-link" type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col">
                  <button
                    className="btn btn-primary mb-3"
                    onClick={handleActualizar}
                  >
                    <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
                    Actualizar
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-success mb-3 ml-3"
                    onClick={handleAceptarTodos}
                  >
                    Aceptar Todos
                  </button>
                  <button
                    className="btn btn-danger mb-3 ml-3"
                    onClick={handleDenegarTodos}
                  >
                    Denegar Todos
                  </button>
                </div>
              </div>
              <table className="table rounded">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nombre Turno</th>
                    <th>Hora Inicial</th>
                    <th>Hora Final</th>
                    <th>Estado</th>
                    <th>Cupo</th>
                    <th>Area</th>
                    <th>Estatus</th>
                    <th>Validar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTurnos.map((turno, index) => (
                    <tr key={index}>
                      <td>
                        <FontAwesomeIcon
                          icon={faCircleUser}
                          style={{ color: "#000000", fontSize: "1.5rem" }}
                        />
                      </td>
                      <td>{turno.Nombre}</td>
                      <td>{turno.HoraInicio}</td>
                      <td>{turno.HoraFinal}</td>
                      <td>{turno.Estado}</td>
                      <td>{turno.Cupo}</td>
                      <td>{turno.Area}</td>
                      <td className="col">
                        {turno.Estatus === "Aceptada"
                          ? "Aceptada"
                          : turno.Estatus === "Rechazada"
                          ? "Rechazada"
                          : "Pendiente"}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className=" btn btn-success mr-2"
                          onClick={() => handleValidar(turno._id)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRechazar(turno._id)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ValidarSolis;
