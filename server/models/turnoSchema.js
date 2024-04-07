const mongoose = require('mongoose');

const solicitudTurnoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Administrador' },
  turnoSeleccionado: { type: mongoose.Schema.Types.ObjectId, ref: 'Turno' },
  justificacion: { type: String, required: true },
  estado: { type: String, default: 'Pendiente' }
});

module.exports = mongoose.model('SolicitudTurno', solicitudTurnoSchema);