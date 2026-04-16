import { useState } from 'react';

const stateStyles = {
  pendiente: 'bg-orange-100 text-orange-700',
  confirmado: 'bg-blue-100 text-blue-700',
  en_preparacion: 'bg-slate-100 text-slate-800',
  en_camino: 'bg-blue-100 text-blue-700',
  entregado: 'bg-emerald-100 text-emerald-700',
  cancelado: 'bg-red-100 text-red-700'
};

export const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'pendiente': return '⏳';
      case 'confirmado': return '✓';
      case 'en_preparacion': return '👨‍🍳';
      case 'en_camino': return '🏍️';
      case 'entregado': return '✅';
      case 'cancelado': return '❌';
      default: return '?';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendiente':
        return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' };
      case 'confirmado':
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' };
      case 'en_preparacion':
        return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' };
      case 'en_camino':
        return { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700' };
      case 'entregado':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' };
      case 'cancelado':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' };
      default:
        return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700' };
    }
  };

  const statusColor = getStatusColor(order.estado);
  const orderDate = new Date(order.createdAt).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition bg-white">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-xs font-bold text-slate-600 uppercase mb-1">Pedido #{order._id.slice(-7).toUpperCase()}</p>
            <h3 className="text-lg font-bold text-slate-900">{order.tienda?.nombre || 'Tienda'}</h3>
            <p className="text-sm text-slate-500 mt-1">Creado: {orderDate}</p>
          </div>
          <div className={`px-4 py-2 rounded-lg border-2 ${statusColor.bg} ${statusColor.border} text-center flex-shrink-0`}>
            <p className="text-xl">{getStatusEmoji(order.estado)}</p>
            <p className={`text-xs font-bold mt-1 ${statusColor.text} uppercase`}>
              {order.estado.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="px-6 py-4 bg-slate-50 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600 font-medium">Total del pedido:</p>
          <p className="text-2xl font-bold text-[#FF6B35]">${order.total.toLocaleString()}</p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="px-6 py-2 rounded-lg bg-white border-2 border-slate-200 text-slate-900 font-bold text-sm hover:bg-slate-50 transition"
        >
          {open ? '▲ Ocultar' : '▼ Ver productos'}
        </button>
      </div>

      {/* Items Detail (Expandable) */}
      {open && (
        <div className="max-h-96 overflow-y-auto">
          <div className="p-6 space-y-3 bg-white">
            {order.items && order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    {item.productoId?.nombre || item.nombre || 'Producto'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Cantidad: {item.cantidad}</p>
                </div>
                <p className="text-lg font-bold text-slate-900 whitespace-nowrap ml-4">
                  ${(item.productoId?.precio * item.cantidad || item.precio * item.cantidad).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
