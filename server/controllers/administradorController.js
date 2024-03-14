const Administrador = require('../models/administradorSchema');

// Middleware para validar correo electrónico único
exports.validarCorreoUnico = async (req, res, next) => {
  const { Correo } = req.body;
  try {
    const administradorExistente = await Administrador.findOne({ Correo });
    if (administradorExistente) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }
    next(); // Continuar con la siguiente función de middleware si el correo es único
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Controlador para agregar un nuevo administrador
exports.agregarAdministrador = async (req, res) => {
  try {
    // Crear una instancia del administrador con los datos recibidos en el cuerpo de la solicitud
    const nuevoAdministrador = new Administrador(req.body);
    // Guardar el nuevo administrador en la base de datos
    const administradorGuardado = await nuevoAdministrador.save();
    // Responder con el administrador recién guardado
    res.status(201).json(administradorGuardado);
  } catch (error) {
    // Si ocurre un error, responder con un código de estado 400 y un mensaje de error
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
