import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../NavigationComponent/Navigation";
import "../ValidarSolisComponent/css/vali.css";

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await fetch("http://localhost:3002/empleados");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de solicitudes");
        }
        const data = await response.json();
        setSolicitudes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleAceptarSolicitud = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/solicitudes/${id}/aceptar`, {
        method: "PATCH",
      });
      if (!response.ok) {
        throw new Error("No se pudo aceptar la solicitud");
      }
      const data = await response.json();
      // Aquí puedes manejar la respuesta de acuerdo a tu lógica de aplicación
    } catch (error) {
      console.error(error);
    }
  };

  const handleDenegarSolicitud = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/solicitudes/${id}/denegar`, {
        method: "PATCH",
      });
      if (!response.ok) {
        throw new Error("No se pudo denegar la solicitud");
      }
      const data = await response.json();
      // Aquí puedes manejar la respuesta de acuerdo a tu lógica de aplicación
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navigation />
      <Container className="col-12">
        <div class="container">
          <div class="row">
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
                  <th className="col-1">Validar</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud, index) => (
                  <tr key={index}>
                    <td>
                      <FontAwesomeIcon
                        icon={faCircleUser}
                        style={{ color: "#000000", fontSize: "1.5rem" }}
                      />
                    </td>
                    <td>{solicitud.name}</td>
                    <td>{solicitud.shift}</td>
                    <td>{solicitud.hours}</td>
                    <td>{solicitud.role}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleAceptarSolicitud(solicitud.id)}
                      >
                        ✅
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleDenegarSolicitud(solicitud.id)}
                      >
                        ❌
                      </button>
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

export default Solicitudes;
