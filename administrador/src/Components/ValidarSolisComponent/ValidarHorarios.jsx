import React, { useState, useEffect } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';
import Navigation from '../NavigationComponent/Navigation';
import "./ValidarHorario.css";

export default function ValidarVacaciones() {
  const [permisos, setPermisos] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filtroEstado, setFiltroEstado] = useState('todos');

  useEffect(() => {
    const fetchPermisos = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/permisoHorario`);
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de permisos");
        }
        const data = await response.json();
        setPermisos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPermisos();
  }, []);

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleAprobarSolicitudes = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/permisoHorario/aprobar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ permisos: selectedItems })
      });

      const updatedPermisos = permisos.map(permiso => {
        if (selectedItems.includes(permiso._id)) {
          return { ...permiso, estado: "Aprobado" };
        }
        return permiso;
      });
      setPermisos(updatedPermisos);

      setSelectedItems([]);
    } catch (error) {
      console.error("Error al aprobar las solicitudes:", error);
    }
  };

  const handleDenegarSolicitudes = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/permisoHorario/denegar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ permisos: selectedItems })
      });

      const updatedPermisos = permisos.map(permiso => {
        if (selectedItems.includes(permiso._id)) {
          return { ...permiso, estado: "Denegado" };
        }
        return permiso;
      });
      setPermisos(updatedPermisos);

      setSelectedItems([]);
    } catch (error) {
      console.error("Error al denegar las solicitudes:", error);
    }
  };

  const handleFiltroEstadoChange = (e) => {
    setFiltroEstado(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = permisos.filter((permiso) => {
    if (filtroEstado === 'todos') {
      return true;
    } else {
      return permiso.estado === filtroEstado;
    }
  }).slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(permisos.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='cuerpo'>
      <Navigation />
      <div className='cuerpo1'>
        <h2 className="AGEMTitulo">Validación Horarios</h2>
        <div className="filtro-container">
          <select className="custom-filter-group" value={filtroEstado} onChange={handleFiltroEstadoChange}>
            <option value="todos">Todos</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Denegado">Denegado</option>
          </select>
        </div>
        <Table className="AGEMTable">
          <thead className="AGEMTable-thead">
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Sede</th>
              <th>Área</th>
              <th>Turno</th>
              <th>Justificación</th>
              <th>Estado de Solicitud</th>
            </tr>
          </thead>
          <tbody className="AGEMTable-tbody">
            {currentItems.map((permiso, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(permiso._id)}
                    onChange={() => handleSelectItem(permiso._id)}
                  />
                </td>
                <td>{permiso.nombreCompleto}</td>
                <td>{permiso.sede}</td>
                <td>{permiso.area}</td>
                <td>{permiso.turno}</td>
                <td>{permiso.justificacion}</td>
                <td>{permiso.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-end mb-3 validar-buttons">
          <Button variant="success" className="mr-2" onClick={handleAprobarSolicitudes}>Aprobar solicitud(s)</Button>
          <Button variant="danger" onClick={handleDenegarSolicitudes}>Denegar solicitud(es)</Button>
        </div>
        <div className="d-flex justify-content-center">
          <Pagination>
            {pageNumbers.map((number) => (
              <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                {number}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
}
