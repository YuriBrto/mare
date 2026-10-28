import { useEffect, useMemo, useState } from 'react';
import { getTideState } from '../utils/tide';

const REFRESH_MS = 30_000;

/**
 * Retorna o estado da maré da estação e o recalcula a cada 30 segundos.
 * Demonstra useState + useEffect com limpeza do intervalo.
 */
export function useTide(station) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), REFRESH_MS);
    return () => clearInterval(timer);
  }, []);

  const tide = useMemo(() => getTideState(now, station), [now, station]);
  return { ...tide, now };
}
