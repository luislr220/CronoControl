const mongoose = require("mongoose");

const permisoHorarioSchema = new mongoose.Schema({
  nombreCompleto: { type: String, required: true },
  correo: { type: String, required: true },
  sede: { type: String, required: true },
  area: { type: String, required: true },
  turno: { type: String, required: true },
  justificacion: { type: String, required: true },
  estado: { type: String, required: true, default: "Pendiente" }
});

module.exports = mongoose.model("PermisoHorario", permisoHorarioSchema);
