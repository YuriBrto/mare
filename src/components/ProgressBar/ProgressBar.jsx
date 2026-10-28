import './ProgressBar.css';

const clamp = (value) => Math.min(100, Math.max(0, Number(value) || 0));

/**
 * Barra de progresso. A largura do preenchimento segue a prop `value` (0–100).
 *
 * @param {number} value - progresso de 0 a 100.
 * @param {string} label - texto que descreve a tarefa (lido por leitores de tela).
 * @param {boolean} showValue - exibe o percentual ao lado do rótulo.
 * @param {'sea'|'sun'|'error'} tone - cor do preenchimento.
 * @param {string} valueText - texto alternativo ao percentual (ex.: "1,84 m").
 */
export default function ProgressBar({ value, label, showValue = true, tone = 'sea', valueText, hint }) {
  const percent = clamp(value);
  const rounded = Math.round(percent);

  return (
    <div className={`progress progress--${tone}`}>
      <div className="progress__header">
        <span className="progress__label">{label}</span>
        {showValue && <span className="progress__value">{valueText ?? `${rounded}%`}</span>}
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={rounded}
        aria-valuetext={valueText ?? `${rounded}%`}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
      {hint && <p className="progress__hint">{hint}</p>}
    </div>
  );
}
