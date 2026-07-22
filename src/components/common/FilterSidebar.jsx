import { useTranslation } from 'react-i18next';
import TYPE_COLORS from '../../utils/typeColors';
import { getTypeLabel } from '../../utils/typeLabels';

const TYPES = Object.keys(TYPE_COLORS);

const FilterSidebar = ({ selectedTypes, onToggleType, onClear }) => {
  const { t } = useTranslation();

  return (
    <aside className="w-full shrink-0 md:w-48 lg:w-56">
      <div className="rounded-xl border border-shop-border bg-shop-surface p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold text-shop-ink">{t('filters.title')}</h2>
          {selectedTypes.length > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-shop-primary hover:underline"
            >
              {t('filters.clear')}
            </button>
          )}
        </div>

        <div className="space-y-1.5">
          {TYPES.map((type) => {
            const active = selectedTypes.includes(type);
            return (
              <button
                key={type}
                onClick={() => onToggleType(type)}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors ${
                  active
                    ? 'bg-shop-primary/10 font-medium text-shop-primary'
                    : 'text-shop-ink hover:bg-shop-bg'
                }`}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: TYPE_COLORS[type].dot }}
                />
                <span>{getTypeLabel(type)}</span>
                {active && (
                  <svg className="ml-auto h-4 w-4 shrink-0 text-shop-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
