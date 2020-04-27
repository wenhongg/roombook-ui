import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      info: '',
      error: '',
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, info, error });
  }

  render() {
    return this.state.hasError ? <p>Error occured.</p> : this.props.children;
  }
}

export default ErrorBoundary;