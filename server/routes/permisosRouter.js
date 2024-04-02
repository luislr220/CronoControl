const express = require('express');
const router = express.Router();
const Permiso = require('../models/permisoSchema'); // Asegúrate de que la ruta del modelo sea correcta

// Middleware para obtener un permiso por su ID
async function getPermiso(req, res, next) {
  let permiso;
  try {
    permiso = await Permiso.findById(req.params.id);
    if (permiso == null) {
      return res.status(404).json({ message: 'Permiso no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.permiso = permiso;
  next();
}

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
  const permiso = new Permiso({
    nombre: req.body.nombre,
    areaTrabajo: req.body.areaTrabajo,
    fechaInicio: req.body.fechaInicio,
    fechaFinal: req.body.fechaFinal,
    justificacion: req.body.justificacion,
    estado: req.body.estado
  });

  try {
    const nuevoPermiso = await permiso.save();
    res.status(201).json(nuevoPermiso);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para obtener un permiso por su ID
router.get('/:id', getPermiso, (req, res) => {
  res.json(res.permiso);
});

// Ruta para actualizar un permiso
router.patch('/:id', getPermiso, async (req, res) => {
  if (req.body.nombre != null) {
    res.permiso.nombre = req.body.nombre;
  }
  // Repite el proceso para los demás campos del permiso

  try {
    const permisoActualizado = await res.permiso.save();
    res.json(permisoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar un permiso
router.delete('/:id', getPermiso, async (req, res) => {
  try {
    await res.permiso.remove();
    res.json({ message: 'Permiso eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
