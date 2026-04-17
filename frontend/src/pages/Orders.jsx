import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { OrderCard } from '../components/OrderCard';

const Orders = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Debes iniciar sesión');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/orders/my', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          navigate('/login');
          throw new Error('Sesión inválida. Inicia sesión nuevamente.');
        }
        throw new Error('Error al cargar pedidos');
      }

      const data = await response.json();
      setOrders(data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar pedidos');
      console.error('Orders fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendiente':
        return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', emoji: '⏳' };
      case 'confirmado':
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', emoji: '✓' };
      case 'en_preparacion':
        return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', emoji: '👨‍🍳' };
      case 'en_camino':
        return { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', emoji: '🏍️' };
      case 'entregado':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', emoji: '✅' };
      case 'cancelado':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', emoji: '❌' };
      default:
        return { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', emoji: '?' };
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">📋 Mis Pedidos</h1>
            <p className="text-slate-600 mt-2">Consulta el estado y el historial de tus pedidos</p>
          </div>
          <button 
            onClick={fetchOrders} 
            className="px-6 py-3 rounded-xl bg-[#FF6B35] text-white font-bold hover:shadow-lg transition"
          >
            🔄 Refrescar
          </button>
        </div>

        {loading ? (
          /* Loading State */
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-20 bg-slate-300 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="text-center py-20">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{error}</h2>
            <p className="text-slate-600 mb-6">No pudimos cargar tus pedidos</p>
            <button 
              onClick={fetchOrders}
              className="inline-block px-8 py-3 rounded-xl bg-[#FF6B35] text-white font-bold hover:shadow-lg transition"
            >
              🔄 Intentar de nuevo
            </button>
          </div>
        ) : orders.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Aún no has realizado pedidos</h2>
            <p className="text-slate-600 mb-6">¡Comienza a pedir deliciosa comida y más!</p>
            <a 
              href="/catalog" 
              className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#F04C1F] text-white font-bold hover:shadow-lg transition"
            >
              Ir al catálogo
            </a>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orders.map((order) => {
              const statusConfig = getStatusColor(order.estado);
              const orderDate = new Date(order.createdAt).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div key={order._id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition">
                  {/* Order Header */}
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          Pedido #{order._id.slice(-6).toUpperCase()}
                        </h3>
                        <p className="text-sm text-slate-500">{orderDate}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-lg ${statusConfig.bg} ${statusConfig.border} border`}>
                        <span className="font-semibold text-sm">
                          {statusConfig.emoji} {order.estado.charAt(0).toUpperCase() + order.estado.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4 bg-slate-50">
                    <h4 className="text-sm font-semibold text-slate-600 mb-3">Productos:</h4>
                    <div className="space-y-2">
                      {order.items && order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700">
                            {item.productoId?.nombre || 'Producto no disponible'} x {item.cantidad}
                          </span>
                          <span className="font-semibold text-slate-900">
                            ${(item.productoId?.precio * item.cantidad || 0).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="px-6 py-4 flex items-center justify-between bg-white">
                    <div>
                      <p className="text-sm text-slate-600">Total:</p>
                      <p className="text-2xl font-bold text-[#FF6B35]">${order.total.toLocaleString()}</p>
                    </div>
                    <a
                      href={`/order/${order._id}`}
                      className="px-6 py-2 rounded-lg bg-[#FF6B35] text-white font-semibold hover:bg-[#F04C1F] transition"
                    >
                      Ver detalles
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
