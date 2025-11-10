import React, { useState, useRef, useEffect } from 'react';

export default function NELInterface() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy NEL, tu Asistente de Inteligencia Artificial para MOBINEL. Puedo ayudarte con:\n\n• Optimizar procesos CNC\n• Resolver problemas técnicos\n• Sugerir mejoras de calidad\n• Gestionar inventarios\n• Analizar datos de producción\n\n¿En qué puedo ayudarte hoy?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://mobinel-backend.onrender.com';

      const response = await fetch(`${API_URL}/api/nel/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          history: newMessages
        })
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      // Add assistant response
      setMessages([...newMessages, {
        role: 'assistant',
        content: data.response || 'Lo siento, no pude procesar tu solicitud.'
      }]);

    } catch (error) {
      console.error('Error calling NEL API:', error);
      setMessages([...newMessages, {
        role: 'assistant',
        content: '⚠️ Lo siento, hubo un error al conectar con el servidor. Por favor intenta nuevamente.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerIcon}>🤖</div>
          <div>
            <div style={styles.headerTitle}>Asistente NEL</div>
            <div style={styles.headerSubtitle}>Neural Expert Liaison</div>
          </div>
        </div>
        <div style={styles.statusBadge}>
          <div style={styles.statusDot}></div>
          <span>En línea</span>
        </div>
      </div>

      <div style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.messageWrapper,
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div
              style={{
                ...styles.messageBubble,
                ...(message.role === 'user' ? styles.userBubble : styles.assistantBubble)
              }}
            >
              <div style={styles.messageContent}>
                {message.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < message.content.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{...styles.messageWrapper, justifyContent: 'flex-start'}}>
            <div style={{...styles.messageBubble, ...styles.assistantBubble}}>
              <div style={styles.typingIndicator}>
                <span style={styles.typingDot}>●</span>
                <span style={{...styles.typingDot, animationDelay: '0.2s'}}>●</span>
                <span style={{...styles.typingDot, animationDelay: '0.4s'}}>●</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputContainer}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu pregunta aquí..."
          style={styles.input}
          rows={1}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            ...styles.sendButton,
            opacity: (loading || !input.trim()) ? 0.5 : 1
          }}
        >
          {loading ? '⏳' : '📤'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  header: {
    backgroundColor: '#ffffff',
    padding: '16px 20px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  headerIcon: {
    fontSize: '32px'
  },
  headerTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#111827'
  },
  headerSubtitle: {
    fontSize: '12px',
    color: '#6b7280'
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: '#d1fae5',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#065f46',
    fontWeight: '600'
  },
  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  },
  messagesContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  messageWrapper: {
    display: 'flex',
    width: '100%',
    animation: 'fadeIn 0.3s ease-in'
  },
  messageBubble: {
    maxWidth: '75%',
    padding: '12px 16px',
    borderRadius: '16px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  },
  userBubble: {
    backgroundColor: '#9333ea',
    color: 'white',
    borderBottomRightRadius: '4px'
  },
  assistantBubble: {
    backgroundColor: '#ffffff',
    color: '#111827',
    border: '1px solid #e5e7eb',
    borderBottomLeftRadius: '4px'
  },
  messageContent: {
    fontSize: '14px',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: '4px 0'
  },
  typingDot: {
    fontSize: '20px',
    color: '#9333ea',
    animation: 'typing 1.4s infinite'
  },
  inputContainer: {
    padding: '16px 20px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end'
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'none',
    outline: 'none',
    transition: 'border-color 0.2s',
    minHeight: '44px',
    maxHeight: '120px'
  },
  sendButton: {
    backgroundColor: '#9333ea',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    width: '44px',
    height: '44px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  }
};
