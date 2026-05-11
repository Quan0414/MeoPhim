import { useEffect, useMemo, useState } from 'react';
import { Film, Play, Star } from 'lucide-react';
import { apiGet } from '../api/ophimApi.js';
import { InfoLine } from '../components/InfoLine.jsx';
import { ErrorState, LoadingState } from '../components/StateBox.jsx';
import { TMDB_IMAGE_BASE } from '../constants/images.js';
import { movieImage, pickBackdrop } from '../utils/images.js';
import { stripHtml } from '../utils/text.js';

export function MovieDetail({ slug, navigate }) {
  const [payload, setPayload] = useState(null);
  const [imagesPayload, setImagesPayload] = useState(null);
  const [peoplesPayload, setPeoplesPayload] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError('');
    setSelectedEpisode(null);

    Promise.allSettled([apiGet(`/phim/${slug}`), apiGet(`/phim/${slug}/images`), apiGet(`/phim/${slug}/peoples`)])
      .then((results) => {
        if (ignore) return;
        if (results[0].status === 'rejected') throw results[0].reason;
        setPayload(results[0].value);
        setImagesPayload(results[1].status === 'fulfilled' ? results[1].value : null);
        setPeoplesPayload(results[2].status === 'fulfilled' ? results[2].value : null);
      })
      .catch((err) => {
        if (!ignore) setError(err.message || 'Khong the tai phim');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [slug]);

  const movie = payload?.data?.item || {};
  const backdrop = useMemo(() => pickBackdrop(imagesPayload, movie), [imagesPayload, movie]);
  const poster = movieImage(movie, payload?.data?.APP_DOMAIN_CDN_IMAGE || '');
  const episodes = (movie.episodes || []).flatMap((server) =>
    (server.server_data || []).map((episode) => ({ ...episode, server_name: server.server_name }))
  );
  const activeEpisode = selectedEpisode || episodes[0];
  const people = peoplesPayload?.data?.peoples || [];

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <section className="detail-page">
      <div className="detail-hero" style={{ backgroundImage: backdrop ? `linear-gradient(90deg, rgba(9, 12, 18, .95), rgba(9, 12, 18, .72)), url("${backdrop}")` : undefined }}>
        <div className="poster-large">
          {poster ? <img src={poster} alt={movie.name} /> : <Film size={60} />}
        </div>
        <div className="detail-copy">
          <button className="back-button" type="button" onClick={() => navigate({ page: 'home' })}>Ve trang chu</button>
          <h1>{movie.name}</h1>
          <p className="origin-name">{movie.origin_name}</p>
          <div className="meta-row">
            {[movie.year, movie.quality, movie.lang, movie.time, movie.episode_current].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="rating-row">
            <Star size={18} />
            <span>TMDB {movie.tmdb?.vote_average || 'N/A'}</span>
            <span>IMDb {movie.imdb?.vote_average || 'N/A'}</span>
          </div>
          <p className="description">{stripHtml(movie.content) || 'Noi dung dang duoc cap nhat.'}</p>
          <div className="tag-row">
            {(movie.category || []).map((item) => <button type="button" key={item.slug} onClick={() => navigate({ page: 'category', slug: item.slug, query: { page: 1, limit: 24 } })}>{item.name}</button>)}
            {(movie.country || []).map((item) => <button type="button" key={item.slug} onClick={() => navigate({ page: 'country', slug: item.slug, query: { page: 1, limit: 24 } })}>{item.name}</button>)}
          </div>
        </div>
      </div>

      <div className="detail-layout">
        <section className="watch-panel">
          <div className="section-heading compact">
            <div>
              <p>{activeEpisode?.server_name || 'Tap phim'}</p>
              <h2>{activeEpisode?.name || 'Chua co tap phim'}</h2>
            </div>
          </div>
          <div className="player">
            {activeEpisode?.link_embed ? (
              <iframe src={activeEpisode.link_embed} title={activeEpisode.name} allowFullScreen />
            ) : (
              <div className="empty-player"><Play size={38} /> Chua co link xem</div>
            )}
          </div>
          <div className="episode-list">
            {episodes.map((episode) => (
              <button
                type="button"
                className={activeEpisode?.slug === episode.slug ? 'active' : ''}
                key={`${episode.server_name}-${episode.slug}-${episode.name}`}
                onClick={() => setSelectedEpisode(episode)}
              >
                {episode.name}
              </button>
            ))}
          </div>
        </section>

        <aside className="info-panel">
          <h2>Thong tin</h2>
          <InfoLine label="Dao dien" value={(movie.director || []).join(', ')} />
          <InfoLine label="Dien vien" value={(movie.actor || []).slice(0, 8).join(', ')} />
          <InfoLine label="Trang thai" value={movie.status} />
          <InfoLine label="So tap" value={movie.episode_total} />
          <InfoLine label="Luot xem" value={movie.view?.toLocaleString?.('vi-VN') || movie.view} />

          {people.length ? (
            <div className="people-list">
              {people.slice(0, 8).map((person) => (
                <div key={person.tmdb_people_id || person.name}>
                  {person.profile_path ? <img src={`${TMDB_IMAGE_BASE}/w185${person.profile_path}`} alt={person.name} /> : null}
                  <span>{person.name}</span>
                  <small>{person.character || person.known_for_department}</small>
                </div>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
