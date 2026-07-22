const BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export const getOfficialArtwork = (id) => `${BASE}/other/official-artwork/${id}.png`;
export const getBasicSprite = (id) => `${BASE}/${id}.png`;
