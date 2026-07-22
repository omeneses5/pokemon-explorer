import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import usePokemonCatalog from '../hooks/usePokemonCatalog';
import PokemonList from '../components/pokemon/PokemonList';
import SearchBar from '../components/common/SearchBar';
import FilterSidebar from '../components/common/FilterSidebar';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const PER_PAGE_OPTIONS = [12, 20, 40, 60];

const HomePage = () => {
  const { t } = useTranslation();
  const {
    pokemonList,
    loading,
    error,
    page,
    totalPages,
    searchTerm,
    setSearchTerm,
    selectedTypes,
    toggleType,
    clearFilters,
    setPage,
    setItemsPerPage,
    itemsPerPage,
    totalCount,
  } = usePokemonCatalog();

  const [filtersOpen, setFiltersOpen] = useState(false);

  const firstItem = totalCount > 0 ? (page - 1) * itemsPerPage + 1 : 0;
  const lastItem = Math.min(page * itemsPerPage, totalCount);

  return (
    <div className="min-h-screen bg-shop-bg">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-shop-border bg-shop-surface shadow-sm">
        <div className="mx-auto flex items-center gap-4 px-4 py-3 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-shop-primary text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h1 className="hidden font-display text-xl font-bold text-shop-ink sm:block">
              {t('header.title')}
            </h1>
          </div>

          <div className="flex-1">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 rounded-lg border border-shop-border px-3 py-2 text-sm text-shop-ink transition-colors hover:border-shop-primary hover:text-shop-primary md:hidden"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {t('filters.mobileToggle')}
            {selectedTypes.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-shop-primary text-xs text-white">
                {selectedTypes.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="border-b border-shop-border bg-shop-surface px-4 py-4 md:hidden">
          <FilterSidebar
            selectedTypes={selectedTypes}
            onToggleType={toggleType}
            onClear={clearFilters}
          />
        </div>
      )}

      {/* Main content */}
      <div className="mx-auto flex gap-6 px-4 py-6 lg:px-8">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <div className="sticky top-20">
            <FilterSidebar
              selectedTypes={selectedTypes}
              onToggleType={toggleType}
              onClear={clearFilters}
            />
          </div>
        </div>

        <main className="min-w-0 flex-1">
          {loading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <>
              {/* Toolbar */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-shop-muted">
                  {t('pagination.showing', { from: firstItem, to: lastItem, total: totalCount })}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-shop-muted">{t('pagination.perPage')}:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="rounded-lg border border-shop-border bg-shop-surface px-2.5 py-1.5 text-xs text-shop-ink focus:border-shop-primary focus:outline-none"
                  >
                    {PER_PAGE_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pokemon grid */}
              {pokemonList.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-shop-muted">
                    {t('home.empty')}
                  </p>
                </div>
              ) : (
                <PokemonList pokemons={pokemonList} />
              )}

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
