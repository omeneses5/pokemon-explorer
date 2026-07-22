const COLOR_LABELS_ES = {
  black: 'Negro',
  blue: 'Azul',
  brown: 'Marrón',
  gray: 'Gris',
  green: 'Verde',
  pink: 'Rosa',
  purple: 'Púrpura',
  red: 'Rojo',
  white: 'Blanco',
  yellow: 'Amarillo',
};

const SHAPE_LABELS_ES = {
  ball: 'Bola',
  squiggle: 'Serpenteante',
  fish: 'Pez',
  arms: 'Brazos',
  blob: 'Amorfa',
  upright: 'Erguido',
  legs: 'Piernas',
  quadruped: 'Cuadrúpede',
  wings: 'Alas',
  tentacles: 'Tentáculos',
  heads: 'Cabezas',
  humanoid: 'Humanoide',
  'bug-wings': 'Bicho alado',
  armor: 'Armadura',
};

const HABITAT_LABELS_ES = {
  cave: 'Cueva',
  forest: 'Bosque',
  grassland: 'Pradera',
  mountain: 'Montaña',
  rare: 'Raro',
  'rough-terrain': 'Terreno escarpado',
  sea: 'Mar',
  urban: 'Urbano',
  'waters-edge': 'Orilla del agua',
};

const EGG_GROUP_LABELS_ES = {
  monster: 'Monster',
  water1: 'Agua 1',
  bug: 'Bicho',
  flying: 'Volador',
  ground: 'Campo',
  fairy: 'Hada',
  plant: 'Planta',
  humanshape: 'Humanoide',
  water3: 'Agua 3',
  mineral: 'Mineral',
  indeterminate: 'Indeterminado',
  water2: 'Agua 2',
  ditto: 'Ditto',
  dragon: 'Dragón',
  'no-eggs': 'Sin huevos',
};

const GENERATION_LABELS_ES = {
  'generation-i': 'I',
  'generation-ii': 'II',
  'generation-iii': 'III',
  'generation-iv': 'IV',
  'generation-v': 'V',
  'generation-vi': 'VI',
  'generation-vii': 'VII',
  'generation-viii': 'VIII',
  'generation-ix': 'IX',
};

export const getColorLabel = (color) => (color ? COLOR_LABELS_ES[color] ?? color : 'Desconocido');
export const getShapeLabel = (shape) => (shape ? SHAPE_LABELS_ES[shape] ?? shape : 'Desconocido');
export const getHabitatLabel = (habitat) => (habitat ? HABITAT_LABELS_ES[habitat] ?? habitat : 'Desconocido');
export const getEggGroupLabel = (group) => EGG_GROUP_LABELS_ES[group] ?? group;
export const getGenerationLabel = (gen) => (gen ? GENERATION_LABELS_ES[gen] ?? gen : 'Desconocida');
