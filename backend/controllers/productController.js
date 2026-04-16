const Product = require('../models/Product');
const Store = require('../models/Store');

const getProductsByStore = async (req, res) => {
  const { search } = req.query;
  const storeId = req.params.storeId;

  try {
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    const query = { tienda: storeId };
    if (search) {
      query.nombre = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener productos' });
  }
};

const createProduct = async (req, res) => {
  const { nombre, descripcion, precio, imagen, stock, categoria, tienda } = req.body;

  if (!nombre || !precio || !stock || !tienda) {
    return res.status(400).json({ message: 'Nombre, precio, stock y tienda son obligatorios' });
  }

  if (precio <= 0 || stock < 0) {
    return res.status(400).json({ message: 'Precio debe ser mayor a 0 y stock no puede ser negativo' });
  }

  try {
    const store = await Store.findById(tienda);
    if (!store) {
      return res.status(404).json({ message: 'Tienda no encontrada' });
    }

    if (store.propietario.toString() !== req.user._id.toString() && req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para crear productos en esta tienda' });
    }

    const product = await Product.create({ nombre, descripcion, precio, imagen, stock, categoria, tienda });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear producto' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('tienda');
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const store = product.tienda;
    if (store.propietario.toString() !== req.user._id.toString() && req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para editar este producto' });
    }

    if (req.body.precio !== undefined && req.body.precio <= 0) {
      return res.status(400).json({ message: 'Precio debe ser mayor a 0' });
    }
    if (req.body.stock !== undefined && req.body.stock < 0) {
      return res.status(400).json({ message: 'Stock no puede ser negativo' });
    }

    product.nombre = req.body.nombre || product.nombre;
    product.descripcion = req.body.descripcion || product.descripcion;
    product.precio = req.body.precio !== undefined ? req.body.precio : product.precio;
    product.imagen = req.body.imagen || product.imagen;
    product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
    product.categoria = req.body.categoria || product.categoria;

    await product.save();
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar producto' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('tienda');
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const store = product.tienda;
    if (store.propietario.toString() !== req.user._id.toString() && req.user.rol !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
    }

    await product.remove();
    return res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar producto' });
  }
};

module.exports = {
  getProductsByStore,
  createProduct,
  updateProduct,
  deleteProduct
};
