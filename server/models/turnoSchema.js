const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  Nombre: { type: String, required: false },
  HoraInicio: { type: String, required: false },
  HoraFinal: { type: String, required: false },
  Area: { type: String, required: false }, // Corregido de Date a String
  Cupo: { type: String, required: false },
  Estado: { type: String, required: false },
  Contrato: {type: String, require: false}
});

module.exports = mongoose.model("Turno", turnoSchema);
