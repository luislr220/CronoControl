const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  HoraInicio: { type: String, required: true },
  HoraFinal: { type: String, required: true },
  Area: { type: Date, required: true },
  Cupo: { type: String, required: true },
  Estado: { type: String, required: true }
});

module.exports = mongoose.model("Turno", turnoSchema);