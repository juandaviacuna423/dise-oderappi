const Store = require('../models/Store');

const checkOwner = async (req, res, next) => {
  const storeId = req.params.id;
  const user = req.user;

  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    if (store.propietario.toString() !== user._id.toString() && user.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permisos para modificar esta tienda' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error al validar permisos' });
  }
};

module.exports = checkOwner;
