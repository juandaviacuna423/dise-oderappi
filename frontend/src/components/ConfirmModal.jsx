const ConfirmModal = ({ open, onClose, onConfirm, items, total }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#FF6B35] p-4 text-white flex-shrink-0">
          <h2 className="text-xl font-bold">Confirmar pedido</h2>
          <p className="text-white/80 text-sm">Revisa los detalles</p>
        </div>

        {/* Content - Scrollable */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* Items List */}
          <div className="mb-4">
            <h3 className="text-xs font-bold text-slate-600 uppercase mb-2">Productos ({items.length})</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.productoId} className="flex justify-between text-sm p-2 bg-slate-50 rounded">
                  <div>
                    <p className="font-semibold text-slate-900">{item.nombre}</p>
                    <p className="text-xs text-slate-500">x{item.cantidad}</p>
                  </div>
                  <p className="font-bold text-[#FF6B35]">${(item.precio * item.cantidad).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#FF6B35]/10 rounded-lg p-3 mb-4 border border-[#FF6B35]/20">
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-600 font-medium">Total</p>
              <p className="text-2xl font-bold text-[#FF6B35]">${total.toLocaleString()}</p>
            </div>
            <p className="text-xs text-slate-500 mt-1">Envío incluido</p>
          </div>

          {/* Benefits - Compact */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center p-2 rounded bg-slate-50">
              <span className="text-lg">🚀</span>
              <p className="text-xs font-semibold text-slate-700">Rápido</p>
            </div>
            <div className="text-center p-2 rounded bg-slate-50">
              <span className="text-lg">✅</span>
              <p className="text-xs font-semibold text-slate-700">Rastreo</p>
            </div>
            <div className="text-center p-2 rounded bg-slate-50">
              <span className="text-lg">🔒</span>
              <p className="text-xs font-semibold text-slate-700">Seguro</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center">
            Al confirmar aceptas nuestros términos
          </p>
        </div>

        {/* Actions - Fixed Bottom */}
        <div className="border-t border-slate-200 p-4 bg-slate-50 flex gap-2 flex-shrink-0">
          <button 
            onClick={onClose} 
            className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-900 font-bold text-sm hover:bg-slate-100"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 py-2 rounded-lg bg-[#FF6B35] text-white font-bold text-sm hover:bg-[#F04C1F]"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
