import { useState, useEffect, useCallback } from 'react';
import { getPokemonSpeciesDetail } from '../api/pokemonService';

const usePokemonDetail = (nameOrId) => {
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPokemonSpeciesDetail(nameOrId);
      setSpecies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [nameOrId]);

  useEffect(() => {
    if (nameOrId) fetchData();
  }, [nameOrId, fetchData]);

  return { species, loading, error, retry: fetchData };
};

export default usePokemonDetail;
