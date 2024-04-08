import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vali.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleUser, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navigation from '../NavigationComponent/Navigation';

const ValidarSolis = () => {
  const [turnos, setTurnos] = useState([]);
  const [searchInputEmpleado, setSearchInputEmpleado] = useState('');
  const [searchInputTurno, setSearchInputTurno] = useState('');
  const [filteredTurnos, setFilteredTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await fetch('http://localhost:3002/turnos');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de turnos');
        }
        const data = await response.json();
        // Agregar propiedad de estado 'status' para cada turno
        const turnosWithStatus = data.map(turno => ({ ...turno, status: 'Pendiente' }));
        setTurnos(turnosWithStatus);
        setFilteredTurnos(turnosWithStatus);
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
          turno.Nombre.toLowerCase().includes(searchInputEmpleado.toLowerCase()) &&
          turno.HoraInicio.toLowerCase().includes(searchInputTurno.toLowerCase())
        );
      });
      setFilteredTurnos(filtered);
    };

    filterTurnos();
  }, [turnos, searchInputEmpleado, searchInputTurno]);

  const handleValidarTurno = (turnoId) => {
    console.log(`Validando turno con ID ${turnoId}`);
    const updatedTurnos = turnos.map(turno =>
      turno.id === turnoId ? { ...turno, status: 'Aprobada' } : turno
    );
    setTurnos(updatedTurnos);
  };

  const handleRechazarTurno = (turnoId) => {
    console.log(`Rechazando turno con ID ${turnoId}`);
    const updatedTurnos = turnos.map(turno =>
      turno.id === turnoId ? { ...turno, status: 'Rechazada' } : turno
    );
    setTurnos(updatedTurnos);
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
                    <th>Estado</th> {/* Agregado el encabezado del estado */}
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
                      <td>{turno.status}</td> {/* Mostrar el estado del turno */}
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