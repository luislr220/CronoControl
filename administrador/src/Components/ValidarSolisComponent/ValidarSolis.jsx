import React from "react";
import { Container, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/vali.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHouseChimney,
  faUser,
  faCheck,
  faCircleUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import Navigation from "../NavigationComponent/Navigation"

const App = () => {
  const data = [
    {
      name: "Fernando",
      shift: "7:00 - 15:00",
      hours: "8hrs al día",
      role: "...",
      status: "Validated",
    },
    {
      name: "Fredy",
      shift: "7:00 - 15:00",
      hours: "8hrs al día",
      role: "...",
      status: "Pending",
    },
    {
      name: "Cristel",
      shift: "7:00 - 15:00",
      hours: "8hrs al día",
      role: "...",
      status: "Pending",
    },
    {
      name: "Luis",
      shift: "7:00 - 15:00",
      hours: "8hrs al día",
      role: "...",
      status: "Pending",
    },
    {
      name: "Brayan",
      shift: "7:00 - 15:00",
      hours: "8hrs al día",
      role: "...",
      status: "Validated",
    },
    {
      name: "Gael",
      shift: "7:00 - 15:00",
      hours: "8hrs al día",
      role: "...",
      status: "Validated",
    },
  ];

  return (
    <div>
      <Navigation/>
      <Navbar variant="dark" className="navbar-wide row">
        <div class="row container">
          <FontAwesomeIcon
            className="col-1"
            icon={faHouseChimney}
            style={{ color: "#000000", fontSize: "2rem" }}
          />
          <FontAwesomeIcon
            className="col-1"
            icon={faUser}
            style={{ color: "#000000", fontSize: "2rem" }}
          />
        </div>
      </Navbar>

      {/* Contenido Principal */}
      <Container className="col-12">
        <div class="container">
          <div class="row">
            <div class="col">
              <h1>Validar Solicitudes</h1>
            </div>
            <br></br>
            <div class="col-5">
              <form className="d-flex">
                <input
                  className="form-control me-2 "
                  type="search"
                  placeholder="Buscar..."
                  aria-label="Search"
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
        <div class="container">
          <div class="row">
            <div class="col">
              <button type="button" class="btn btn-light">
                Actualizar
              </button>
            </div>
            <div class="col-1">
              <button type="button" class="btn btn-success btn-sm">
                Aceptar todo
              </button>
            </div>
            <div class="col-1">
              <button type="button" class="btn btn-danger btn-sm">
                Denegar todo
              </button>
            </div>
          </div>
        </div>
        <br></br>
        <div class="col-12">
          <div className="row">
            <table className="table rounded">
              <thead>
                <tr>
                  <th></th>
                  <th>Empleado</th>
                  <th>Turno</th>
                  <th>Horario</th>
                  <th>Notas</th>
                  <th class="col-1">Validar</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <FontAwesomeIcon
                        icon={faCircleUser}
                        style={{ color: "#000000", fontSize: "1.5rem" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.shift}</td>
                    <td>{item.hours}</td>
                    <td>{item.role}</td>
                    <td style={{ textAlign: "center" }}>
                      <span style={{ marginRight: "30px" }}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "#63E6BE" }}
                        />
                      </span>
                      <span>
                        <FontAwesomeIcon
                          icon={faX}
                          style={{ color: "#e50606" }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default App;
