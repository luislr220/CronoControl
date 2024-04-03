const express = require("express");
const router = express.Router();
const administradorController = require("../controllers/administradorController");
const cors = require("cors");
const Administrador = require("../models/administradorSchema");
const { enviarCorreo } = require("../controllers/authController");
const uploadController = require("../controllers/uploadController");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Middleware para permitir CORS
router.use(cors());

// Configuración de Multer para almacenar archivos en el sistema de archivos del servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "usuarios.json");
  },
});
const upload = multer({ storage: storage });

// Ruta para manejar la carga de usuarios desde un archivo JSON
router.post(
  "/upload-users",
  upload.single("file"),
  uploadController.uploadUsers
);

// Ruta para enviar el token de inicio de sesión por correo electrónico
router.post("/login/token", async (req, res) => {
  const { Correo } = req.body;
  try {
    // Encuentra al empleado por su correo electrónico
    const empleado = await Administrador.findOne({ Correo, Rol: "Empleado" });
    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    // Genera un token único y temporal con duración de 20 minutos
    const token = jwt.sign({ userId: empleado._id }, "secreto", {
      expiresIn: "20m",
    });

    // Actualiza el campo de loginToken en la base de datos
    empleado.loginToken = token;
    await empleado.save();

    // Enviar el token por correo electrónico utilizando la función enviarCorreo desde authController
    await enviarCorreo(empleado.Correo, token);

    res.json({
      message:
        "Se ha enviado un correo electrónico con el token de inicio de sesión.",
    });
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//Ruta para que el usuario (Empleado) inicie sesión con el token
router.post("/login", async (req, res) => {
  const { correo, token } = req.body;
  try {
    // Busca al usuario por su correo electrónico y el token recibido
    const empleado = await Administrador.findOne({
      Correo: correo,
      loginToken: token,
    });
    if (!empleado) {
      // Si no se encuentra al usuario o el token es inválido, devuelve un error
      return res
        .status(401)
        .json({ error: "Correo electrónico o token inválido" });
    }
    res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para cerrar sesión
router.post("/logout", async (req, res) => {
  try {
    // Devuelve una respuesta indicando que la sesión se ha cerrado exitosamente
    res.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para obtener todos los administradores, con opción de seleccionar campos específicos
router.get("/", async (req, res) => {
  try {
    const camposSeleccionados = req.query.campos;
    let query = Administrador.find();
    if (camposSeleccionados) {
      const camposArray = camposSeleccionados.split(",");
      query = query.select(camposArray.join(" "));
    }
    const administradores = await query.exec();
    res.json(administradores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los administradores" });
  }
});

// Ruta para crear un nuevo Administrador
router.post(
  "/",
  administradorController.validarCorreoUnico,
  async (req, res) => {
    try {
      // Buscar el último administrador para obtener su ID
      const ultimoAdministrador = await Administrador.findOne().sort({
        id: -1,
      });

      let nuevoID = 1; // Valor predeterminado si no hay administradores existentes

      if (ultimoAdministrador) {
        // Si hay administradores existentes, incrementar el ID
        nuevoID = ultimoAdministrador.id + 1;
      }

      // Crear un nuevo administrador con el ID generado
      const nuevoAdministrador = new Administrador({
        ...req.body,
        id: nuevoID,
      });

      // Guardar el administrador en la base de datos
      await nuevoAdministrador.save();

      res.status(201).send(nuevoAdministrador);
    } catch (error) {
      res.status(400).json({ error: "Error al crear un nuevo administrador" });
    }
  }
);

// Ruta para actualizar un administrador existente
router.patch(
  "/:id",
  administradorController.validarCorreoUnico,
  async (req, res) => {
    try {
      const administrador = await Administrador.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!administrador) {
        return res.status(404).json({ error: "Administrador no encontrado" });
      }
      res.json(administrador);
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar el administrador" });
    }
  }
);

// Ruta para eliminar un administrador por su ID
router.delete("/:id", async (req, res) => {
  try {
    const administradorEliminado = await Administrador.findByIdAndDelete(
      req.params.id
    );
    if (!administradorEliminado) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }
    res.json({ message: "Administrador eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el administrador" });
  }
});

module.exports = router;
