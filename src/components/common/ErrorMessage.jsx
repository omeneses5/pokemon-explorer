import { useTranslation } from 'react-i18next';

const ErrorMessage = ({ message, onRetry }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
        <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-shop-ink">
        {message || t('error.generic')}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg border border-shop-border bg-shop-surface px-4 py-2 text-sm font-medium text-shop-ink transition-colors hover:border-shop-primary hover:text-shop-primary"
        >
          {t('error.retry')}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
