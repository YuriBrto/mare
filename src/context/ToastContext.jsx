import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Contexto global de notificações (Toast).
 *
 * Qualquer componente, em qualquer página, pode chamar `showToast` sem
 * precisar receber props de um componente pai. A fila de toasts vive aqui
 * e é renderizada pelo <ToastViewport />, montado uma única vez no Layout.
 */
const ToastContext = createContext(null);

let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  /**
   * @param {{ type?: 'success'|'error'|'info', title: string, message?: string, duration?: number }} toast
   */
  const showToast = useCallback(({ type = 'info', title, message = '', duration = 4500 }) => {
    const id = nextId++;
    // Mantemos no máximo 4 toasts visíveis para não cobrir a tela.
    setToasts((current) => [...current.slice(-3), { id, type, title, message, duration }]);
    return id;
  }, []);

  // useMemo evita recriar o objeto a cada render e re-renderizar os consumidores à toa.
  const value = useMemo(() => ({ toasts, showToast, dismissToast }), [toasts, showToast, dismissToast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

/** Hook de acesso ao contexto de toasts. */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast precisa ser usado dentro de <ToastProvider>.');
  }
  return context;
}
