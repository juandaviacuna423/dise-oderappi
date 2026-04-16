const Store = require('../models/Store');

const getStores = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const categoria = req.query.categoria;

  const query = { activo: true };
  if (categoria && categoria !== 'todos') {
    query.categoria = categoria;
  }

  try {
    const total = await Store.countDocuments(query);
    const stores = await Store.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.json({
      data: stores,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener tiendas' });
  }
};

const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }
    return res.json(store);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener la tienda' });
  }
};

const createStore = async (req, res) => {
  const { nombre, descripcion, categoria, imagen, activo } = req.body;

  if (!nombre || !categoria) {
    return res.status(400).json({ message: 'Nombre y categoría son obligatorios' });
  }

  try {
    const store = await Store.create({
      nombre,
      descripcion,
      categoria,
      imagen,
      activo: activo !== false,
      propietario: req.user._id
    });
    return res.status(201).json(store);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la tienda' });
  }
};

const updateStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    store.nombre = req.body.nombre || store.nombre;
    store.descripcion = req.body.descripcion || store.descripcion;
    store.categoria = req.body.categoria || store.categoria;
    store.imagen = req.body.imagen || store.imagen;
    if (typeof req.body.activo === 'boolean') {
      store.activo = req.body.activo;
    }

    await store.save();
    return res.json(store);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar la tienda' });
  }
};

const deleteStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    await store.remove();
    return res.json({ message: 'Tienda eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar la tienda' });
  }
};

module.exports = {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
};
