const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: './app.js', // Utiliza app.js como punto de entrada
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
