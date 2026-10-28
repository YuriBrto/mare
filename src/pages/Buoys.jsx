import { useEffect, useRef, useState } from 'react';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { useStation } from '../context/StationContext';
import { useToast } from '../context/ToastContext';

const TICK_MS = 280;
const FAILURE_CHANCE = 0.35;

const STATUS_TEXT = {
  idle: 'Aguardando',
  syncing: 'Recebendo leituras',
  done: 'Sincronizada',
  error: 'Conexão perdida',
};

/** Cria as quatro boias da estação, todas paradas. */
function createBuoys(station) {
  return ['Norte', 'Sul', 'Leste', 'Oeste'].map((side) => ({
    id: `${station.id}-${side}`,
    name: `Boia ${side}`,
    progress: 0,
    status: 'idle',
    failAt: null, // percentual em que a conexão vai cair (simulação)
  }));
}

/** Decide, para a simulação, se e quando a boia vai falhar. */
const pickFailurePoint = () => (Math.random() < FAILURE_CHANCE ? 30 + Math.random() * 50 : null);

export default function Buoys() {
  const { station } = useStation();
  const { showToast } = useToast();
  const [buoys, setBuoys] = useState(() => createBuoys(station));
  const wasSyncing = useRef(false);

  const isSyncing = buoys.some((buoy) => buoy.status === 'syncing');
  const overall = buoys.reduce((sum, buoy) => sum + buoy.progress, 0) / buoys.length;

  // Trocar de estação reinicia as boias.
  useEffect(() => {
    setBuoys(createBuoys(station));
  }, [station]);

  // Enquanto houver boia sincronizando, avança o progresso em intervalos.
  useEffect(() => {
    if (!isSyncing) return undefined;

    const timer = setInterval(() => {
      setBuoys((current) =>
        current.map((buoy) => {
          if (buoy.status !== 'syncing') return buoy;
          const progress = Math.min(100, buoy.progress + 2 + Math.random() * 7);
          if (buoy.failAt !== null && progress >= buoy.failAt) {
            return { ...buoy, progress: buoy.failAt, status: 'error' };
          }
          return { ...buoy, progress, status: progress >= 100 ? 'done' : 'syncing' };
        }),
      );
    }, TICK_MS);

    return () => clearInterval(timer);
  }, [isSyncing]);

  // Quando a sincronização termina, mostra um resumo no toast.
  useEffect(() => {
    if (isSyncing) {
      wasSyncing.current = true;
      return;
    }
    if (!wasSyncing.current) return;
    wasSyncing.current = false;

    const failed = buoys.filter((buoy) => buoy.status === 'error');
    if (failed.length === 0) {
      showToast({ type: 'success', title: 'Boias sincronizadas', message: `Todas as leituras de ${station.name} chegaram.` });
    } else {
      showToast({
        type: 'error',
        title: `${failed.length === 1 ? 'Uma boia não respondeu' : `${failed.length} boias não responderam`}`,
        message: `${failed.map((buoy) => buoy.name).join(', ')}: use "Tentar de novo" para retomar.`,
        duration: 6500,
      });
    }
  }, [isSyncing, buoys, showToast, station.name]);

  const startAll = () => {
    setBuoys((current) =>
      current.map((buoy) => ({ ...buoy, progress: 0, status: 'syncing', failAt: pickFailurePoint() })),
    );
  };

  const retry = (id) => {
    setBuoys((current) =>
      current.map((buoy) => (buoy.id === id ? { ...buoy, status: 'syncing', failAt: null } : buoy)),
    );
  };

  const cancel = () => {
    setBuoys((current) => current.map((buoy) => (buoy.status === 'syncing' ? { ...buoy, status: 'idle' } : buoy)));
    wasSyncing.current = false;
    showToast({ type: 'info', title: 'Sincronização cancelada', message: 'As leituras já recebidas foram mantidas.' });
  };

  return (
    <div className="page">
      <header className="page__intro">
        <h1 className="page__title">Boias de {station.name}</h1>
        <p className="page__lead">
          As boias guardam temperatura e nível da água enquanto estão offline. Sincronize para receber as leituras
          desde a última conexão.
        </p>
      </header>

      <section className="panel buoys" aria-labelledby="total-titulo">
        <h2 id="total-titulo" className="visually-hidden">Progresso geral</h2>
        <ProgressBar label="Progresso geral" value={overall} tone="sun" />

        <div className="buoys__actions">
          <button type="button" className="button" onClick={startAll} disabled={isSyncing}>
            {isSyncing ? 'Sincronizando…' : 'Sincronizar boias'}
          </button>
          {isSyncing && (
            <button type="button" className="button button--ghost" onClick={cancel}>
              Cancelar
            </button>
          )}
        </div>
      </section>

      <ul className="buoys__list">
        {buoys.map((buoy) => (
          <li key={buoy.id} className={`buoy buoy--${buoy.status}`}>
            <ProgressBar
              label={buoy.name}
              value={buoy.progress}
              tone={buoy.status === 'error' ? 'error' : 'sea'}
              hint={STATUS_TEXT[buoy.status]}
            />
            {buoy.status === 'error' && (
              <button type="button" className="button button--ghost buoy__retry" onClick={() => retry(buoy.id)}>
                Tentar de novo
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
