import React from 'react';

export default function Sidebar({ currentView, setCurrentView }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', color: '#9333ea' },
    { id: 'pedido', label: 'Pedido Actual', icon: '📋', color: '#3b82f6' },
    { id: 'nel', label: 'Asistente NEL', icon: '🤖', color: '#10b981' },
    { id: 'monitoreo', label: 'Monitoreo', icon: '📡', color: '#f59e0b' },
    { id: 'calidad', label: 'Calidad', icon: '✓', color: '#ef4444' },
    { id: 'inventario', label: 'Inventario', icon: '📦', color: '#8b5cf6' },
    { id: 'facturacion', label: 'Facturación', icon: '💰', color: '#06b6d4' }
  ];

  return (
    <aside style={styles.sidebar}>
      <nav style={styles.nav}>
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                ...styles.menuItem,
                ...(isActive ? styles.menuItemActive : {}),
                borderLeftColor: isActive ? item.color : 'transparent'
              }}
            >
              <span style={styles.menuIcon}>{item.icon}</span>
              <span style={{
                ...styles.menuLabel,
                color: isActive ? item.color : '#6b7280'
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div style={styles.footer}>
        <div style={styles.footerCard}>
          <div style={styles.footerIcon}>💡</div>
          <div style={styles.footerText}>
            <div style={styles.footerTitle}>Tip del día</div>
            <div style={styles.footerSubtitle}>
              Usa NEL para optimizar tus procesos
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '280px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'sticky',
    top: 0
  },
  nav: {
    flex: 1,
    padding: '24px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    overflowY: 'auto'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderLeft: '3px solid transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    fontFamily: 'inherit',
    width: '100%'
  },
  menuItemActive: {
    backgroundColor: '#f5f3ff'
  },
  menuIcon: {
    fontSize: '20px',
    minWidth: '24px',
    textAlign: 'center'
  },
  menuLabel: {
    fontSize: '15px',
    fontWeight: '600',
    transition: 'color 0.2s ease'
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid #e5e7eb'
  },
  footerCard: {
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start'
  },
  footerIcon: {
    fontSize: '24px'
  },
  footerText: {
    flex: 1
  },
  footerTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px'
  },
  footerSubtitle: {
    fontSize: '12px',
    color: '#6b7280',
    lineHeight: '1.4'
  }
};
