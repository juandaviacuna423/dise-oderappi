const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
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
    categoria: {
      type: String,
      enum: ['restaurante', 'supermercado', 'farmacia', 'otros'],
      required: true
    },
    imagen: {
      type: String,
      default: ''
    },
    activo: {
      type: Boolean,
      default: true
    },
    propietario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

StoreSchema.index({ categoria: 1 });
StoreSchema.index({ propietario: 1 });

module.exports = mongoose.model('Store', StoreSchema);
