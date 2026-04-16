const ConfirmModal = ({ open, onClose, onConfirm, items, total }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in scale-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#F04C1F] p-6 text-white">
          <h2 className="text-2xl font-bold">✓ Confirmar tu pedido</h2>
          <p className="text-white/80 mt-1">Revisa los detalles antes de completar</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Items List */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-600 uppercase mb-4">Productos</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.productoId} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{item.nombre}</p>
                    <p className="text-xs text-slate-500 mt-1">Cantidad: {item.cantidad} {item.cantidad === 1 ? 'artículo' : 'artículos'}</p>
                  </div>
                  <p className="font-bold text-[#FF6B35] text-lg whitespace-nowrap ml-4">
                    ${(item.precio * item.cantidad).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#FF6B35]/10 rounded-xl p-4 mb-6 border border-[#FF6B35]/20">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Total a pagar</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#FF6B35]">
                  ${total.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 mt-1">Incluye envío gratis</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 rounded-lg bg-slate-50">
              <span className="text-xl mb-1">🚀</span>
              <p className="text-xs font-semibold text-slate-700">Envío rápido</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-slate-50">
              <span className="text-xl mb-1">✅</span>
              <p className="text-xs font-semibold text-slate-700">Rastreo en vivo</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-slate-50">
              <span className="text-xl mb-1">🔒</span>
              <p className="text-xs font-semibold text-slate-700">Pago seguro</p>
            </div>
          </div>

          {/* Notice */}
          <p className="text-xs text-slate-600 text-center mb-6 px-2">
            Al confirmar, aceptas nuestros términos de servicio y política de privacidad
          </p>
        </div>

        {/* Actions */}
        <div className="border-t border-slate-200 p-6 bg-slate-50 flex items-center gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 rounded-xl border-2 border-slate-300 text-slate-900 font-bold hover:bg-slate-100 transition"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#F04C1F] text-white font-bold shadow-lg hover:shadow-xl transition"
          >
            🎉 Confirmar pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
