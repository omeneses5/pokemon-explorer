const LOCALE = 'es';
const FALLBACK_LOCALE = 'en';

export function getLocalizedName(namesArray = [], locale = LOCALE) {
  const match = namesArray.find((n) => n.language.name === locale);
  if (match) return match.name;
  const fallback = namesArray.find((n) => n.language.name === FALLBACK_LOCALE);
  return fallback?.name ?? '';
}

export function getLocalizedFlavorText(entries = [], locale = LOCALE) {
  const match = entries.find((e) => e.language.name === locale);
  const text =
    match?.flavor_text ??
    entries.find((e) => e.language.name === FALLBACK_LOCALE)?.flavor_text;
  return text?.replace(/[\n\f]/g, ' ') ?? '';
}

export function getLocalizedGenus(genera = [], locale = LOCALE) {
  const match = genera.find((g) => g.language.name === locale);
  return (
    match?.genus ??
    genera.find((g) => g.language.name === FALLBACK_LOCALE)?.genus ??
    ''
  );
}
