const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
