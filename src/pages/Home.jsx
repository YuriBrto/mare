import TideHero from '../components/TideHero/TideHero';
import Tabs from '../components/Tabs/Tabs';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { useStation } from '../context/StationContext';
import { useTide } from '../hooks/useTide';
import { formatMeters, formatTime, getUpcomingExtremes } from '../utils/tide';

/** Converte milissegundos em "2h15min". */
function formatDuration(ms) {
  const totalMinutes = Math.max(0, Math.round(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h${String(minutes).padStart(2, '0')}min` : `${minutes}min`;
}

export default function Home() {
  const { station } = useStation();
  const tide = useTide(station);

  // Enchente: progresso até a preamar. Vazante: progresso até a baixa-mar.
  const phaseProgress = tide.rising ? tide.levelPercent : 100 - tide.levelPercent;
  const target = tide.rising ? tide.nextHighAt : tide.nextLowAt;

  const tabs = [
    {
      id: 'agora',
      label: 'Agora',
      content: (
        <div className="stack">
          <ProgressBar
            label={tide.rising ? 'Enchente até a preamar' : 'Vazante até a baixa-mar'}
            value={phaseProgress}
            tone={tide.rising ? 'sea' : 'sun'}
            hint={`Faltam ${formatDuration(target - tide.now)} para ${tide.rising ? 'a maré cheia' : 'a maré seca'}, às ${formatTime(target)}.`}
          />
          <ProgressBar
            label="Altura da água entre a mínima e a máxima do dia"
            value={tide.levelPercent}
            valueText={formatMeters(tide.height)}
            hint={`Varia de ${formatMeters(tide.low)} a ${formatMeters(tide.high)} em ${station.name}.`}
          />
        </div>
      ),
    },
    {
      id: 'proximas',
      label: 'Próximas marés',
      content: (
        <table className="tide-table">
          <caption className="visually-hidden">Próximas preamares e baixa-mares em {station.name}</caption>
          <thead>
            <tr>
              <th scope="col">Horário</th>
              <th scope="col">Maré</th>
              <th scope="col">Altura</th>
            </tr>
          </thead>
          <tbody>
            {getUpcomingExtremes(tide.now, station).map((extreme) => (
              <tr key={extreme.at.getTime()} className={`tide-table__row--${extreme.type}`}>
                <td>{formatTime(extreme.at)}</td>
                <td>
                  <span className="tide-table__dot" aria-hidden="true" />
                  {extreme.type === 'high' ? 'Preamar' : 'Baixa-mar'}
                </td>
                <td>{formatMeters(extreme.height)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      id: 'praia',
      label: 'Sobre a praia',
      content: (
        <div className="about-beach">
          <p>{station.description}</p>
          <p>
            Melhor para: <strong>{station.bestFor}</strong>
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <TideHero station={station} tide={tide} />

      <section className="panel" aria-labelledby="detalhes-titulo">
        <h2 id="detalhes-titulo" className="section-title">
          Detalhes de {station.name}
        </h2>
        {/* key força as abas a voltarem para "Agora" ao trocar de estação. */}
        <Tabs key={station.id} tabs={tabs} label={`Detalhes da maré em ${station.name}`} />
      </section>
    </>
  );
}
