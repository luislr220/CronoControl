const express = require('express');
const router = express.Router();
const SolicitudTurno = require('../models/solicitudTurnoSchema');


router.get('/solicitudes', async (req, res) => {
  try {
    // Obtener todas las solicitudes de turno
    const solicitudes = await SolicitudTurno.find();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

router.post('/validarSolicitud', async (req, res) => {
  // Obtener los datos del formulario de solicitud de horario
  const formData = req.body;

  // Obtener los datos del administrador autenticado
  const userData = req.user; // Suponiendo que ya tienes el usuario autenticado en req.user

  try {
    // Actualizar el campo "TurnoActual" del administrador con el turno seleccionado
    userData.TurnoActual = formData.turnoSeleccionado;

    // Guardar los cambios en el administrador
    const administradorActualizado = await userData.save();

    // Responder con un mensaje de éxito o cualquier otro dato necesario
    res.json({ message: 'Solicitud validada exitosamente', user: administradorActualizado });
  } catch (error) {
    // Si ocurre un error, responde con un código de estado 400 y un mensaje de error
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;