const mongoose = require("mongoose");

const empleadoSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  AppE: { type: String, required: true },
  ApmE: { type: String, required: true },
  FechaNac: { type: Date, required: true },
  Correo: { type: String, required: true },
  Contrasena: { type: String, required: true },
  Region: { type: String, required: true },
  AreaTrabajo: { type: String, required: true },
  Rol:{type:String, require:true}
});

module.exports = mongoose.model("Empleado", empleadoSchema);