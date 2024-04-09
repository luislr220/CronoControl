const mongoose = require("mongoose");

const administradorSchema = new mongoose.Schema({
  id: { type: Number, required: false },
  Nombre: { type: String, required: true },
  AppE: { type: String, required: true },
  ApmE: { type: String, required: true },
  FechaNac: { type: Date, required: true },
  Correo: { type: String, required: true },
  Contraseña:{type:String, required:false},
  Region: { type: String, required: true },
  AreaTrabajo: { type: String, required: true },
  Entrenamiento: { type: String, required: false },
  Actividades:{type:[]},
  Contrato:{type:String, required:false},
  TurnoActual:{type:String, required:false},
  Rol:{type:String, require:true},
  loginToken: { type: String }
});

module.exports = mongoose.model("Administrador", administradorSchema);