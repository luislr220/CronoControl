const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  horaInicio: { type: String, required: true },
  horaFinal: { type: String, required: true },
  area: { type: String, required: true },
  cupo: { type: Number, required: true },
  estado: { type: String, required: true }
});

module.exports = mongoose.model("Turno", turnoSchema);
