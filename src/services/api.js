// src/services/api.js
import axios from 'axios';

// La URL se leerá de Vercel (VITE_API_URL).
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

// Interceptor para agregar token JWT (del plan original)
api.interceptors.request.use(config => {
  // Nota: Tu token se llama 'mobinel_token'
  const token = localStorage.getItem('mobinel_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar 401/403 (redireccionamiento a login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si la respuesta es 401 o 403, limpiar token y redirigir
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('mobinel_token');
      localStorage.removeItem('mobinel_user');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

// 1. FUNCIONES DE AUTENTICACIÓN
export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('mobinel_token', response.data.token);
    localStorage.setItem('mobinel_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// 2. FUNCIONES DE CHAT NEL
export const sendMessageToNEL = async (mensaje, orderId = null) => {
  // Llama a la ruta ya corregida y autenticada en el backend
  const response = await api.post('/api/nel/chat', {
    mensaje,
    pedido_id: orderId
  });
  return response.data;
};

// 3. OTRAS FUNCIONES (Ejemplo, necesaria para el dashboard)
export const getOrders = async () => {
  const response = await api.get('/api/pedidos');
  return response.data;
};