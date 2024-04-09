const express = require('express');
const router = express.Router();
const Permiso = require("../models/permisoSchema");

// Ruta para obtener todos los permisos
router.get('/', async (req, res) => {
  try {
    const permisos = await Permiso.find();
    res.json(permisos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo permiso
router.post('/', async (req, res) => {
  const { nombreCompleto, correo, fechaInicioVacaciones, fechaFinVacaciones, justificacion, estado } = req.body;

  try {
    const nuevoPermiso = new Permiso({
      nombreCompleto: nombreCompleto,
      correo: correo,
      fechaInicioVacaciones: fechaInicioVacaciones,
      fechaFinVacaciones: fechaFinVacaciones,
      justificacion: justificacion
    });

    const permisoGuardado = await nuevoPermiso.save();
    res.status(201).json(permisoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para aprobar solicitudes
router.post('/aprobar', async (req, res) => {
    const { permisos } = req.body; // Array de IDs de permisos a aprobar
  
    try {
      // Actualizar el estado de los permisos en la base de datos
      await Permiso.updateMany(
        { _id: { $in: permisos } }, // Actualizar múltiples documentos con los IDs proporcionados
        { estado: 'Aprobado' } // Cambiar el estado a 'Aprobado'
      );
  
      res.json({ message: 'Solicitudes aprobadas correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Ruta para denegar solicitudes
  router.post('/denegar', async (req, res) => {
    const { permisos } = req.body; // Array de IDs de permisos a denegar
  
    try {
      // Actualizar el estado de los permisos en la base de datos
      await Permiso.updateMany(
        { _id: { $in: permisos } }, // Actualizar múltiples documentos con los IDs proporcionados
        { estado: 'Denegado' } // Cambiar el estado a 'Denegado'
      );
  
      res.json({ message: 'Solicitudes denegadas correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
 

module.exports = router;
