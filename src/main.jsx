import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { API_BASE_URL, APP_MODE } from './config/env.js';
import { logger } from './utils/logger.js';
import './styles.css';

logger.info('app', 'starting', {
  apiBaseUrl: API_BASE_URL,
  mode: APP_MODE,
});

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
