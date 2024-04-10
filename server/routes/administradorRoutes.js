/**
 * Nombre del Autor: Integrantes del equipo
 *
 * Funcionalidad:
 * Manejo de rutas para las operaciones POST,DELATE,PATCH Y UPDATE DE LOS USUARIOS
 */

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const administradorController = require("../controllers/administradorController");
const cors = require("cors");
const Administrador = require("../models/administradorSchema");
const { enviarCorreo } = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const XLSX = require('xlsx');
const csv = require('csv-parser');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Middleware para permitir CORS
router.use(cors());

//ruta para manejar la carga de archivos y agregarle un id unico a cada usuario ingresado
//de esa forma
router.post('/cargar', upload.single('file'), async (req, res) => {
  try {
    console.log('Recibiendo datos del archivo:', req.file);

    let usuarios = [];

    // Manejar archivo JSON
    if (req.file.mimetype === 'application/json') {
      // Leer el archivo JSON cargado
      usuarios = JSON.parse(fs.readFileSync(req.file.path, 'utf-8'));
    }
    // Manejar archivo XLSX
    else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      // Leer el archivo XLSX
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      usuarios = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }
    // Manejar archivo CSV
    else if (req.file.mimetype === 'text/csv') {
      // Leer el archivo CSV cargado
      usuarios = await new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', (error) => reject(error));
      });
    } else {
      throw new Error('Formato de archivo no compatible');
    }

    // Buscar el último administrador para obtener su ID
    const ultimoAdministrador = await Administrador.findOne().sort({
      id: -1,
    });

    let nuevoID = ultimoAdministrador ? ultimoAdministrador.id + 1 : 1; // Valor predeterminado si no hay administradores existentes

    // Iterar sobre los usuarios y guardarlos en la base de datos
    for (const usuario of usuarios) {
      // Crear un nuevo administrador con el ID generado
      const nuevoUsuario = new Administrador({
        ...usuario,
        id: nuevoID,
      });

      await nuevoUsuario.save();

      // Incrementar el ID para el próximo usuario
      nuevoID++;
    }

    console.log('Usuarios guardados exitosamente');
    res.status(201).json({ message: 'Usuarios cargados exitosamente' });

    // Eliminar el archivo después de cargar los datos
    fs.unlinkSync(req.file.path);
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    res.status(500).json({ error: 'Error en el servidor al cargar usuarios' });
  }
});

// Ruta para crear un nuevo Administrador
router.post("/", administradorController.validarCorreoUnico, async (req, res) => {
  try {
    // Obtener el ID del último administrador
    const ultimoAdministrador = await Administrador.findOne().sort({ id: -1 });
    let nuevoID = 1; // Valor predeterminado si no hay administradores existentes

    // Si hay administradores existentes y su ID es un número, incrementar el ID
    if (ultimoAdministrador && !isNaN(ultimoAdministrador.id)) {
      nuevoID = ultimoAdministrador.id + 1;
    }

    // Crear un nuevo administrador con los datos recibidos en la solicitud
    const nuevoAdministrador = new Administrador({ ...req.body, id: nuevoID });

    // Guardar el nuevo administrador en la base de datos
    const administradorGuardado = await nuevoAdministrador.save();

    // Enviar una respuesta con el administrador guardado
    res.status(201).json(administradorGuardado);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al crear un nuevo administrador" });
  }
});


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
    const empleado = await Administrador.findOne({
      Correo: correo,
      loginToken: token,
    });
    if (!empleado) {
      return res.status(401).json({ error: "Correo electrónico o token inválido" });
    }
    res.json({ message: "Inicio de sesión exitoso", user: empleado }); // Devuelve los datos del usuario junto con el mensaje de éxito
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});


// Ruta para cerrar sesión (Empleado)
router.post("/logout", async (req, res) => {
  try {
    // Devuelve una respuesta indicando que la sesión se ha cerrado exitosamente
    res.json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para que el administrador inicie sesión con la contraseña
router.post("/administrador/login", async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    // Buscar al administrador por su correo electrónico
    const administrador = await Administrador.findOne({ Correo: correo });

    // Verificar si el administrador existe
    if (!administrador) {
      return res.status(401).json({ error: "Correo electrónico incorrecto" });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(
      contraseña,
      administrador.Contraseña
    );
    if (!contraseñaValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Si la contraseña es válida, enviar mensaje de inicio de sesión exitoso junto con los datos del administrador
    res.json({ message: "Inicio de sesión exitoso", user: administrador });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para cerrar sesión del administrador
router.post("/administrador/logout", async (req, res) => {
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
