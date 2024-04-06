import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vali.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleUser, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navigation from '../NavigationComponent/Navigation';

const ValidarSolis = () => {
  const [turnos, setTurnos] = useState([]);
  const [solicitudesPermisos, setSolicitudesPermisos] = useState([]);
  const [searchInputEmpleado, setSearchInputEmpleado] = useState('');
  const [searchInputTurno, setSearchInputTurno] = useState('');
  const [filteredTurnos, setFilteredTurnos] = useState([]);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await fetch('http://localhost:3002/turnos');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de turnos');
        }
        const data = await response.json();
        setTurnos(data);
        setFilteredTurnos(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSolicitudesPermisos = async () => {
      try {
        const response = await fetch('http://localhost:3002/solicitudes-permisos');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de solicitudes de permisos');
        }
        const data = await response.json();
        setSolicitudesPermisos(data);
        setFilteredSolicitudes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTurnos();
    fetchSolicitudesPermisos();
  }, []);

  useEffect(() => {
    const filterTurnos = () => {
      let filtered = turnos.filter((turno) => {
        return (
          turno.Nombre.toLowerCase().includes(searchInputEmpleado.toLowerCase()) &&
          turno.HoraInicio.toLowerCase().includes(searchInputTurno.toLowerCase())
        );
      });
      setFilteredTurnos(filtered);
    };

    filterTurnos();
  }, [turnos, searchInputEmpleado, searchInputTurno]);

  useEffect(() => {
    const filterSolicitudes = () => {
      let filtered = solicitudesPermisos.filter((solicitud) => {
        return (
          solicitud.nombre.toLowerCase().includes(searchInputEmpleado.toLowerCase()) &&
          solicitud.fechaInicio.toLowerCase().includes(searchInputTurno.toLowerCase())
        );
      });
      setFilteredSolicitudes(filtered);
    };

    filterSolicitudes();
  }, [solicitudesPermisos, searchInputEmpleado, searchInputTurno]);

  const handleValidarTurno = (turnoId) => {
    console.log(`Validando turno con ID ${turnoId}`);
    // Aquí podrías escribir la lógica para validar el turno
  };

  const handleRechazarTurno = (turnoId) => {
    console.log(`Rechazando turno con ID ${turnoId}`);
    const updatedTurnos = filteredTurnos.filter(turno => turno.id !== turnoId);
    setFilteredTurnos(updatedTurnos);
    // Aquí podrías escribir la lógica para rechazar el turno
  };

  const handleValidarSolicitud = (solicitudId) => {
    console.log(`Validando solicitud con ID ${solicitudId}`);
    // Aquí podrías escribir la lógica para validar la solicitud de permisos
  };

  const handleRechazarSolicitud = (solicitudId) => {
    console.log(`Rechazando solicitud con ID ${solicitudId}`);
    const updatedSolicitudes = filteredSolicitudes.filter(solicitud => solicitud.id !== solicitudId);
    setFilteredSolicitudes(updatedSolicitudes);
    // Aquí podrías escribir la lógica para rechazar la solicitud de permisos
  };

  return (
    <div>
      <Navigation />
      {/* Contenido Principal */}
      <Container className="col-12">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Validar Turno</h1>
            </div>
            <br></br>
            <div className="col-5">
              <form className="d-flex">
                <input
                  className="form-control me-2 "
                  type="search"
                  placeholder="Buscar por empleado..."
                  aria-label="Search"
                  value={searchInputEmpleado}
                  onChange={(e) => setSearchInputEmpleado(e.target.value)}
                />
                <input
                  className="form-control me-2 "
                  type="search"
                  placeholder="Buscar por turno..."
                  aria-label="Search"
                  value={searchInputTurno}
                  onChange={(e) => setSearchInputTurno(e.target.value)}
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
            <div className="col">
              <button type="button" className="btn btn-light">
                Actualizar
              </button>
            </div>
          </div>
        </div>
        <br></br>
        <div className="col-12">
          <div className="row">
            <div className="col">
              <h2>Turnos</h2>
              <table className="table rounded">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Hora Inicio</th>
                    <th>Hora Final</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTurnos.map((turno, index) => (
                    <tr key={index}>
                      <td>
                        <FontAwesomeIcon
                          icon={faCircleUser}
                          style={{ color: '#000000', fontSize: '1.5rem' }}
                        />
                      </td>
                      <td>{turno.Nombre}</td>
                      <td>{turno.HoraInicio}</td>
                      <td>{turno.HoraFinal}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="btn btn-success mr-2"
                          onClick={() => handleValidarTurno(turno.id)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRechazarTurno(turno.id)}
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