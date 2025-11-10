// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import './index.css';

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