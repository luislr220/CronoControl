const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
  turnos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Turno' }]
});

module.exports = mongoose.model("Contract", contractSchema);
