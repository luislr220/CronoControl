const mongoose = require("mongoose");

const permisoSchema = new mongoose.Schema({
  nombreCompleto: { type: String, required: true },
  correo: { type: String, required: true },
  fechaInicioVacaciones: { type: Date, required: true },
  fechaFinVacaciones: { type: Date, required: true },
  justificacion: { type: String, required: true },
  estado: { type: String, required: true, default: "Pendiente" } // Nuevo campo estado
});

module.exports = mongoose.model("Permiso", permisoSchema);
