import React, { useRef, useEffect, useState } from 'react';
import { DataSet } from 'vis-data/peer';
import { Timeline } from 'vis-timeline/peer';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import Navigation from "../NavigationConponent/Navigation";

const GanttChart = () => {
  const timelineRef = useRef(null);
  const [solicitudRecibida, setSolicitudRecibida] = useState(null);

  // Implementa la función recibirSolicitudGantt para recibir la información de la solicitud del componente de solicitud de vacaciones
  const recibirSolicitudGantt = (solicitud) => {
    // Lógica para procesar la información de la solicitud y actualizar el gráfico de Gantt
    // Por ejemplo, agregar la solicitud como una tarea al conjunto de datos del gráfico
    setSolicitudRecibida(solicitud);
  };

  // Implementa el efecto useEffect para llamar a la función recibirSolicitudGantt cuando se reciba una nueva solicitud
  useEffect(() => {
    if (solicitudRecibida) {
      recibirSolicitudGantt(solicitudRecibida);
    }
  }, [solicitudRecibida]);

  useEffect(() => {
    const container = timelineRef.current;

    const items = new DataSet([
      { id: 1, content: 'Tarea 1', start: '2022-01-01', end: '2022-01-03', group: 1, style: 'background-color: #4CAF50;' },
      { id: 3, content: 'Tarea 2', start: '2022-01-03', end: '2022-01-05', group: 2, style: 'background-color: #2196F3;' },
      { id: 2, content: 'Tarea 3', start: '2022-01-06', end: '2022-01-08', group: 3, style: 'background-color: #f44336;' },
      { id: 4, content: 'Tarea 4', start: '2022-01-08', end: '2022-01-10', group: 4, style: 'background-color: #FF9800;' },
    ]);

    const employees = [
      'Empleado 1', 'Empleado 2', 'Empleado 3', 'Empleado 4'
    ];

    const groups = new DataSet();
    employees.forEach((employee, index) => {
      groups.add({ id: index + 1, content: employee });
    });

    const options = {
      height: '400px',
      min: '2022-01-01',
      max: '2022-01-17',
      zoomMin: 1000 * 60 * 60 * 24,
      zoomMax: 1000 * 60 * 60 * 24 * 7,
      orientation: 'top', // Orientación de las bandas (parte izquierda del gráfico)
    };

    // Crear la línea de tiempo
    const timeline = new Timeline(container, items, groups, options);

    return () => {
      timeline.destroy();
    };
  }, []);

  return (
    <>
      <Navigation />
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <table style={{ backgroundColor: 'white', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th style={{ padding: '10px 0', textAlign: 'left' }}>Employee</th>
              <th style={{ padding: '10px 0', textAlign: 'left' }}>Tasks</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí puedes agregar las filas de la tabla */}
          </tbody>
        </table>
      </div>
      <div ref={timelineRef} />
    </>
  );
};

export default GanttChart;
