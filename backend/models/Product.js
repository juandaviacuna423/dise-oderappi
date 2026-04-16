const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      default: '',
      trim: true
    },
    precio: {
      type: Number,
      required: true,
      min: 0.01
    },
    imagen: {
      type: String,
      default: ''
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    },
    categoria: {
      type: String,
      default: 'otros'
    },
    tienda: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true
    }
  },
  { timestamps: true }
);

ProductSchema.index({ tienda: 1 });
ProductSchema.index({ categoria: 1 });

module.exports = mongoose.model('Product', ProductSchema);
