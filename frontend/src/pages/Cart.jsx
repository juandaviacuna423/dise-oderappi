import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';

const Cart = () => {
  const { items, updateQuantity, total, clearCart } = useCart();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setToast({ type: 'error', message: 'Debes iniciar sesión' });
        return;
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ items: items.map((item) => ({ productoId: item.productoId, cantidad: item.cantidad })) })
      });

      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          logout();
          setToast({ type: 'error', message: 'Sesión inválida. Inicia sesión nuevamente.' });
          navigate('/login');
        } else {
          setToast({ type: 'error', message: data.message || 'Error al confirmar pedido' });
        }
        setModalOpen(false);
      } else {
        setToast({ type: 'success', message: '✓ Pedido confirmado correctamente' });
        clearCart();
        setTimeout(() => navigate('/orders'), 1500);
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Error de conexión al servidor' });
      console.error('Order error:', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">🛒 Tu Carrito</h1>
          <p className="text-slate-600">Revisa y confirma tus productos</p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-slate-600 mb-6">¡Agrega productos para empezar tu pedido!</p>
            <a 
              href="/catalog" 
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#F04C1F] text-white font-bold hover:shadow-lg transition"
            >
              Ir al catálogo
            </a>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.productoId} className="bg-white rounded-2xl p-6 border border-slate-100 flex items-center gap-6 hover:shadow-md transition">
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                      {item.imagen ? (
                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{item.nombre}</h3>
                      <p className="text-sm text-slate-500 mb-2">{item.descripcion}</p>
                      <p className="text-xl font-bold text-[#FF6B35]">${item.precio.toLocaleString()}</p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.productoId, Math.max(1, item.cantidad - 1))}
                        className="w-8 h-8 flex items-center justify-center font-bold text-slate-900 hover:bg-slate-200 rounded transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold text-slate-900">{item.cantidad}</span>
                      <button
                        onClick={() => updateQuantity(item.productoId, item.cantidad + 1)}
                        className="w-8 h-8 flex items-center justify-center font-bold text-slate-900 hover:bg-slate-200 rounded transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900 mb-2">
                        ${(item.precio * item.cantidad).toLocaleString()}
                      </p>
                      <button
                        onClick={() => updateQuantity(item.productoId, 0)}
                        className="text-sm text-red-600 hover:text-red-700 font-semibold"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 p-6 shadow-lg">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Resumen del pedido</h2>

                {/* Summary Items */}
                <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Envío:</span>
                    <span className="text-green-600 font-semibold">¡Gratis!</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900">Total:</span>
                    <span className="text-3xl font-bold text-[#FF6B35]">${total.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Impuestos incluidos</p>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#F04C1F] text-white font-bold shadow-lg hover:shadow-xl transition mb-3"
                >
                  ✓ Confirmar pedido
                </button>
                
                <a
                  href="/catalog"
                  className="block w-full text-center py-3 rounded-xl border-2 border-slate-200 text-slate-900 font-bold hover:bg-slate-50 transition"
                >
                  Continuar comprando
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal y Toast */}
      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        items={items}
        total={total}
      />

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
          duration={toast.type === 'success' ? 2000 : 3000}
        />
      )}
    </div>
  );
};

export default Cart;
