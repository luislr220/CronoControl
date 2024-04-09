const mongoose = require("mongoose");

// Para guardar en la nube: 
const MONGODB_URL = "mongodb+srv://Optimen:Optimen@cluster0.hthmjwm.mongodb.net/?retryWrites=true&w=majority";
//const MONGODB_URL = "mongodb://localhost:27017/cronocontrol";
// Configuración del registro de eventos
mongoose.connection.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
mongoose.connection.on('connected', () => {
  console.log('Conexión exitosa a MongoDB');
});

mongoose.connect(MONGODB_URL)
  .catch(err => console.error('Error al conectar a MongoDB:', err));

module.exports = mongoose;
