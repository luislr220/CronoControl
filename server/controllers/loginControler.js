const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginSchema = require('../models/loginSchema');

// Controlador para el inicio de sesión de usuarios
exports.login = async (req, res) => {
  const { correoElectronico, contrasena } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ correoElectronico });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token de autenticación
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      usuario: {
        _id: user._id,
        correoElectronico: user.correoElectronico,
        tipo: user.tipo
      },
      token
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.' });
  }
};
