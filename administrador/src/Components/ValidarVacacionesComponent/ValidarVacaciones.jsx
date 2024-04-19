//Lucía Cristel Ramírez Romero

// Importación de módulos y componentes de React y estilos
import React, { useState, useEffect } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';
import Navigation from '../NavigationComponent/Navigation';
import "./ValidarVacaciones.css"; 

/**
 * Componente de React para la validación de solicitudes de vacaciones.
 * Permite ver, filtrar, aprobar y denegar solicitudes de vacaciones.
 */

export default function ValidarVacaciones() {
  // Definición de estados utilizando el hook useState
  const [permisos, setPermisos] = useState([]); // Lista de permisos de vacaciones
  const [selectedItems, setSelectedItems] = useState([]); // Lista de permisos de vacaciones
  const [currentPage, setCurrentPage] = useState(1);  // Página actual
  const [itemsPerPage] = useState(5); // Número de elementos por página
  const [filtroEstado, setFiltroEstado] = useState('todos');  // Estado de filtro de permisos, inicialmente 'todos'

  // Efecto secundario que se ejecuta al montar el componente para obtener la lista de permisos
  useEffect(() => {
    const fetchPermisos = async () => {
      try {
<<<<<<< HEAD
        // Solicitud GET para obtener la lista de permisos desde el servidor
        const response = await fetch("http://localhost:3002/permiso");
        // Verificación de si la respuesta es exitosa
=======
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/permiso`);
>>>>>>> 493201dd4af993c60a91baf419c1ad2a3e0dc0eb
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de permisos");
        }
        // Conversión de la respuesta a formato JSON
        const data = await response.json();
        // Actualización del estado de permisos con los datos obtenidos
        setPermisos(data);
      } catch (error) {
        // Manejo de errores imprimiendo en la consola
        console.error(error);
      }
    };
    // Llamada a la función para obtener la lista de permisos
    fetchPermisos();
  }, []); // El efecto se ejecuta solo en el montaje inicial del componente

  // Función para manejar la selección/deselección de un elemento
  const handleSelectItem = (id) => {
    // Verificación de si el elemento ya está seleccionado
    if (selectedItems.includes(id)) {
      // Si está seleccionado, se elimina de la lista de elementos seleccionados
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      // Si no está seleccionado, se agrega a la lista de elementos seleccionados
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Función para aprobar las solicitudes seleccionadas
  const handleAprobarSolicitudes = async () => {
    try {
<<<<<<< HEAD
      // Solicitud POST para aprobar los permisos seleccionados
      await fetch("http://localhost:3002/permiso/aprobar", {
=======
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/permiso/aprobar`, {
>>>>>>> 493201dd4af993c60a91baf419c1ad2a3e0dc0eb
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // Cuerpo de la solicitud con los permisos seleccionados en formato JSON
        body: JSON.stringify({ permisos: selectedItems })
      });

      // Actualización del estado de permisos cambiando el estado de los permisos aprobados
      const updatedPermisos = permisos.map(permiso => {
        if (selectedItems.includes(permiso._id)) {
          return { ...permiso, estado: "Aprobado" };
        }
        return permiso;
      });
      setPermisos(updatedPermisos);

      // Limpiar la lista de elementos seleccionados después de la aprobación
      setSelectedItems([]);
    } catch (error) {
      // Manejo de errores imprimiendo en la consola
      console.error("Error al aprobar las solicitudes:", error);
    }
  };

  // Función para denegar las solicitudes seleccionadas
  const handleDenegarSolicitudes = async () => {
    try {
<<<<<<< HEAD
      // Solicitud POST para denegar los permisos seleccionados
      await fetch("http://localhost:3002/permiso/denegar", {
=======
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/permiso/denegar`, {
>>>>>>> 493201dd4af993c60a91baf419c1ad2a3e0dc0eb
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // Cuerpo de la solicitud con los permisos seleccionados en formato JSON
        body: JSON.stringify({ permisos: selectedItems })
      });

      // Actualización del estado de permisos cambiando el estado de los permisos denegados
      const updatedPermisos = permisos.map(permiso => {
        if (selectedItems.includes(permiso._id)) {
          return { ...permiso, estado: "Denegado" };
        }
        return permiso;
      });
      setPermisos(updatedPermisos);

      // Limpiar la lista de elementos seleccionados después de la denegación
      setSelectedItems([]);
    } catch (error) {
      // Manejo de errores imprimiendo en la consola
      console.error("Error al denegar las solicitudes:", error);
    }
  };

  // Función para manejar el cambio en el filtro de estado
  const handleFiltroEstadoChange = (e) => {
    setFiltroEstado(e.target.value);  // Actualización del estado de filtro de estado
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Filtrado de los permisos según el estado seleccionado y paginación de los resultados
  const currentItems = permisos.filter((permiso) => {
    if (filtroEstado === 'todos') {
      return true;
    } else {
      return permiso.estado === filtroEstado;
    }
  }).slice(indexOfFirstItem, indexOfLastItem);

  // Generación de números de página para la paginación
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(permisos.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Función para cambiar a una página específica
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Renderizado del componente
  return (
    <div className='cuerpo'>
      <Navigation />  {/* Componente de navegación */}
      <div className='cuerpo1'>
        <h2 className="AGEMTitulo">Validación Vacaciones</h2>
        {/* Menú desplegable para seleccionar el estado del filtro */}
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
              <th>Fecha de Inicio</th>
              <th>Fecha de Finalización</th>
              <th>Justificación</th>
              <th>Estado de Solicitud</th>
            </tr>
          </thead>
          <tbody className="AGEMTable-tbody">
            {/* Mapeo de los permisos actuales para renderizar filas de la tabla */}
            {currentItems.map((permiso, index) => (
              <tr key={index}>
                {/* Checkbox para seleccionar/deseleccionar el permiso */}
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(permiso._id)}
                    onChange={() => handleSelectItem(permiso._id)}
                  />
                </td>
                {/* Datos del permiso */}
                <td>{permiso.nombreCompleto}</td>
                <td>{permiso.fechaInicioVacaciones}</td>
                <td>{permiso.fechaFinVacaciones}</td>
                <td>{permiso.justificacion}</td>
                <td>{permiso.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
         {/* Botones para aprobar/denegar solicitudes */}
        <div className="d-flex justify-content-end mb-3 validar-buttons">
          <Button variant="success" className="mr-2" onClick={handleAprobarSolicitudes}>Aprobar solicitud(s)</Button>
          <Button variant="danger" onClick={handleDenegarSolicitudes}>Denegar solicitud(es)</Button>
        </div>
        <div className="d-flex justify-content-center">
          <Pagination>
            {/* Renderizado de botones de paginación */}
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
