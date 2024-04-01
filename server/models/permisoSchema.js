const mongoose = require('mongoose');

// Definir el esquema del permiso
const permisoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  areaTrabajo: {
    type: String,
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFinal: {
    type: Date,
    required: true
  },
  justificacion: {
    type: String,
    required: true
  }
});

// Crear un modelo a partir del esquema
const Permiso = mongoose.model('Permiso', permisoSchema);

module.exports = Permiso;
