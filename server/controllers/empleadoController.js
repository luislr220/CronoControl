// controllers/empleadoController.js

const Empleado = require('../models/empleadoSchema');

// Middleware para validar correo electrónico único
exports.validarCorreoUnico = async (req, res, next) => {
  const { Correo } = req.body;
  try {
    const empleadoExistente = await Empleado.findOne({ Correo });
    if (empleadoExistente) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }
    next(); // Continuar con la siguiente función de middleware si el correo es único
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

