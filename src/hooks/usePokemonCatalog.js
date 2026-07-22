import { useState, useEffect, useCallback, useRef } from 'react';
import { getPokemonSpeciesList, getPokemonByType } from '../api/pokemonService';
import { DEFAULT_LIMIT, TOTAL_POKEMON } from '../utils/constants';
import { getOfficialArtwork, getBasicSprite } from '../utils/sprites';
import useDebounce from './useDebounce';

const createPokemon = ({ id, name }) => ({
  id,
  name,
  sprite: getOfficialArtwork(id),
  basicSprite: getBasicSprite(id),
});

const normalizeFromList = (item) => {
  const id = item.url?.split('/').filter(Boolean).pop();
  return createPokemon({ id, name: item.name });
};

const unionByType = (pokemonArrays) => {
  const allPokemon = pokemonArrays.flat();
  const seen = new Set();
  return allPokemon.filter((p) => {
    if (seen.has(p.name)) return false;
    seen.add(p.name);
    return true;
  });
};

const fetchByType = async (types, cache) => {
  const pokemonArrays = await Promise.all(
    types.map(async (type) => {
      if (cache.has(type)) return cache.get(type);
      const data = await getPokemonByType(type);
      const normalized = data.pokemon.map((item) => item.pokemon).map(normalizeFromList);
      cache.set(type, normalized);
      return normalized;
    })
  );
  return unionByType(pokemonArrays);
};

const filterBySearch = (searchTerm, allPokemon) =>
  allPokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

const usePokemonCatalog = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState([]);
  const [perPage, setPerPage] = useState(DEFAULT_LIMIT);
  const [allPokemon, setAllPokemon] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const typeCache = useRef(new Map());

  const debouncedSearch = useDebounce(search);
  const hasSearch = !!debouncedSearch;
  const isTypeMode = types.length > 0;
  const isSearchMode = hasSearch && !isTypeMode;
  const isTypeAndSearchMode = isTypeMode && hasSearch;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, types, perPage]);

  useEffect(() => {
    let cancelled = false;
    getPokemonSpeciesList({ limit: TOTAL_POKEMON, offset: 0 })
      .then((data) => {
        if (!cancelled) setAllPokemon(data.results.map(normalizeFromList));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchDataByMode = async () => {
      if (isTypeAndSearchMode) {
        const typeResults = await fetchByType(types, typeCache.current);
        const result = filterBySearch(debouncedSearch, typeResults);
        return { result, count: result.length };
      }
      if (isTypeMode) {
        const result = await fetchByType(types, typeCache.current);
        return { result, count: result.length };
      }
      if (isSearchMode) {
        const result = filterBySearch(debouncedSearch, allPokemon);
        return { result, count: result.length };
      }
      return { result: allPokemon, count: allPokemon.length };
    };

    const applyPagination = (result, count) => {
      const startIdx = (page - 1) * perPage;
      setPokemonList(result.slice(startIdx, startIdx + perPage));
      setTotalCount(count);
    };

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { result, count } = await fetchDataByMode();
        if (cancelled) return;
        applyPagination(result, count);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, [isTypeMode, isSearchMode, isTypeAndSearchMode, types, page, perPage, debouncedSearch, allPokemon]);

  const toggleType = useCallback((type) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setTypes([]);
    setSearch('');
    setPage(1);
  }, []);

  return {
    pokemonList,
    loading,
    error,
    page,
    totalPages,
    searchTerm: search,
    setSearchTerm: setSearch,
    selectedTypes: types,
    toggleType,
    clearFilters,
    setPage,
    setItemsPerPage: setPerPage,
    itemsPerPage: perPage,
    totalCount,
  };
};

export default usePokemonCatalog;
