import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) {
      setError('Completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Error al iniciar sesión');
      } else {
        login(data.token);
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#F04C1F] flex items-center justify-center mx-auto text-white font-bold text-3xl mb-4">
            R
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Bienvenido a Rappi</h1>
          <p className="text-slate-600 mt-2">Inicia sesión para continuar</p>
        </div>
        
        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#FF6B35] focus:outline-none transition"
                aria-label="Email"
              />
            </div>
            
            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#FF6B35] focus:outline-none transition"
                aria-label="Contraseña"
              />
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-sm text-red-700 font-medium">⚠️ {error}</p>
              </div>
            )}
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#F04C1F] text-white font-bold shadow-lg hover:shadow-xl transition disabled:opacity-70 text-lg"
            >
              {loading ? '⏳ Cargando...' : '🚀 Ingresar'}
            </button>
          </form>
          
          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm text-slate-500">o</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>
          
          {/* Register Link */}
          <p className="text-center text-slate-600">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="font-bold text-[#FF6B35] hover:text-[#F04C1F] transition">
              Regístrate aquí
            </Link>
          </p>
        </div>
        
        {/* Demo Credentials (opcional para testing) */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <p className="text-xs text-blue-700 font-medium">💡 Prueba: admin@rappi.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
