import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import NELInterface from './NELInterface';

// Dashboard View with Stats Cards
function DashboardView() {
  const stats = [
    { label: 'Pedidos Activos', value: '12', icon: '📋', color: '#3b82f6', bg: '#dbeafe' },
    { label: 'En Producción', value: '5', icon: '⚙️', color: '#10b981', bg: '#d1fae5' },
    { label: 'Completados Hoy', value: '8', icon: '✓', color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Eficiencia', value: '94%', icon: '📊', color: '#9333ea', bg: '#f5f3ff' }
  ];

  const pedidosMock = [
    { id: 'P-001', cliente: 'TechCorp', producto: 'Pieza CNC-450', estado: 'En Proceso', progreso: 75 },
    { id: 'P-002', cliente: 'IndustrialMax', producto: 'Eje Mecánico', estado: 'Control Calidad', progreso: 90 },
    { id: 'P-003', cliente: 'AutoParts Ltd', producto: 'Carcasa Metal', estado: 'Iniciando', progreso: 15 }
  ];

  return (
    <div style={styles.content}>
      <h2 style={styles.pageTitle}>Dashboard Principal</h2>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{...styles.statIcon, backgroundColor: stat.bg}}>
              <span style={{fontSize: '28px'}}>{stat.icon}</span>
            </div>
            <div style={styles.statContent}>
              <div style={styles.statLabel}>{stat.label}</div>
              <div style={{...styles.statValue, color: stat.color}}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pedidos Recientes */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Pedidos Recientes</h3>
        <div style={styles.table}>
          {pedidosMock.map((pedido) => (
            <div key={pedido.id} style={styles.tableRow}>
              <div style={styles.tableCell}>
                <div style={styles.pedidoId}>{pedido.id}</div>
                <div style={styles.pedidoCliente}>{pedido.cliente}</div>
              </div>
              <div style={{...styles.tableCell, flex: 2}}>
                <div style={styles.pedidoProducto}>{pedido.producto}</div>
              </div>
              <div style={styles.tableCell}>
                <div style={styles.estadoBadge}>{pedido.estado}</div>
              </div>
              <div style={styles.tableCell}>
                <div style={styles.progressBar}>
                  <div style={{...styles.progressFill, width: `${pedido.progreso}%`}}></div>
                </div>
                <div style={styles.progressText}>{pedido.progreso}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Placeholder Views
function PedidoView() {
  return (
    <div style={styles.content}>
      <h2 style={styles.pageTitle}>📋 Pedido Actual</h2>
      <div style={styles.placeholderCard}>
        <div style={styles.placeholderIcon}>📋</div>
        <h3 style={styles.placeholderTitle}>Vista de Pedido Actual</h3>
        <p style={styles.placeholderText}>
          Aquí se mostrará el detalle completo del pedido en proceso,
          incluyendo especificaciones, tiempo estimado y progreso en tiempo real.
        </p>
      </div>
    </div>
  );
}

function MonitoreoView() {
  return (
    <div style={styles.content}>
      <h2 style={styles.pageTitle}>📡 Monitoreo de Máquinas</h2>
      <div style={styles.placeholderCard}>
        <div style={styles.placeholderIcon}>📡</div>
        <h3 style={styles.placeholderTitle}>Sistema de Monitoreo</h3>
        <p style={styles.placeholderText}>
          Monitoreo en tiempo real de todas las máquinas CNC,
          incluyendo temperatura, velocidad, estado y alertas.
        </p>
      </div>
    </div>
  );
}

function CalidadView() {
  return (
    <div style={styles.content}>
      <h2 style={styles.pageTitle}>✓ Control de Calidad</h2>
      <div style={styles.placeholderCard}>
        <div style={styles.placeholderIcon}>✓</div>
        <h3 style={styles.placeholderTitle}>Control de Calidad</h3>
        <p style={styles.placeholderText}>
          Registro de inspecciones, mediciones y certificaciones de calidad
          para cada producto fabricado.
        </p>
      </div>
    </div>
  );
}

function InventarioView() {
  return (
    <div style={styles.content}>
      <h2 style={styles.pageTitle}>📦 Gestión de Inventario</h2>
      <div style={styles.placeholderCard}>
        <div style={styles.placeholderIcon}>📦</div>
        <h3 style={styles.placeholderTitle}>Inventario de Materiales</h3>
        <p style={styles.placeholderText}>
          Control de stock de materias primas, herramientas y productos terminados.
          Alertas de reabastecimiento automático.
        </p>
      </div>
    </div>
  );
}

function FacturacionView() {
  return (
    <div style={styles.content}>
      <h2 style={styles.pageTitle}>💰 Facturación y Reportes</h2>
      <div style={styles.placeholderCard}>
        <div style={styles.placeholderIcon}>💰</div>
        <h3 style={styles.placeholderTitle}>Sistema de Facturación</h3>
        <p style={styles.placeholderText}>
          Generación de facturas, reportes financieros y análisis de rentabilidad
          por proyecto y cliente.
        </p>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'pedido':
        return <PedidoView />;
      case 'nel':
        return (
          <div style={styles.content}>
            <NELInterface />
          </div>
        );
      case 'monitoreo':
        return <MonitoreoView />;
      case 'calidad':
        return <CalidadView />;
      case 'inventario':
        return <InventarioView />;
      case 'facturacion':
        return <FacturacionView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.main}>
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main style={styles.mainContent}>
          {renderView()}
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    display: 'flex',
    flex: 1
  },
  mainContent: {
    flex: 1,
    overflowY: 'auto'
  },
  content: {
    padding: '32px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    height: '100%'
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '24px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '32px'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  statIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statContent: {
    flex: 1
  },
  statLabel: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '4px'
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '20px'
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  tableRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    transition: 'background-color 0.2s'
  },
  tableCell: {
    flex: 1,
    minWidth: 0
  },
  pedidoId: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#111827'
  },
  pedidoCliente: {
    fontSize: '12px',
    color: '#6b7280'
  },
  pedidoProducto: {
    fontSize: '14px',
    color: '#374151'
  },
  estadoBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '4px'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9333ea',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '12px',
    color: '#6b7280',
    textAlign: 'right'
  },
  placeholderCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '60px 40px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  placeholderIcon: {
    fontSize: '64px',
    marginBottom: '20px'
  },
  placeholderTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '12px'
  },
  placeholderText: {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: '1.6',
    maxWidth: '600px',
    margin: '0 auto'
  }
};
