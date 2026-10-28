import { useEffect } from 'react';

/**
 * Executa `handler` quando o usuário clica/toca fora do elemento referenciado.
 * Usado pelo Menu Suspenso para fechar ao clicar fora.
 */
export function useClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const listener = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    document.addEventListener('pointerdown', listener);
    return () => document.removeEventListener('pointerdown', listener);
  }, [ref, handler, enabled]);
}
