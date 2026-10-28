import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_STATION_ID, findStation } from '../data/stations';

/**
 * Contexto global da estação selecionada.
 *
 * O menu suspenso no cabeçalho escolhe a estação, e o herói da página
 * Início, as abas e a página de boias reagem a ela — componentes que não
 * têm relação direta de pai e filho, o caso típico de estado global.
 */
const StationContext = createContext(null);

const STORAGE_KEY = 'mare:station';

function readStoredStation() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_STATION_ID;
  } catch {
    return DEFAULT_STATION_ID; // navegação privada ou storage bloqueado
  }
}

export function StationProvider({ children }) {
  const [stationId, setStationId] = useState(readStoredStation);

  // Persiste a escolha para que a estação continue a mesma ao recarregar.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, stationId);
    } catch {
      /* sem persistência, sem problema */
    }
  }, [stationId]);

  const value = useMemo(
    () => ({ station: findStation(stationId), setStationId }),
    [stationId],
  );

  return <StationContext.Provider value={value}>{children}</StationContext.Provider>;
}

export function useStation() {
  const context = useContext(StationContext);
  if (!context) {
    throw new Error('useStation precisa ser usado dentro de <StationProvider>.');
  }
  return context;
}
