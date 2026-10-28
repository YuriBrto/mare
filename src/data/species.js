/**
 * Catálogo de espécies do litoral baiano usado na página "Vida marinha".
 * depth = faixa de profundidade típica em metros [mínima, máxima].
 */
export const SPECIES_GROUPS = [
  { value: 'todos', label: 'Todos os grupos' },
  { value: 'peixe', label: 'Peixes' },
  { value: 'reptil', label: 'Répteis' },
  { value: 'mamifero', label: 'Mamíferos' },
  { value: 'coral', label: 'Corais' },
  { value: 'invertebrado', label: 'Invertebrados' },
];

export const MAX_DEPTH = 60;

export const SPECIES = [
  { id: 1, name: 'Tartaruga-de-pente', scientific: 'Eretmochelys imbricata', group: 'reptil', depth: [0, 20], status: 'Criticamente em perigo' },
  { id: 2, name: 'Tartaruga-verde', scientific: 'Chelonia mydas', group: 'reptil', depth: [0, 25], status: 'Vulnerável' },
  { id: 3, name: 'Tartaruga-cabeçuda', scientific: 'Caretta caretta', group: 'reptil', depth: [0, 50], status: 'Em perigo' },
  { id: 4, name: 'Baleia-jubarte', scientific: 'Megaptera novaeangliae', group: 'mamifero', depth: [0, 60], status: 'Pouco preocupante' },
  { id: 5, name: 'Golfinho-rotador', scientific: 'Stenella longirostris', group: 'mamifero', depth: [5, 60], status: 'Pouco preocupante' },
  { id: 6, name: 'Peixe-boi-marinho', scientific: 'Trichechus manatus', group: 'mamifero', depth: [1, 5], status: 'Em perigo' },
  { id: 7, name: 'Coral-cérebro', scientific: 'Mussismilia braziliensis', group: 'coral', depth: [1, 15], status: 'Vulnerável' },
  { id: 8, name: 'Coral-de-fogo', scientific: 'Millepora alcicornis', group: 'coral', depth: [0, 30], status: 'Pouco preocupante' },
  { id: 9, name: 'Coral-estrela', scientific: 'Siderastrea stellata', group: 'coral', depth: [0, 10], status: 'Pouco preocupante' },
  { id: 10, name: 'Peixe-papagaio-azul', scientific: 'Scarus trispinosus', group: 'peixe', depth: [2, 40], status: 'Em perigo' },
  { id: 11, name: 'Mero', scientific: 'Epinephelus itajara', group: 'peixe', depth: [1, 46], status: 'Vulnerável' },
  { id: 12, name: 'Sargentinho', scientific: 'Abudefduf saxatilis', group: 'peixe', depth: [0, 15], status: 'Pouco preocupante' },
  { id: 13, name: 'Peixe-cirurgião', scientific: 'Acanthurus chirurgus', group: 'peixe', depth: [2, 25], status: 'Pouco preocupante' },
  { id: 14, name: 'Moreia-pintada', scientific: 'Gymnothorax moringa', group: 'peixe', depth: [1, 50], status: 'Pouco preocupante' },
  { id: 15, name: 'Cavalo-marinho', scientific: 'Hippocampus reidi', group: 'peixe', depth: [0, 15], status: 'Quase ameaçado' },
  { id: 16, name: 'Peixe-borboleta', scientific: 'Chaetodon striatus', group: 'peixe', depth: [3, 55], status: 'Pouco preocupante' },
  { id: 17, name: 'Raia-chita', scientific: 'Aetobatus narinari', group: 'peixe', depth: [1, 60], status: 'Em perigo' },
  { id: 18, name: 'Polvo-comum', scientific: 'Octopus insularis', group: 'invertebrado', depth: [0, 40], status: 'Pouco preocupante' },
  { id: 19, name: 'Lagosta-vermelha', scientific: 'Panulirus argus', group: 'invertebrado', depth: [2, 60], status: 'Dados insuficientes' },
  { id: 20, name: 'Ouriço-preto', scientific: 'Echinometra lucunter', group: 'invertebrado', depth: [0, 5], status: 'Pouco preocupante' },
  { id: 21, name: 'Estrela-do-mar', scientific: 'Oreaster reticulatus', group: 'invertebrado', depth: [0, 35], status: 'Vulnerável' },
  { id: 22, name: 'Aratu', scientific: 'Goniopsis cruentata', group: 'invertebrado', depth: [0, 1], status: 'Pouco preocupante' },
  { id: 23, name: 'Água-viva-da-lua', scientific: 'Aurelia aurita', group: 'invertebrado', depth: [0, 30], status: 'Pouco preocupante' },
  { id: 24, name: 'Peixe-frade', scientific: 'Pomacanthus paru', group: 'peixe', depth: [3, 60], status: 'Pouco preocupante' },
];
