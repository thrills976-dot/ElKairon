import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';

// Suppress benign Vite HMR websocket disconnect noise in sandboxed dev container
if (typeof window !== 'undefined') {
  const isWsNoise = (err: any) => {
    const reasonStr = String(err?.message || err?.reason || err || '');
    return (
      reasonStr.includes('WebSocket') ||
      reasonStr.includes('websocket') ||
      reasonStr.includes('[vite]') ||
      reasonStr.includes('ws://') ||
      reasonStr.includes('wss://')
    );
  };

  window.addEventListener('unhandledrejection', (event) => {
    if (isWsNoise(event?.reason)) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  });

  window.addEventListener('error', (event) => {
    if (isWsNoise(event?.message) || isWsNoise(event?.error)) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
