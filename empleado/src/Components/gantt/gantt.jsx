import React, { useRef, useEffect } from 'react';
import { DataSet } from 'vis-data/peer';
import { Timeline } from 'vis-timeline/peer';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import Navigation from "../NavigationConponent/Navigation";

const GanttChart = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const container = timelineRef.current;


    const items = new DataSet([
      { id: 1, content: 'Task 1', start: '2022-01-01', end: '2022-01-03', style: 'background-color: #4CAF50;' },
      { id: 2, content: 'Task 2', start: '2022-01-03', end: '2022-01-05', style: 'background-color: #2196F3;' },
      { id: 3, content: 'Task 3', start: '2022-01-06', end: '2022-01-08', style: 'background-color: #f44336;' },
      { id: 4, content: 'Task 4', start: '2022-01-08', end: '2022-01-10', style: 'background-color: #FF9800;' },

      { id: 5, content: 'Employee 1', start: '2022-01-01', end: '2022-01-03', style: 'background-color: #4CAF50;' },
      { id: 6, content: 'Employee 2', start: '2022-01-02', end: '2022-01-04', style: 'background-color: #2196F3;' },
      { id: 7, content: 'Employee 3', start: '2022-01-03', end: '2022-01-05', style: 'background-color: #f44336;' },
      { id: 8, content: 'Employee 4', start: '2022-01-04', end: '2022-01-06', style: 'background-color: #FF9800;' },

    ]);

    const options = {
      height: '400px',
      min: '2022-01-01',
      max: '2022-01-17', // Ajustar según la duración total de los horarios de empleados
      zoomMin: 1000 * 60 * 60 * 24, // zoom mínimo en milisegundos (1 día)
      zoomMax: 1000 * 60 * 60 * 24 * 7, // zoom máximo en milisegundos (1 semana)
    };

    // Crear la línea de tiempo
    const timeline = new Timeline(container, items, options);

    return () => {
      timeline.destroy();
    };
  }, []);

  return (
    <>
      <Navigation />
      <div ref={timelineRef} />
    </>
  );
};

export default GanttChart;
