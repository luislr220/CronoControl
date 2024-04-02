const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  administrador: { type: mongoose.Schema.Types.ObjectId, ref: 'administrador', required: true }, // Cambiado a tipo ObjectId
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true }
});

module.exports = mongoose.model('Actividad', actividadSchema);
