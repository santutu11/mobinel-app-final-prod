import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulación de login (reemplazar con API real)
      if (email && password) {
        localStorage.setItem('mobinel_token', 'fake-token-123');
        localStorage.setItem('mobinel_user', JSON.stringify({
          name: 'Anthony Ramírez',
          email: email,
          role: 'Técnico CNC'
        }));
        navigate('/dashboard');
      } else {
        setError('Por favor completa todos los campos');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            M
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MOBINEL Login</h1>
          <p className="text-gray-600">Accede a tu Sistema de Producción</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anthony@mobinel.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none transition"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg"
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Test credentials */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center mb-3">
            Cuentas de prueba:
          </p>
          <div className="space-y-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-4">
            <div>👷 <strong>Trabajador:</strong> anthony@mobinel.com</div>
            <div>👤 <strong>Cliente:</strong> carlos.ruiz@email.com</div>
            <div className="font-semibold text-purple-600">🔑 Password: password123</div>
          </div>
        </div>
      </div>
    </div>
  );
}