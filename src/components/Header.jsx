import { useEffect, useState } from 'react';
import { Clapperboard, Home, Search, X } from 'lucide-react';
import { LISTS } from '../constants/navigation.js';

export function Header({ route, navigate }) {
  const [keyword, setKeyword] = useState(route.query?.keyword || '');

  useEffect(() => {
    setKeyword(route.query?.keyword || '');
  }, [route.query?.keyword]);

  function submitSearch(event) {
    event.preventDefault();
    const value = keyword.trim();
    if (value.length >= 2) {
      navigate({ page: 'search', query: { keyword: value, page: 1, limit: 24 } });
    }
  }

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => navigate({ page: 'home' })}>
        <Clapperboard size={28} />
        <span>OPhim</span>
      </button>

      <nav className="top-nav" aria-label="Danh muc phim">
        <button className={route.page === 'home' ? 'active' : ''} type="button" onClick={() => navigate({ page: 'home' })}>
          <Home size={17} />
          Trang chu
        </button>
        {LISTS.map((item) => (
          <button
            className={route.slug === item.slug ? 'active' : ''}
            type="button"
            key={item.slug}
            onClick={() => navigate({ page: 'list', slug: item.slug, query: { page: 1, limit: 24 } })}
          >
            {item.name}
          </button>
        ))}
      </nav>

      <form className="search-box" onSubmit={submitSearch}>
        <Search size={18} />
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Tim phim..."
          aria-label="Tim phim"
        />
        {keyword ? (
          <button className="icon-button" type="button" aria-label="Xoa tim kiem" onClick={() => setKeyword('')}>
            <X size={16} />
          </button>
        ) : null}
      </form>
    </header>
  );
}
