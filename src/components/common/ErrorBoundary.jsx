import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReset = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-shop-bg px-4 text-center text-shop-ink">
          <p className="font-display text-lg">Algo salió mal.</p>
          <p className="text-sm text-shop-muted">
            Ocurrió un error inesperado. Intenta recargar la página.
          </p>
          <button
            onClick={this.handleReset}
            className="rounded-lg bg-shop-primary px-4 py-2 text-sm text-white"
          >
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
