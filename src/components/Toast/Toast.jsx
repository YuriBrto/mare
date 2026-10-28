import { useEffect, useRef, useState } from 'react';
import './Toast.css';

const ICONS = {
  success: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  error: <path d="M7 7l10 10M17 7L7 17" />,
  info: <path d="M12 11v6M12 7.2v.1" />,
};

const TYPE_NAMES = { success: 'Sucesso', error: 'Erro', info: 'Aviso' };

/**
 * Uma notificação toast. Some sozinha após `duration` ms ou ao clicar em fechar.
 * O tempo pausa enquanto o mouse ou o foco estão sobre ela, para dar tempo de ler.
 *
 * @param {'success'|'error'|'info'} type
 * @param {string} title
 * @param {string} message
 * @param {number} duration - em milissegundos.
 * @param {() => void} onClose
 */
export default function Toast({ type = 'info', title, message, duration = 4500, onClose }) {
  const [paused, setPaused] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const remainingRef = useRef(duration);

  // Controla o temporizador. Ao pausar, guarda quanto tempo ainda resta.
  useEffect(() => {
    if (paused || leaving) return undefined;

    const startedAt = Date.now();
    const timer = setTimeout(() => setLeaving(true), remainingRef.current);

    return () => {
      clearTimeout(timer);
      remainingRef.current -= Date.now() - startedAt;
    };
  }, [paused, leaving]);

  // Espera a animação de saída terminar antes de remover do estado global.
  useEffect(() => {
    if (!leaving) return undefined;
    const timer = setTimeout(onClose, 220);
    return () => clearTimeout(timer);
  }, [leaving, onClose]);

  return (
    <div
      className={`toast toast--${type}${leaving ? ' is-leaving' : ''}${paused ? ' is-paused' : ''}`}
      role={type === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ '--duration': `${duration}ms` }}
    >
      <span className="toast__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">{ICONS[type]}</svg>
      </span>
      <div className="toast__body">
        <p className="toast__title">
          <span className="visually-hidden">{TYPE_NAMES[type]}: </span>
          {title}
        </p>
        {message && <p className="toast__message">{message}</p>}
      </div>
      <button type="button" className="toast__close" onClick={() => setLeaving(true)} aria-label="Fechar notificação">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" /></svg>
      </button>
      <span className="toast__timer" aria-hidden="true" />
    </div>
  );
}
