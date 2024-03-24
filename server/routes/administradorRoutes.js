const express = require("express");
const router = express.Router();
const administradorController = require("../controllers/administradorController");
const cors = require("cors"); // Importa cors
const Administrador = require("../models/administradorSchema");

router.use(cors());

// Ruta para obtener todos los adminitrador, con opción de seleccionar campos específicos
router.get("/", async (req, res) => {
  try {
    // Verifica si se especificaron campos específicos en la solicitud
    const camposSeleccionados = req.query.campos;
    let query = Administrador.find();
    // Si se especificaron campos, se seleccionan esos campos
    if (camposSeleccionados) {
      const camposArray = camposSeleccionados.split(",");
      query = query.select(camposArray.join(" "));
    }
    // Ejecuta la consulta y envía la lista de administrador como respuesta
    const administrador = await query.exec();
    res.json(administrador);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo Administrador
router.post(
  "/",
  administradorController.validarCorreoUnico,
  async (req, res) => {
    try {
      const {
        Nombre,
        AppE,
        ApmE,
        FechaNac,
        Correo,
        Contraseña,
        Region,
        AreaTrabajo,
        Rol,
      } = req.body;
      const nuevoAdministrador = new Administrador({
        Nombre,
        AppE,
        ApmE,
        FechaNac,
        Correo,
        Contraseña,
        Region,
        AreaTrabajo,
        Rol,
      });
      await nuevoAdministrador.save();
      res.status(201).send(nuevoAdministrador);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Ruta para actualizar un administrador existente
router.patch(
  "/:id",
  administradorController.validarCorreoUnico,
  async (req, res) => {
    try {
      // Busca el administrador por su ID
      const administrador = await Administrador.findById(req.params.id);
      if (!administrador) {
        // Si no se encuentra el administrador, devuelve un error 404
        return res.status(404).json({ message: "Administrador no encontrado" });
      }

      // Actualiza los campos del administrador con los datos recibidos en el cuerpo de la solicitud
      if (req.body.Nombre) {
        administrador.Nombre = req.body.Nombre;
      }
      if (req.body.AppE) {
        administrador.AppE = req.body.AppE;
      }
      if (req.body.ApmE) {
        administrador.ApmE = req.body.ApmE;
      }
      if (req.body.FechaNac) {
        administrador.FechaNac = req.body.FechaNac;
      }
      if (req.body.Correo) {
        // Verifica si el nuevo correo es diferente al correo actual
        if (administrador.Correo !== req.body.Correo) {
          // Si es diferente, verifica si el nuevo correo ya está en uso por otro administrador
          const administradorExistente = await Administrador.findOne({
            Correo: req.body.Correo,
          });
          if (administradorExistente) {
            return res
              .status(400)
              .json({ error: "El correo electrónico ya está registrado." });
          }
        }
        // Si el nuevo correo es único, actualiza el correo del administrador
        administrador.Correo = req.body.Correo;
      }
      if (req.body.Contraseña) {
        administrador.Contraseña = req.body.Contraseña;
      }
      if (req.body.Region) {
        administrador.Region = req.body.Region;
      }
      if (req.body.AreaTrabajo) {
        administrador.AreaTrabajo = req.body.AreaTrabajo;
      }
      if (req.body.Rol) {
        administrador.Rol = req.body.Rol;
      }

      // Guarda los cambios en la base de datos
      const administradorActualizado = await administrador.save();
      // Responde con el administrador actualizado
      res.json(administradorActualizado);
    } catch (error) {
      // Si ocurre un error, responde con un código de estado 400 y un mensaje de error
      res.status(400).json({ message: error.message });
    }
  }
);

// Ruta para eliminar un administrador por su ID
router.delete("/:id", async (req, res) => {
  try {
    // Busca y elimina el administrador por su ID
    const administradorEliminado = await Administrador.findByIdAndDelete(
      req.params.id
    );
    if (!administradorEliminado) {
      // Si no se encuentra el administrador, devuelve un error 404
      return res.status(404).json({ message: "Administrador no encontrado" });
    }
    // Devuelve un mensaje indicando que el administrador fue eliminado con éxito
    res.json({ message: "Administrador eliminado" });
  } catch (error) {
    // Si ocurre un error, devuelve un error 500 y un mensaje
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
