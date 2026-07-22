import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatId } from '../../utils/formatters';

const PokemonCard = ({ pokemon }) => {
  const { id, name, sprite, basicSprite } = pokemon;
  const [useFallback, setUseFallback] = useState(false);

  return (
    <Link
      to={`/pokemon/${name}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-shop-border bg-shop-surface shadow-sm transition-all hover:border-shop-primary/40 hover:shadow-md"
    >
      <div className="relative flex items-center justify-center rounded-t-xl p-4 pt-6">
        <span className="absolute left-2.5 top-2.5 rounded-full bg-shop-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-shop-primary">
          {formatId(id)}
        </span>
        <img
          src={useFallback ? basicSprite : sprite}
          alt={name}
          className="h-28 w-28 object-contain transition-transform group-hover:scale-105 sm:h-32 sm:w-32"
          loading="lazy"
          onError={() => !useFallback && setUseFallback(true)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3 pb-3 pt-2">
        <h3 className="text-center font-display text-sm font-semibold text-shop-ink capitalize">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default PokemonCard;
