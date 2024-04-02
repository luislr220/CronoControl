const Contrato = require('../models/contratoSchema');
// Controlador para crear un nuevo contrato
exports.agregarContrato = async (req, res) => {
  try {
    const nuevoContrato = new Contrato({
      nombreContrato: req.body.nombreContrato,
      fechaInicio: req.body.fechaInicio,
      fechaFin: req.body.fechaFin,
      diasLaborales: req.body.diasLaborales,
      diasDescanso: req.body.diasDescanso,
    });

    const contratoGuardado = await nuevoContrato.save();
    res.status(201).json(contratoGuardado);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};


// Middleware para validar correo electrónico único
exports.validarContratoExistente = async (req, res, next) => {
  const { correo } = req.body;
  const contratoId = req.params.id; // Suponiendo que el ID del contrato se pasa en los parámetros de la ruta
  try {
    const contratoExistente = await Contrato.findOne({ correo });
    if (contratoExistente && contratoExistente._id.toString() !== contratoId) {
      return res.status(400).json({ error: 'El contrato ya existe.' });
    }
    next(); // Continuar con la siguiente función de middleware si el contrato es único
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Controlador para actualizar un contrato existente
exports.actualizarContrato = async (req, res) => {
  try {
    // Buscar el contrato por su ID
    const contrato = await Contrato.findById(req.params.id);
    if (!contrato) {
      // Si no se encuentra el contrato, devuelve un error 404
      return res.status(404).json({ message: "Contrato no encontrado" });
    }

    // Actualizar los campos del contrato con los datos recibidos en el cuerpo de la solicitud
    // Incluyendo el nuevo campo nombreContrato
    contrato.nombreContrato = req.body.nombreContrato;
    contrato.fechaInicio = req.body.fechaInicio;
    contrato.fechaFin = req.body.fechaFin;
    contrato.diasLaborales = req.body.diasLaborales;
    contrato.diasDescanso = req.body.diasDescanso;

    // Guardar los cambios en la base de datos
    const contratoActualizado = await contrato.save();
    // Responder con el contrato actualizado
    res.json(contratoActualizado);
  } catch (error) {
    // Si ocurre un error, responder con un código de estado 400 y un mensaje de error
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Controlador para eliminar un contrato por su ID
exports.eliminarContrato = async (req, res) => {
  try {
    const contratoEliminado = await Contrato.findByIdAndDelete(req.params.id);
    if (!contratoEliminado) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }
    res.json({ message: "Contrato eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
