const Order = require('../models/Order');
const Product = require('../models/Product');

const VALID_TRANSITIONS = {
  pendiente: ['confirmado', 'cancelado'],
  confirmado: ['en_preparacion'],
  en_preparacion: ['en_camino'],
  en_camino: ['entregado'],
  entregado: [],
  cancelado: []
};

const createOrder = async (req, res) => {
  if (req.user.rol !== 'cliente') {
    return res.status(403).json({ message: 'Solo clientes pueden crear pedidos' });
  }

  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'El carrito no puede estar vacío' });
  }

  try {
    const productos = await Product.find({ _id: { $in: items.map((item) => item.productoId) } });
    if (productos.length !== items.length) {
      return res.status(404).json({ message: 'Algún producto no existe' });
    }

    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const product = productos.find((p) => p._id.toString() === item.productoId);
      if (!product) {
        return res.status(404).json({ message: `Producto ${item.productoId} no encontrado` });
      }
      if (item.cantidad < 1) {
        return res.status(400).json({ message: 'Cantidad inválida para un producto' });
      }
      if (product.stock < item.cantidad) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.nombre}` });
      }

      orderItems.push({
        producto: product._id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: item.cantidad,
        tienda: product.tienda
      });
      total += product.precio * item.cantidad;
    }

    const order = await Order.create({
      cliente: req.user._id,
      items: orderItems,
      total,
      estado: 'pendiente'
    });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el pedido' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ cliente: req.user._id })
      .populate('tienda', 'nombre categoria imagen')
      .populate('repartidor', 'nombre email');
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

const updateOrderStatus = async (req, res) => {
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({ message: 'Estado nuevo es obligatorio' });
  }

  if (!['admin', 'repartidor'].includes(req.user.rol)) {
    return res.status(403).json({ message: 'Solo admin o repartidor pueden actualizar el estado' });
  }

  try {
    const order = await Order.findById(req.params.id).populate('tienda');
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    if (!VALID_TRANSITIONS[order.estado].includes(estado)) {
      return res.status(400).json({ message: 'Transición de estado inválida' });
    }

    if (order.estado === 'pendiente' && estado === 'confirmado') {
      for (const item of order.items) {
        const product = await Product.findById(item.producto);
        if (!product) {
          return res.status(404).json({ message: `Producto ${item.nombre} no encontrado` });
        }
        if (product.stock < item.cantidad) {
          return res.status(400).json({ message: `Stock insuficiente para ${item.nombre}` });
        }
        product.stock -= item.cantidad;
        await product.save();
      }
    }

    order.estado = estado;
    if (req.user.rol === 'repartidor' && estado === 'en_camino') {
      order.repartidor = req.user._id;
    }
    await order.save();

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el estado del pedido' });
  }
};

module.exports = { createOrder, getMyOrders, updateOrderStatus };
