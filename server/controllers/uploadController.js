const fs = require('fs');
const XLSX = require('xlsx');
const csv = require('csv-parser');
const Administrador = require('../models/administradorSchema');

exports.uploadUsers = async (req, res) => {
  try {
    console.log('Path del archivo:', req.file.path);

    let usuarios = [];

    // Manejar archivo JSON
    if (req.file.mimetype === 'application/json') {
      // Leer el archivo JSON cargado
      usuarios = JSON.parse(fs.readFileSync(req.file.path, 'utf-8'));
    }
    // Manejar archivo XLSX
    else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      // Leer el archivo XLSX
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0]; // asumimos que solo hay una hoja en el archivo
      usuarios = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }
    // Manejar archivo CSV
    else if (req.file.mimetype === 'text/csv') {
      // Leer el archivo CSV cargado
      const csvData = fs.readFileSync(req.file.path, 'utf-8');
      csvData.split('\n').forEach(row => {
        usuarios.push(row.split(','));
      });
    } else {
      throw new Error('Formato de archivo no compatible');
    }

    // Insertar usuarios en la base de datos
    await Administrador.insertMany(usuarios);

    // Eliminar el archivo después de cargar los datos
    fs.unlinkSync(req.file.path);

    res.status(200).send();
  } catch (error) {
    console.error('Error al cargar usuarios desde el archivo:', error);
    res.status(500).json({ error: 'Error en el servidor al cargar usuarios.' });
  }
};
