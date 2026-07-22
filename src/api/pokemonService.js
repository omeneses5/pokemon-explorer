import axiosClient from './axiosClient';

export const getPokemonSpeciesList = ({ limit = 20, offset = 0 } = {}) =>
  axiosClient.get(`/pokemon-species?limit=${limit}&offset=${offset}`).then((r) => r.data);

export const getPokemonSpeciesDetail = (nameOrId) =>
  axiosClient.get(`/pokemon-species/${nameOrId}`).then((r) => r.data);

export const getPokemonByType = (type) =>
  axiosClient.get(`/type/${type}`).then((r) => r.data);
