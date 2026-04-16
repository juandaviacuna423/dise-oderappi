const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, rol: user.rol },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '24h' }
  );
};

const register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    const user = await User.create({ nombre, email, password, rol });
    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json(userObj);
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = createToken(user);
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

module.exports = { register, login };
