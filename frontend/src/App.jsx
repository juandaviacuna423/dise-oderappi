import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import StoreDetail from './pages/StoreDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const { token } = useAuth();
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
          <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-6">
              <Link to="/" className="flex items-center gap-2 no-underline group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#F04C1F] flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <span className="text-2xl font-bold text-slate-900 group-hover:text-[#FF6B35] transition">
                  Rappi
                </span>
              </Link>
              
              <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
                <Link to="/catalog" className="text-slate-700 hover:text-[#FF6B35] transition">
                  Catálogo
                </Link>
                {token && (
                  <>
                    <Link to="/cart" className="text-slate-700 hover:text-[#FF6B35] transition">
                      🛒 Carrito
                    </Link>
                    <Link to="/orders" className="text-slate-700 hover:text-[#FF6B35] transition">
                      📦 Pedidos
                    </Link>
                  </>
                )}
              </nav>
              
              <div className="flex items-center gap-3">
                {!token ? (
                  <Link to="/login" className="px-4 py-2 rounded-lg bg-[#FF6B35] text-white font-semibold hover:bg-[#F04C1F] transition text-sm">
                    Ingresar
                  </Link>
                ) : (
                  <Link to="/catalog" className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition text-sm">
                    ✓ Conectado
                  </Link>
                )}
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/catalog" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/store/:id" element={<StoreDetail />} />
              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>

          <footer className="bg-slate-900 text-white mt-16 py-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold mb-4">Acerca de</h3>
                  <p className="text-slate-400 text-sm">La mejor plataforma de delivery</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Tiendas</h3>
                  <p className="text-slate-400 text-sm">Restaurantes y más</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Ayuda</h3>
                  <p className="text-slate-400 text-sm">Soporte al cliente</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Legal</h3>
                  <p className="text-slate-400 text-sm">Términos y condiciones</p>
                </div>
              </div>
              <div className="border-t border-slate-800 pt-4 text-center text-slate-400 text-sm">
                <p>&copy; 2026 Rappi. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
