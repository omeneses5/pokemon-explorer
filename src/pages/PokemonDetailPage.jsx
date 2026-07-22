import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import usePokemonDetail from '../hooks/usePokemonDetail';
import PokemonDetail from '../components/pokemon/PokemonDetail';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const PokemonDetailPage = () => {
  const { t } = useTranslation();
  const { name } = useParams();
  const { species, loading, error, retry } = usePokemonDetail(name);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;

  return (
    <div className="min-h-screen bg-shop-bg">
      <header className="sticky top-0 z-30 border-b border-shop-border bg-shop-surface shadow-sm">
        <div className="mx-auto flex items-center px-4 py-3 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm text-shop-muted transition-colors hover:text-shop-primary"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t('header.back')}
          </Link>
          <h1 className="mx-auto font-display text-lg font-bold text-shop-ink">{t('header.title')}</h1>
        </div>
      </header>
      <PokemonDetail species={species} />
    </div>
  );
};

export default PokemonDetailPage;
