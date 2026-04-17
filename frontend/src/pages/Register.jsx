import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', password: '', password2: '', rol: 'cliente' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.nombre || !form.email || !form.password || !form.password2) {
      setError('Completa todos los campos');
      return;
    }
    if (form.password !== form.password2) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: form.nombre, email: form.email, password: form.password, rol: form.rol })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Error al registrar');
      } else {
        setSuccess('Registro exitoso. Redirigiendo...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError('Error de conexión');
      console.error('Register error:', err);
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
          <h1 className="text-3xl font-bold text-slate-900">Únete a Rappi</h1>
          <p className="text-slate-600 mt-2">Crea tu cuenta para empezar</p>
        </div>
        
        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Juan Pérez"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#FF6B35] focus:outline-none transition"
                aria-label="Nombre"
              />
            </div>
            
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
              <p className="text-xs text-slate-500 mt-1">Mínimo 8 caracteres</p>
            </div>
            
            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={form.password2}
                onChange={(e) => setForm({ ...form, password2: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#FF6B35] focus:outline-none transition"
                aria-label="Confirmar contraseña"
              />
            </div>
            
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                ¿Qué tipo de cuenta deseas?
              </label>
              <select
                value={form.rol}
                onChange={(e) => setForm({ ...form, rol: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#FF6B35] focus:outline-none transition"
                aria-label="Rol"
              >
                <option value="cliente">👤 Cliente</option>
                <option value="repartidor">🏍️ Repartidor</option>
                <option value="admin">🔑 Administrador</option>
              </select>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-sm text-red-700 font-medium">⚠️ {error}</p>
              </div>
            )}
            
            {/* Success Message */}
            {success && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                <p className="text-sm text-green-700 font-medium">✅ {success}</p>
              </div>
            )}
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#F04C1F] text-white font-bold shadow-lg hover:shadow-xl transition disabled:opacity-70 text-lg mt-6"
            >
              {loading ? '⏳ Registrando...' : '🚀 Crear cuenta'}
            </button>
          </form>
          
          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm text-slate-500">o</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>
          
          {/* Login Link */}
          <p className="text-center text-slate-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-bold text-[#FF6B35] hover:text-[#F04C1F] transition">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
