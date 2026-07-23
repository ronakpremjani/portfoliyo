import React from 'react';
import { Container } from './container';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-white text-brand-black flex items-center justify-center p-6">
          <Container className="flex flex-col items-center text-center gap-6">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Something went wrong</h1>
            <p className="text-brand-gray-dark max-w-lg leading-relaxed">
              An unexpected error has occurred. We've been notified and are looking into it. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 bg-brand-black text-brand-white font-medium rounded hover:bg-brand-gray-dark transition-colors"
            >
              Reload Page
            </button>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}
