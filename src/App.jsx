// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login.jsx'; 
import './index.css'; 

// Componente básico de Dashboard (Temporal)
const Dashboard = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-purple-700">✅ Dashboard Cargado Exitosamente</h1>
            <p className="mt-2 text-gray-600">Conexión al Backend lista. Ahora podrás probar el chat de NEL.</p>
        </div>
    );
}

// ✅ COMPONENTE PRIVATEROUTE AGREGADO
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('mobinel_token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas Privadas */}
        <Route 
            path="/dashboard" 
            element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } 
        />
        
        {/* Redirección inicial: Si vas a /, te manda a /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<h1>404 | Página no encontrada</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;