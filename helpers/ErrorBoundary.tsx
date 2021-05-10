import React from 'react';
import FallbackComponent from '../components/FallbackComponent';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = {hasError: null};

  static getDerivedStateFromError(error: any) {
    return {hasError: error};
  }

  componentDidCatch(error, info) {
    this.logErrorToServices(error.toString(), info.componentStack);
  }
  // A fake logging service 😬
  logErrorToServices = console.log;
  render() {
    if (this.state.hasError) {
      return <FallbackComponent />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
