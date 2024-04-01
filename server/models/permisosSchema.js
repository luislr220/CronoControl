const mongoose = require("mongoose");


const permisosSchema = new mongoose.Schema({
  nombreCompleto: { type: String, required: true },
  areaTrabajo: { type: String, required: true },
  fechaInicioVacaciones: { type: Date, required: true },
  fechaFinVacaciones: { type: Date, required: true },
  justificacion: { type: String, required: true },
});


module.exports = mongoose.model("Permisos", permisosSchema);
