const express = require("express");
const router = express.Router();
const Actividad = require("../models/actividadesSchema");

// Ruta para obtener todas las actividades
router.get("/", async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.json(actividades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las actividades" });
  }
});

// Ruta para crear una nueva actividad
router.post("/", async (req, res) => {
  try {
    const nuevaActividad = new Actividad(req.body);
    await nuevaActividad.save();
    res.status(201).json(nuevaActividad);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al crear una nueva actividad" });
  }
});

// Ruta para obtener una actividad por su ID
router.get("/:id", async (req, res) => {
  try {
    const actividad = await Actividad.findById(req.params.id);
    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }
    res.json(actividad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la actividad" });
  }
});

// Ruta para actualizar una actividad existente por su ID
router.patch("/:id", async (req, res) => {
  try {
    const actividad = await Actividad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actividad) {
      return res.status(404).json({ error: "Actividad no encontrada" });
    }
    res.json(actividad);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al actualizar la actividad" });
  }
});

// Ruta para eliminar una actividad por su ID
router.delete("/:id", async (req, res) => {
  try {
    const actividadEliminada = await Actividad.findByIdAndDelete(req.params.id);
    if (!actividadEliminada) {
      return res.status(404).json({ error: "Actividad no encontrada" });
    }
    res.json({ message: "Actividad eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la actividad" });
  }
});

module.exports = router;