const express = require('express');
const router = express.Router();
const PermisoHorario = require("../models/permisoHorarioSchema");

// Ruta para obtener todos los permisos horarios
router.get('/', async (req, res) => {
  try {
    const permisosHorarios = await PermisoHorario.find();
    res.json(permisosHorarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo permiso horario
router.post('/', async (req, res) => {
  const { nombreCompleto, correo, sede, area, turno, justificacion } = req.body;

  try {
    const nuevoPermisoHorario = new PermisoHorario({
      nombreCompleto: nombreCompleto,
      correo: correo,
      sede: sede,
      area: area,
      turno: turno,
      justificacion: justificacion
    });

    const permisoHorarioGuardado = await nuevoPermisoHorario.save();
    res.status(201).json(permisoHorarioGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para aprobar solicitudes de permisos horarios
router.post('/aprobar', async (req, res) => {
  const { permisos } = req.body; // Array de IDs de permisos a aprobar
  
  try {
    // Actualizar el estado de los permisos horarios en la base de datos
    await PermisoHorario.updateMany(
      { _id: { $in: permisos } }, // Actualizar múltiples documentos con los IDs proporcionados
      { estado: 'Aprobado' } // Cambiar el estado a 'Aprobado'
    );
  
    res.json({ message: 'Solicitudes de permisos horarios aprobadas correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para denegar solicitudes de permisos horarios
router.post('/denegar', async (req, res) => {
  const { permisos } = req.body; // Array de IDs de permisos a denegar
  
  try {
    // Actualizar el estado de los permisos horarios en la base de datos
    await PermisoHorario.updateMany(
      { _id: { $in: permisos } }, // Actualizar múltiples documentos con los IDs proporcionados
      { estado: 'Denegado' } // Cambiar el estado a 'Denegado'
    );
  
    res.json({ message: 'Solicitudes de permisos horarios denegadas correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
