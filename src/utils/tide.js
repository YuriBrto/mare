/**
 * Modelo simplificado de maré semidiurna (componente lunar M2).
 *
 * A maré real é a soma de dezenas de componentes harmônicos; aqui usamos
 * apenas o principal, que tem período de ~12h25min. É o suficiente para
 * uma demonstração visual coerente, mas NÃO serve para navegação.
 */

/** Período da componente M2 em milissegundos (12,42 horas). */
export const M2_PERIOD_MS = 12.42 * 60 * 60 * 1000;

/** Preamar de referência (UTC) usada como origem da fase. */
const REFERENCE_HIGH_TIDE = Date.UTC(2026, 0, 1, 5, 12);

/**
 * Calcula a fase (0 a 1) de uma estação em determinado instante.
 * Fase 0 = preamar (maré cheia); fase 0,5 = baixa-mar.
 */
function phaseAt(time, station) {
  const origin = REFERENCE_HIGH_TIDE + station.offsetMinutes * 60 * 1000;
  const cycles = (time - origin) / M2_PERIOD_MS;
  return cycles - Math.floor(cycles);
}

/** Altura da maré em metros num instante. */
export function heightAt(time, station) {
  const phase = phaseAt(time, station);
  return station.meanLevel + station.amplitude * Math.cos(2 * Math.PI * phase);
}

/**
 * Retorna o estado completo da maré para uma estação.
 * @param {number} time - timestamp em ms
 * @param {object} station - estação (ver data/stations.js)
 */
export function getTideState(time, station) {
  const phase = phaseAt(time, station);
  const height = heightAt(time, station);
  const low = station.meanLevel - station.amplitude;
  const high = station.meanLevel + station.amplitude;

  // Na segunda metade do ciclo a maré está subindo (enchente).
  const rising = phase >= 0.5;
  const msUntilHigh = (1 - phase) * M2_PERIOD_MS;
  const msUntilLow = ((1.5 - phase) % 1) * M2_PERIOD_MS;

  return {
    height,
    low,
    high,
    rising,
    /** Nível relativo entre a baixa-mar e a preamar, de 0 a 100. */
    levelPercent: ((height - low) / (high - low)) * 100,
    nextHighAt: new Date(time + msUntilHigh),
    nextLowAt: new Date(time + msUntilLow),
  };
}

/**
 * Lista os próximos extremos (preamares e baixa-mares) a partir de um instante.
 */
export function getUpcomingExtremes(time, station, count = 4) {
  const { nextHighAt, nextLowAt } = getTideState(time, station);
  const half = M2_PERIOD_MS / 2;
  const extremes = [];
  let high = nextHighAt.getTime();
  let low = nextLowAt.getTime();

  while (extremes.length < count) {
    if (high < low) {
      extremes.push({ type: 'high', at: new Date(high), height: heightAt(high, station) });
      high += half * 2;
    } else {
      extremes.push({ type: 'low', at: new Date(low), height: heightAt(low, station) });
      low += half * 2;
    }
  }
  return extremes;
}

const timeFormatter = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });
const metersFormatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** "14:32" → "14h32", formato comum na Bahia. */
export const formatTime = (date) => timeFormatter.format(date).replace(':', 'h');
export const formatMeters = (value) => `${metersFormatter.format(value)} m`;
