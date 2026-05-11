import { Component } from 'react';
import { logger } from '../utils/logger.js';

export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('react', 'render error', { error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="state-box error app-error">
          <strong>Frontend bi loi khi render.</strong>
          <span>{this.state.error.message || 'Kiem tra Console trong DevTools de xem chi tiet.'}</span>
        </div>
      );
    }

    return this.props.children;
  }
}
