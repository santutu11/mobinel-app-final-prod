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
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>M</div>
          <h1 style={styles.title}>MOBINEL Login</h1>
          <p style={styles.subtitle}>Accede a tu Sistema de Producción</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="anthony@mobinel.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              style={styles.input}
              required
            />
          </div>

          {error && (
            <div style={styles.error}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{...styles.button, opacity: loading ? 0.5 : 1}}
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Test credentials */}
        <div style={styles.footer}>
          <p style={styles.footerTitle}>Cuentas de prueba:</p>
          <div style={styles.credentials}>
            <div>👷 <strong>Trabajador:</strong> anthony@mobinel.com</div>
            <div>👤 <strong>Cliente:</strong> carlos.ruiz@email.com</div>
            <div style={{color: '#9333ea', fontWeight: 'bold'}}>🔑 Password: password123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
    padding: '40px',
    width: '100%',
    maxWidth: '450px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  logo: {
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
    borderRadius: '12px',
    margin: '0 auto 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '28px',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 8px 0'
  },
  subtitle: {
    color: '#6b7280',
    margin: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)'
  },
  error: {
    backgroundColor: '#fee',
    color: '#c00',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px'
  },
  footer: {
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid #e5e7eb'
  },
  footerTitle: {
    fontSize: '14px',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '12px'
  },
  credentials: {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '16px',
    fontSize: '12px',
    color: '#6b7280',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }
};