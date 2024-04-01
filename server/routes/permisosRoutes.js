const express = require('express');
const router = express.Router();
const Permiso = require('../models/permisoSchema'); 

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

// Ruta para validar un permiso por su ID
router.patch('/:id/validar', getPermiso, async (req, res) => {
  try {
    res.permiso.estado = 'Validado';
    const permisoValidado = await res.permiso.save();
    res.json(permisoValidado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para rechazar un permiso por su ID
router.patch('/:id/rechazar', getPermiso, async (req, res) => {
  try {
    res.permiso.estado = 'Rechazado';
    const permisoRechazado = await res.permiso.save();
    res.json(permisoRechazado);
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

module.exports = router;
