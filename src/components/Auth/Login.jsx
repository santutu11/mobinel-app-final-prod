// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(credentials);
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Error de conexión. Inténtalo de nuevo.');
      console.error('Login Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center gradient-purple bg-clip-text text-transparent">
          MOBINEL Login
        </h2>
        <p className="text-center text-gray-600">Accede a tu Sistema de Producción</p>
        
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="anthony@mobinel.com o carlos.ruiz@email.com"
              required
              className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="password123"
              required
              className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 text-white font-semibold rounded-lg gradient-purple hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
