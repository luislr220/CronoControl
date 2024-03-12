const express = require("express");
const router = express.Router();
const cors = require("cors"); // Importa cors
const Empleado = require("../models/empleadoSchema");

router.use(cors());

// Ruta para obtener todos los empleados, con opción de seleccionar campos específicos
router.get("/", async (req, res) => {
  try {
    // Verifica si se especificaron campos específicos en la solicitud
    const camposSeleccionados = req.query.campos;
    let query = Empleado.find();
    // Si se especificaron campos, se seleccionan esos campos
    if (camposSeleccionados) {
      const camposArray = camposSeleccionados.split(",");
      query = query.select(camposArray.join(" "));
    }
    // Ejecuta la consulta y envía la lista de empleados como respuesta
    const empleados = await query.exec();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo empleado
router.post("/", async (req, res) => {
  // Crea un nuevo objeto Empleado con los datos recibidos en el cuerpo de la solicitud
  const nuevoEmpleado = new Empleado({
    Nombre: req.body.Nombre,
    AppE: req.body.AppE,
    ApmE: req.body.ApmE,
    FechaNac: req.body.FechaNac,
    Correo: req.body.Correo,
    Contrasena: req.body.Contrasena,
    Region: req.body.Region,
    AreaTrabajo: req.body.AreaTrabajo,
    Rol: req.body.Rol,
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

// Ruta para actualizar un empleado existente
router.patch("/:id", async (req, res) => {
  try {
    // Busca el empleado por su ID
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      // Si no se encuentra el empleado, devuelve un error 404
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // Actualiza los campos del empleado con los datos recibidos en el cuerpo de la solicitud
    if (req.body.Nombre) {
      empleado.Nombre = req.body.Nombre;
    }
    if (req.body.AppE) {
      empleado.AppE = req.body.AppE;
    }
    if (req.body.ApmE) {
      empleado.ApmE = req.body.ApmE;
    }
    if (req.body.FechaNac) {
      empleado.FechaNac = req.body.FechaNac;
    }
    if (req.body.Correo) {
      empleado.Correo = req.body.Correo;
    }
    if (req.body.Contrasena) {
      empleado.Contrasena = req.body.Contrasena;
    }
    if (req.body.Region) {
      empleado.Region = req.body.Region;
    }
    if (req.body.AreaTrabajo) {
      empleado.AreaTrabajo = req.body.AreaTrabajo;
    }
    if (req.body.Rol) {
      empleado.Rol = req.body.Rol;
    }

    // Guarda los cambios en la base de datos
    const empleadoActualizado = await empleado.save();
    // Responde con el empleado actualizado
    res.json(empleadoActualizado);
  } catch (error) {
    // Si ocurre un error, responde con un código de estado 400 y un mensaje de error
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar un empleado por su ID
router.delete("/:id", async (req, res) => {
  try {
    // Busca y elimina el empleado por su ID
    const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleadoEliminado) {
      // Si no se encuentra el empleado, devuelve un error 404
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    // Devuelve un mensaje indicando que el empleado fue eliminado con éxito
    res.json({ message: "Empleado eliminado" });
  } catch (error) {
    // Si ocurre un error, devuelve un error 500 y un mensaje
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
