import { MAX_DEPTH } from '../../data/species';
import './SpeciesRow.css';

const GROUP_NAMES = {
  peixe: 'Peixe',
  reptil: 'Réptil',
  mamifero: 'Mamífero',
  coral: 'Coral',
  invertebrado: 'Invertebrado',
};

// Status que pedem atenção recebem destaque visual.
const THREATENED = ['Criticamente em perigo', 'Em perigo', 'Vulnerável'];

/**
 * Linha do catálogo de espécies. A faixa à direita mostra em que
 * profundidade a espécie costuma viver, numa régua de 0 a 60 m.
 *
 * @param {object} species - item de data/species.js
 * @param {(species: object) => void} onLogSighting - callback do botão.
 */
export default function SpeciesRow({ species, onLogSighting }) {
  const [minDepth, maxDepth] = species.depth;
  const top = (minDepth / MAX_DEPTH) * 100;
  const height = Math.max(4, ((maxDepth - minDepth) / MAX_DEPTH) * 100);
  const threatened = THREATENED.includes(species.status);

  return (
    <li className="species">
      <div className="species__info">
        <h3 className="species__name">{species.name}</h3>
        <p className="species__scientific">{species.scientific}</p>
        <p className="species__meta">
          <span>{GROUP_NAMES[species.group]}</span>
          <span className={threatened ? 'species__status is-threatened' : 'species__status'}>
            {species.status}
          </span>
        </p>
      </div>

      <div className="species__depth">
        <div
          className="species__gauge"
          role="img"
          aria-label={`Vive entre ${minDepth} e ${maxDepth} metros de profundidade`}
        >
          <span className="species__range" style={{ top: `${top}%`, height: `${height}%` }} />
        </div>
        <span className="species__depth-text" aria-hidden="true">
          {minDepth}–{maxDepth} m
        </span>
      </div>

      <button type="button" className="button button--ghost species__action" onClick={() => onLogSighting(species)}>
        Registrar avistamento
      </button>
    </li>
  );
}
