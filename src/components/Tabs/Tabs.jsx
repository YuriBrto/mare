import { useId, useRef, useState } from 'react';
import './Tabs.css';

/**
 * Abas acessíveis (padrão WAI-ARIA "tabs").
 *
 * @param {{ id: string, label: string, content: React.ReactNode }[]} tabs
 * @param {string} defaultTabId - aba ativa inicialmente.
 * @param {(id: string) => void} onChange - callback opcional ao trocar de aba.
 * @param {string} label - nome do conjunto de abas para leitores de tela.
 */
export default function Tabs({ tabs, defaultTabId, onChange, label }) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id);
  const tabRefs = useRef([]);

  const activate = (id) => {
    setActiveId(id);
    onChange?.(id);
  };

  // Setas, Home e End movem o foco entre as abas, como pede o padrão ARIA.
  const handleKeyDown = (event, index) => {
    const last = tabs.length - 1;
    const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: last };
    if (!(event.key in moves)) return;

    event.preventDefault();
    let target = moves[event.key];
    if (target > last) target = 0;
    if (target < 0) target = last;

    tabRefs.current[target]?.focus();
    activate(tabs[target].id);
  };

  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.id === activeId));

  return (
    <div className="tabs">
      <div
        className="tabs__list"
        role="tablist"
        aria-label={label}
        style={{ '--count': tabs.length, '--index': activeIndex }}
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              className="tabs__tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => activate(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
        <span className="tabs__indicator" aria-hidden="true" />
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          className="tabs__panel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== activeId}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
