import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header.jsx';
import { MovieBrowser } from './pages/MovieBrowser.jsx';
import { MovieDetail } from './pages/MovieDetail.jsx';
import { buildHash, parseRoute } from './router/hashRouter.js';
import { logger } from './utils/logger.js';

export function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));

  useEffect(() => {
    logger.info('router', 'initial route', route);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const nextRoute = parseRoute(window.location.hash);
      logger.info('router', 'route changed', nextRoute);
      setRoute(nextRoute);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((nextRoute) => {
    logger.info('router', 'navigate', nextRoute);
    window.location.hash = buildHash(nextRoute);
  }, []);

  return (
    <div className="app">
      <Header route={route} navigate={navigate} />
      <main>
        {route.page === 'detail' ? (
          <MovieDetail slug={route.slug} navigate={navigate} />
        ) : (
          <MovieBrowser route={route} navigate={navigate} />
        )}
      </main>
    </div>
  );
}
