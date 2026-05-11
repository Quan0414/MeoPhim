import { TMDB_IMAGE_BASE } from '../constants/images.js';
import { joinUrl } from './url.js';

export function movieImage(movie, cdnBase, kind = 'poster') {
  const value = kind === 'thumb' ? movie?.thumb_url : movie?.poster_url || movie?.thumb_url;
  if (!value) return '';
  if (/^https?:\/\//.test(value)) return value;
  if (value.startsWith('/')) return cdnBase ? `${cdnBase.replace(/\/$/, '')}${value}` : value;
  const base = cdnBase && !cdnBase.includes('/uploads/') ? joinUrl(cdnBase, 'uploads/movies') : cdnBase;
  return base ? joinUrl(base, value) : value;
}

export function pickBackdrop(imagesPayload, movie) {
  const backdrop = imagesPayload?.data?.images?.find((image) => image.type === 'backdrop')?.file_path;
  if (backdrop) return `${TMDB_IMAGE_BASE}/w1280${backdrop}`;
  return movie?.thumb_url && /^https?:\/\//.test(movie.thumb_url) ? movie.thumb_url : '';
}
