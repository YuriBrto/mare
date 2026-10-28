import { useId } from 'react';
import { formatMeters, formatTime } from '../../utils/tide';
import './TideHero.css';

// Geometria do SVG (unidades do viewBox).
const WIDTH = 1000;
const BASELINE = 236;
const LETTER_TOP = 18; // topo aproximado das letras altas (h, d)
const WAVE_LENGTH = 125;

/** Gera uma onda senoidal com o dobro da largura, para animar em loop contínuo. */
function buildWavePath(amplitude, phase = 0) {
  const points = [];
  for (let x = 0; x <= WIDTH * 2; x += 10) {
    const y = amplitude * Math.sin(((x / WAVE_LENGTH) * 2 + phase) * Math.PI);
    points.push(`${x},${y.toFixed(2)}`);
  }
  return `M0,400 L${points.join(' L')} L${WIDTH * 2},400 Z`;
}

const FRONT_WAVE = buildWavePath(9);
const BACK_WAVE = buildWavePath(12, 0.6);

/**
 * Herói da página inicial: a palavra que descreve a maré ("enchendo" ou
 * "vazando") é preenchida com água até o nível atual da maré.
 *
 * @param {object} station - estação selecionada (vinda do contexto global).
 * @param {object} tide - estado calculado por useTide().
 */
export default function TideHero({ station, tide }) {
  // useId gera ":r0:"; os dois-pontos quebram url(#...), então removemos.
  const clipId = `tide-clip-${useId().replace(/:/g, '')}`;
  const word = tide.rising ? 'enchendo' : 'vazando';

  // Converte o percentual (0–100) na altura da linha d'água dentro das letras.
  const waterY = BASELINE - (tide.levelPercent / 100) * (BASELINE - LETTER_TOP);

  const nextExtreme = tide.rising
    ? `sobe até ${formatMeters(tide.high)} às ${formatTime(tide.nextHighAt)}`
    : `desce até ${formatMeters(tide.low)} às ${formatTime(tide.nextLowAt)}`;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="hero__where">
        Maré agora em <strong>{station.name}</strong>
      </p>

      <h1 id="hero-title" className="hero__title">
        <span className="visually-hidden">A maré está {word}</span>
        <svg
          className="hero__word"
          viewBox={`0 0 ${WIDTH} 260`}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <clipPath id={clipId}>
              <text x="0" y={BASELINE} textLength={WIDTH} lengthAdjust="spacingAndGlyphs" className="hero__glyphs">
                {word}
              </text>
            </clipPath>
          </defs>

          {/* Contorno das letras: mostra a parte "seca" da palavra. */}
          <text
            x="0"
            y={BASELINE}
            textLength={WIDTH}
            lengthAdjust="spacingAndGlyphs"
            className="hero__glyphs hero__glyphs--outline"
          >
            {word}
          </text>

          {/* Água recortada no formato das letras. */}
          <g clipPath={`url(#${clipId})`}>
            <g className="hero__water" style={{ transform: `translateY(${waterY}px)` }}>
              <g className="hero__wave hero__wave--back">
                <path d={BACK_WAVE} />
              </g>
              <g className="hero__wave hero__wave--front">
                <path d={FRONT_WAVE} />
              </g>
            </g>
          </g>
        </svg>
      </h1>

      <p className="hero__sentence">
        A água está a <strong>{formatMeters(tide.height)}</strong> e {nextExtreme}.
      </p>

      <dl className="hero__facts">
        <div>
          <dt>Nível no ciclo</dt>
          <dd>{Math.round(tide.levelPercent)}%</dd>
        </div>
        <div>
          <dt>{tide.rising ? 'Depois, baixa-mar às' : 'Depois, preamar às'}</dt>
          <dd>{formatTime(tide.rising ? tide.nextLowAt : tide.nextHighAt)}</dd>
        </div>
        <div>
          <dt>Água</dt>
          <dd>{station.waterTemp} °C</dd>
        </div>
      </dl>
    </section>
  );
}
