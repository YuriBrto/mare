import { useToast } from '../../context/ToastContext';
import Toast from './Toast';

/**
 * Área fixa da tela onde os toasts aparecem.
 * Lê a fila do contexto global, então não precisa de props.
 */
export default function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  return (
    <section className="toast-viewport" aria-label="Notificações">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => dismissToast(toast.id)} />
      ))}
    </section>
  );
}
