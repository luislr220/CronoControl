// empleadoRoutes.js

const express = require('express');
const router = express.Router();
const Empleado = require("../models/empleadoSchema");

// Ruta para obtener todos los empleados
router.get('/', async (req, res) => {
  try {
    // Busca todos los empleados en la base de datos
    const empleados = await Empleado.find();
    // Envía la lista de empleados como respuesta
    res.json(empleados);
  } catch (error) {
    // Si ocurre un error, devuelve un error 500 y un mensaje
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo empleado
router.post('/', async (req, res) => {
  // Crea un nuevo objeto Empleado con los datos recibidos en el cuerpo de la solicitud
  const nuevoEmpleado = new Empleado({
    Nombre: req.body.Nombre,
    AppE: req.body.AppE,
    ApmE: req.body.ApmE,
    FechaNac: req.body.FechaNac,
    Correo: req.body.Correo,
    Contrasena: req.body.Contrasena,
    Region: req.body.Region,
    AreaTrabajo: req.body.AreaTrabajo
  });

  try {
    // Guarda el nuevo empleado en la base de datos
    const empleadoGuardado = await nuevoEmpleado.save();
    // Responde con el nuevo empleado creado
    res.status(201).json(empleadoGuardado);
  } catch (error) {
    // Si ocurre un error, responde con un código de estado 400 y un mensaje de error
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
