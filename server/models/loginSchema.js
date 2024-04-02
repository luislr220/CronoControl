const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  correoElectronico: {
    type: String,
    required: true,
    unique: true
  },
  contrasena: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['Super Administrador', 'Administrador', 'Empleado'],
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
