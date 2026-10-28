import { useId, useState } from 'react';
import './Accordion.css';

/**
 * Acordeão: lista de seções expansíveis.
 *
 * @param {{ id: string, title: string, content: React.ReactNode }[]} items
 * @param {boolean} allowMultiple - se true, várias seções podem ficar abertas.
 * @param {string|null} defaultOpenId - seção aberta inicialmente.
 * @param {(id: string, isOpen: boolean) => void} onToggle - callback opcional.
 */
export default function Accordion({ items, allowMultiple = false, defaultOpenId = null, onToggle }) {
  const baseId = useId();
  // Guardamos os ids abertos num Set; no modo padrão ele tem no máximo 1 item.
  const [openIds, setOpenIds] = useState(() => new Set(defaultOpenId ? [defaultOpenId] : []));

  const toggle = (id) => {
    setOpenIds((current) => {
      const isOpen = current.has(id);
      const next = allowMultiple ? new Set(current) : new Set();
      if (isOpen) next.delete(id);
      else next.add(id);
      onToggle?.(id, !isOpen);
      return next;
    });
  };

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIds.has(item.id);
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <section key={item.id} className={`accordion__item${isOpen ? ' is-open' : ''}`}>
            <h3 className="accordion__heading">
              <button
                id={buttonId}
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <svg className="accordion__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 12c3 0 3-3 5-3s3 3 5 3 3-3 5-3 3 3 5 3" />
                  <path className="accordion__icon-v" d="M12 4v16" />
                </svg>
              </button>
            </h3>
            {/* O painel fica sempre no DOM para a transição de altura funcionar;
                `inert` impede o foco em conteúdo fechado. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="accordion__panel"
              inert={isOpen ? undefined : ''}
            >
              <div className="accordion__panel-inner">
                <p>{item.content}</p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
