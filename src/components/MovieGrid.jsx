import { Film } from 'lucide-react';
import { movieImage } from '../utils/images.js';

export function MovieGrid({ movies, cdnBase, navigate }) {
  if (!movies.length) return <div className="empty-state">Khong co phim phu hop.</div>;

  return (
    <div className="movie-grid">
      {movies.map((movie) => {
        const imageUrl = movieImage(movie, cdnBase);
        return (
          <button
            className="movie-card"
            type="button"
            key={movie._id || movie.slug || movie.name}
            disabled={!movie.slug}
            onClick={() => movie.slug && navigate({ page: 'detail', slug: movie.slug })}
          >
            <div className="poster-frame">
              {imageUrl ? <img src={imageUrl} alt={movie.name || 'Poster phim'} loading="lazy" /> : <Film size={42} />}
              <span>{movie.quality || movie.lang || movie.year || 'OPhim'}</span>
            </div>
            <strong>{movie.name || 'Dang cap nhat'}</strong>
            <small>{movie.origin_name || movie.year || 'Dang cap nhat'}</small>
          </button>
        );
      })}
    </div>
  );
}
