const Empleado = require('../models/empleadoSchema');

// Middleware para validar correo electrónico único
exports.validarCorreoUnico = async (req, res, next) => {
  const { Correo } = req.body;
  const empleadoId = req.params.id; // Suponiendo que el ID del empleado se pasa en los parámetros de la ruta
  try {
    const empleadoExistente = await Empleado.findOne({ Correo });
    if (empleadoExistente && empleadoExistente._id.toString() !== empleadoId) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }
    next(); // Continuar con la siguiente función de middleware si el correo es único
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Controlador para actualizar un empleado existente
exports.actualizarEmpleado = async (req, res) => {
  try {
    // Buscar el empleado por su ID
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      // Si no se encuentra el empleado, devuelve un error 404
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // Actualizar los campos del empleado con los datos recibidos en el cuerpo de la solicitud
    // No es necesario verificar la existencia de los campos ya que el middleware ya validó el correo electrónico único
    empleado.Nombre = req.body.Nombre;
    empleado.AppE = req.body.AppE;
    empleado.ApmE = req.body.ApmE;
    empleado.FechaNac = req.body.FechaNac;
    empleado.Correo = req.body.Correo;
    empleado.Region = req.body.Region;
    empleado.AreaTrabajo = req.body.AreaTrabajo;
    empleado.Rol = req.body.Rol;

    // Guardar los cambios en la base de datos
    const empleadoActualizado = await empleado.save();
    // Responder con el empleado actualizado
    res.json(empleadoActualizado);
  } catch (error) {
    // Si ocurre un error, responder con un código de estado 400 y un mensaje de error
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
