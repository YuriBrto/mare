import { NavLink, Link } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown';
import { useStation } from '../../context/StationContext';
import { useToast } from '../../context/ToastContext';
import { STATIONS } from '../../data/stations';
import './Header.css';

const NAV_LINKS = [
  { to: '/', label: 'Maré', end: true },
  { to: '/vida-marinha', label: 'Vida marinha' },
  { to: '/boias', label: 'Boias' },
  { to: '/ajuda', label: 'Ajuda' },
];

// Opções do menu suspenso no formato que o componente Dropdown espera.
const STATION_OPTIONS = STATIONS.map((station) => ({
  value: station.id,
  label: station.name,
  hint: station.bestFor,
}));

export default function Header() {
  const { station, setStationId } = useStation();
  const { showToast } = useToast();

  const handleStationChange = (id, option) => {
    if (id === station.id) return;
    setStationId(id);
    showToast({
      type: 'info',
      title: `Estação trocada para ${option.label}`,
      message: 'Maré, abas e boias agora mostram dados desta praia.',
    });
  };

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Maré, página inicial">
        <svg className="brand__mark" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="27" cy="13" r="6" />
          <path d="M2 26c4.5 0 4.5-4 9-4s4.5 4 9 4 4.5-4 9-4 4.5 4 9 4" />
          <path d="M2 34c4.5 0 4.5-4 9-4s4.5 4 9 4 4.5-4 9-4 4.5 4 9 4" />
        </svg>
        <span className="brand__name">maré</span>
      </Link>

      <nav className="site-nav" aria-label="Principal">
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className="site-nav__link">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="site-header__station">
        <Dropdown
          label="Estação"
          hideLabel
          options={STATION_OPTIONS}
          value={station.id}
          onChange={handleStationChange}
          align="end"
        />
      </div>
    </header>
  );
}
