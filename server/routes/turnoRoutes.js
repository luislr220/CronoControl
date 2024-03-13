const Turno = require("../models/turnoSchema");
const express = require("express");
const router = express.Router();
const cors = require("cors"); 

router.use(cors());

// Ruta para obtener todos los turnos
router.get("/", async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo turno
router.post("/", async (req, res) => {
  const nuevoTurno = new Turno({
    nombre: req.body.nombre,
    horaInicio: req.body.horaInicio,
    horaFinal: req.body.horaFinal,
    area: req.body.area,
    cupo: req.body.cupo,
    estado: req.body.estado
  });

  try {
    const turnoGuardado = await nuevoTurno.save();
    res.status(201).json(turnoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para actualizar un turno existente
router.patch("/:id", async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id);
    if (!turno) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    turno.nombre = req.body.nombre || turno.nombre;
    turno.horaInicio = req.body.horaInicio || turno.horaInicio;
    turno.horaFinal = req.body.horaFinal || turno.horaFinal;
    turno.area = req.body.area || turno.area;
    turno.cupo = req.body.cupo || turno.cupo;
    turno.estado = req.body.estado || turno.estado;

    const turnoActualizado = await turno.save();
    res.json(turnoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar un turno por su ID
router.delete("/:id", async (req, res) => {
  try {
    const turnoEliminado = await Turno.findByIdAndDelete(req.params.id);
    if (!turnoEliminado) {
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    res.json({ message: "Turno eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
