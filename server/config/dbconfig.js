const mongoose = require("mongoose");
const Administrador = require('../models/administradorSchema'); // Asegúrate de que tu modelo de administrador esté definido aquí

// Para guardar en la nube: 
//const MONGODB_URL = "mongodb+srv://Optimen:Optimen@cluster0.hthmjwm.mongodb.net/cronocontrol?retryWrites=true&w=majority";
//const MONGODB_URL = "mongodb://localhost:27017/cronocontrol";

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connection.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
mongoose.connection.on('connected', async () => {
  console.log('Conexión exitosa a MongoDB');

  try {
    // Busca un usuario root
    const user = await Administrador.findOne({Correo: 'root@root'});
    if(!user) {
      // Si no existe un usuario root, crea uno
      const rootUser = new Administrador({
        Nombre: 'Root',
        AppE: 'User',
        ApmE: 'User',
        FechaNac: new Date(),
        Correo: 'root@root',
        Contraseña: 'root321', // Asegúrate de encriptar esta contraseña en un entorno de producción
        Region: 'Global',
        AreaTrabajo: 'Administración',
        Rol: 'root',
        // Agrega aquí cualquier otro campo que necesites
      });

      await rootUser.save();
      console.log("Usuario root creado");
    } else {
      console.log("Usuario root ya existe");
    }
  } catch(err) {
    console.log(err);
  }
});

mongoose.connect(MONGODB_URL)
  .catch(err => console.error('Error al conectar a MongoDB:', err));

module.exports = mongoose;
