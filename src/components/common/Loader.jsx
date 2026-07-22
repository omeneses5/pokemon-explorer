import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center gap-3 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-shop-primary border-t-transparent" />
      <span className="text-sm text-shop-muted">{t('loading')}</span>
    </div>
  );
};

export default Loader;
