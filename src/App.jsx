import ErrorBoundary from './components/common/ErrorBoundary';
import AppRouter from './router/AppRouter';

const App = () => (
  <ErrorBoundary>
    <AppRouter />
  </ErrorBoundary>
);

export default App;
