import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import './Dropdown.css';

/**
 * Menu suspenso de seleção única (padrão ARIA "listbox").
 *
 * @param {string} label - rótulo visível do controle.
 * @param {{ value: string, label: string, hint?: string, onSelect?: Function }[]} options
 *        Cada opção pode ter um callback próprio em `onSelect`.
 * @param {string} value - valor selecionado (componente controlado).
 * @param {(value: string, option: object) => void} onChange
 * @param {boolean} hideLabel - esconde o rótulo visualmente, mantendo-o para leitores de tela.
 */
export default function Dropdown({ label, options, value, onChange, hideLabel = false, align = 'start' }) {
  const baseId = useId();
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(rootRef, close, isOpen);

  // Ao abrir, destaca a opção selecionada e move o foco para a lista.
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(selectedIndex);
      listRef.current?.focus();
    }
  }, [isOpen, selectedIndex]);

  const select = (index) => {
    const option = options[index];
    option.onSelect?.(option);
    onChange?.(option.value, option);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleButtonKeyDown = (event) => {
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const handleListKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((index) => Math.min(options.length - 1, index + 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index) => Math.max(0, index - 1));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        select(activeIndex);
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        break;
      default:
    }
  };

  const labelId = `${baseId}-label`;
  const listId = `${baseId}-list`;
  const selected = options[selectedIndex];

  return (
    <div className={`dropdown dropdown--${align}${isOpen ? ' is-open' : ''}`} ref={rootRef}>
      <span id={labelId} className={hideLabel ? 'visually-hidden' : 'dropdown__label'}>
        {label}
      </span>

      <button
        ref={buttonRef}
        type="button"
        className="dropdown__button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${baseId}-value`}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleButtonKeyDown}
      >
        <span id={`${baseId}-value`}>{selected?.label}</span>
        <svg className="dropdown__chevron" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={listId}
          className="dropdown__list"
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={`${baseId}-opt-${activeIndex}`}
          onKeyDown={handleListKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${baseId}-opt-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              className={`dropdown__option${index === activeIndex ? ' is-active' : ''}`}
              onClick={() => select(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="dropdown__option-label">{option.label}</span>
              {option.hint && <span className="dropdown__option-hint">{option.hint}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
