const Actividad = require('../models/actividadesSchema');

// Controlador para obtener todas las actividades
exports.obtenerActividades = async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.status(200).json(actividades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las actividades' });
  }
};

// Controlador para obtener una actividad por su ID
exports.obtenerActividadPorId = async (req, res) => {
  try {
    const actividad = await Actividad.findById(req.params.id);
    if (!actividad) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }
    res.status(200).json(actividad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la actividad' });
  }
};

// Controlador para crear una nueva actividad
exports.crearActividad = async (req, res) => {
  try {
    const { usuario, fechaInicio, fechaFin, nombre, descripcion } = req.body;
    const nuevaActividad = new Actividad({ usuario, fechaInicio, fechaFin, nombre, descripcion });
    const actividadGuardada = await nuevaActividad.save();
    res.status(201).json(actividadGuardada);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear la actividad' });
  }
};

// Controlador para actualizar una actividad existente
exports.actualizarActividad = async (req, res) => {
  try {
    const actividad = await Actividad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actividad) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }
    res.status(200).json(actividad);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar la actividad' });
  }
};

// Controlador para eliminar una actividad por su ID
exports.eliminarActividad = async (req, res) => {
  try {
    const actividadEliminada = await Actividad.findByIdAndDelete(req.params.id);
    if (!actividadEliminada) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }
    res.status(200).json({ message: 'Actividad eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la actividad' });
  }
};