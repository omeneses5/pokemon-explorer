import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatId } from '../../utils/formatters';
import { getOfficialArtwork, getBasicSprite } from '../../utils/sprites';
import { getLocalizedName, getLocalizedFlavorText, getLocalizedGenus } from '../../utils/localization';
import { getColorLabel, getShapeLabel, getHabitatLabel, getEggGroupLabel, getGenerationLabel } from '../../utils/speciesLabels';

const PokemonDetail = ({ species }) => {
  const { t } = useTranslation();
  const [useFallback, setUseFallback] = useState(false);

  if (!species) return null;

  const name = getLocalizedName(species.names);
  const flavorText = getLocalizedFlavorText(species.flavor_text_entries);
  const genus = getLocalizedGenus(species.genera);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <img
        src={useFallback ? getBasicSprite(species.id) : getOfficialArtwork(species.id)}
        alt={name}
        className="mx-auto h-64 w-64 object-contain"
        onError={() => !useFallback && setUseFallback(true)}
      />

      <h1 className="mt-4 text-center font-display text-3xl font-bold text-shop-ink">
        {formatId(species.id)} {name}
      </h1>

      {genus && (
        <p className="mt-1 text-center text-sm text-shop-muted">{genus}</p>
      )}

      {flavorText && (
        <p className="mt-6 text-center text-sm italic text-shop-muted">
          {flavorText}
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 text-center text-sm text-shop-ink sm:grid-cols-3">
        <div className="rounded-lg border border-shop-border bg-shop-surface p-3">
          <span className="block text-xs text-shop-muted">{t('detail.color')}</span>
          <span className="capitalize">{getColorLabel(species.color?.name) ?? '—'}</span>
        </div>
        <div className="rounded-lg border border-shop-border bg-shop-surface p-3">
          <span className="block text-xs text-shop-muted">{t('detail.shape')}</span>
          <span className="capitalize">{getShapeLabel(species.shape?.name) ?? '—'}</span>
        </div>
        <div className="rounded-lg border border-shop-border bg-shop-surface p-3">
          <span className="block text-xs text-shop-muted">{t('detail.habitat')}</span>
          <span className="capitalize">{getHabitatLabel(species.habitat?.name) ?? '—'}</span>
        </div>
        <div className="rounded-lg border border-shop-border bg-shop-surface p-3">
          <span className="block text-xs text-shop-muted">{t('detail.captureRate')}</span>
          {species.capture_rate ?? '—'}
        </div>
        <div className="rounded-lg border border-shop-border bg-shop-surface p-3">
          <span className="block text-xs text-shop-muted">{t('detail.eggGroups')}</span>
          {species.egg_groups?.map((e) => getEggGroupLabel(e.name)).join(', ') ?? '—'}
        </div>
        <div className="rounded-lg border border-shop-border bg-shop-surface p-3">
          <span className="block text-xs text-shop-muted">{t('detail.generation')}</span>
          {getGenerationLabel(species.generation?.name) ?? '—'}
        </div>
      </div>

      {species.is_legendary && (
        <div className="mt-4 text-center">
          <span className="inline-block rounded-full bg-shop-accent/10 px-3 py-1 text-xs font-semibold text-shop-accent">
            {t('detail.legendary')}
          </span>
        </div>
      )}

      {species.is_mythical && (
        <div className="mt-2 text-center">
          <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            {t('detail.mythical')}
          </span>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
