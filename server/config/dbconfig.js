const mongoose = require("mongoose");

const MONGODB_URL = "mongodb://127.0.0.1:27017/cronocontrol";

// Configuración del registro de eventos
mongoose.connection.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
mongoose.connection.on('connected', () => {
  console.log('Conexión exitosa a MongoDB');
});

mongoose.connect(MONGODB_URL)
  .catch(err => console.error('Error al conectar a MongoDB:', err));

module.exports = mongoose;
