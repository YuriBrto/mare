/**
 * Estações de observação (fictícias) no litoral de Salvador.
 * offsetMinutes desloca a fase da maré em relação à referência,
 * imitando o pequeno atraso da onda de maré ao longo da costa.
 */
export const STATIONS = [
  {
    id: 'porto-da-barra',
    name: 'Porto da Barra',
    offsetMinutes: 0,
    meanLevel: 1.32,
    amplitude: 1.08,
    waterTemp: 27,
    description:
      'Enseada abrigada na entrada da Baía de Todos-os-Santos. Água calma, boa para observar cardumes na maré cheia.',
    bestFor: 'Nado e mergulho livre',
  },
  {
    id: 'farol-da-barra',
    name: 'Farol da Barra',
    offsetMinutes: 6,
    meanLevel: 1.3,
    amplitude: 1.12,
    waterTemp: 26,
    description:
      'Ponta exposta ao mar aberto. Na baixa-mar surgem piscinas naturais entre as pedras ao pé do farol.',
    bestFor: 'Piscinas naturais na vazante',
  },
  {
    id: 'ribeira',
    name: 'Ribeira',
    offsetMinutes: 22,
    meanLevel: 1.36,
    amplitude: 1.18,
    waterTemp: 28,
    description:
      'Fundo da baía, águas rasas e mornas. A amplitude da maré é maior aqui do que na costa atlântica.',
    bestFor: 'Remo e passeio de saveiro',
  },
  {
    id: 'itapua',
    name: 'Itapuã',
    offsetMinutes: -9,
    meanLevel: 1.28,
    amplitude: 1.02,
    waterTemp: 26,
    description:
      'Orla atlântica com recifes de arenito. Na vazante os recifes formam lagoas cheias de vida marinha.',
    bestFor: 'Observação de recifes',
  },
  {
    id: 'stella-maris',
    name: 'Stella Maris',
    offsetMinutes: -12,
    meanLevel: 1.27,
    amplitude: 1.0,
    waterTemp: 25,
    description: 'Praia aberta e de ondas constantes, preferida pelo surfe. Correntes fortes na enchente.',
    bestFor: 'Surfe',
  },
];

export const DEFAULT_STATION_ID = STATIONS[0].id;

export const findStation = (id) => STATIONS.find((station) => station.id === id) ?? STATIONS[0];
