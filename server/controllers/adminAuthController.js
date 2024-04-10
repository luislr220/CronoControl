// adminAuthController.js

const bcrypt = require('bcrypt');

// Función para verificar la contraseña del administrador
async function checkPassword(plainPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error al verificar la contraseña');
  }
}

module.exports = {
  checkPassword
};
