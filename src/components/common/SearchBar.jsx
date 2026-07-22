import { useTranslation } from 'react-i18next';

const SearchBar = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full max-w-sm">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-shop-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder={t('search.placeholder')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-shop-border bg-white py-2 pl-10 pr-4 text-sm text-shop-ink placeholder-shop-muted focus:border-shop-primary focus:outline-none focus:ring-1 focus:ring-shop-primary"
      />
    </div>
  );
};

export default SearchBar;
