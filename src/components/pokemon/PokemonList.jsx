import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
    {pokemons.map((pokemon) => (
      <PokemonCard key={pokemon.name} pokemon={pokemon} />
    ))}
  </div>
);

export default PokemonList;
