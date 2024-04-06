const fs = require('fs');
const Administrador = require('../models/administradorSchema');

exports.uploadUsers = async (req, res) => {
  try {
    console.log('Path del archivo:', req.file.path);
  
    // Leer el archivo JSON cargado
    const usuarios = JSON.parse(fs.readFileSync(req.file.path, 'utf-8'));
    console.log('Usuarios leídos del archivo:', usuarios);
  
    // Insertar usuarios en la base de datos
    await Administrador.insertMany(usuarios);
  
    res.status(200).send();
  } catch (error) {
    console.error('Error al cargar usuarios desde el archivo:', error);
    res.status(500).json({ error: 'Error en el servidor al cargar usuarios.' });
  }
};
