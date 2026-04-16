const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tienda: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true
    },
    items: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        nombre: {
          type: String,
          required: true
        },
        precio: {
          type: Number,
          required: true,
          min: 0
        },
        cantidad: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    total: {
      type: Number,
      required: true,
      min: 0
    },
    estado: {
      type: String,
      enum: ['pendiente', 'confirmado', 'en_preparacion', 'en_camino', 'entregado', 'cancelado'],
      default: 'pendiente'
    },
    repartidor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
