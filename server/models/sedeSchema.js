const mongoose = require("mongoose");

const sedeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  areas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Area' }] // Asociación con las áreas
});

module.exports = mongoose.model("Sede", sedeSchema);
