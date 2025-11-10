import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  // Get user info from localStorage
  const userDataString = localStorage.getItem('mobinel_user');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const handleLogout = () => {
    localStorage.removeItem('mobinel_token');
    localStorage.removeItem('mobinel_user');
    navigate('/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        <div style={styles.logo}>M</div>
        <div>
          <h1 style={styles.title}>MOBINEL</h1>
          <p style={styles.subtitle}>Sistema de Producción CNC</p>
        </div>
      </div>

      <div style={styles.rightSection}>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{userData?.name || 'Usuario'}</div>
          <div style={styles.userRole}>{userData?.role || 'Operador'}</div>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(147, 51, 234, 0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  logo: {
    width: '48px',
    height: '48px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.3)'
  },
  title: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '13px',
    margin: 0
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  userInfo: {
    textAlign: 'right'
  },
  userName: {
    color: 'white',
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '2px'
  },
  userRole: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '12px'
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)'
  }
};
