import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service or console
    console.log('Error caught by error boundary:', error, errorInfo);
    // You can also set a state variable to track the error and display more details
    this.setState({ error, errorInfo });
  }
  

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI here
      return <p>Something went wrong.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
