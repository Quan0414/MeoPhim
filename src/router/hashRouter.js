export function parseRoute(hash) {
  const cleanHash = hash.replace(/^#\/?/, '');
  const [pathPart = '', queryPart = ''] = cleanHash.split('?');
  const parts = pathPart.split('/').filter(Boolean);
  const query = Object.fromEntries(new URLSearchParams(queryPart).entries());

  if (parts[0] === 'phim' && parts[1]) return { page: 'detail', slug: parts[1] };
  if (parts[0] === 'the-loai' && parts[1]) return { page: 'category', slug: parts[1], query };
  if (parts[0] === 'quoc-gia' && parts[1]) return { page: 'country', slug: parts[1], query };
  if (parts[0] === 'nam' && parts[1]) return { page: 'year', slug: parts[1], query };
  if (parts[0] === 'tim-kiem') return { page: 'search', query };
  if (parts[0] === 'danh-sach' && parts[1]) return { page: 'list', slug: parts[1], query };
  return { page: 'home', query };
}

export function buildHash(route) {
  const query = new URLSearchParams(route.query || {});
  const suffix = query.toString() ? `?${query}` : '';
  if (route.page === 'detail') return `/phim/${route.slug}`;
  if (route.page === 'category') return `/the-loai/${route.slug}${suffix}`;
  if (route.page === 'country') return `/quoc-gia/${route.slug}${suffix}`;
  if (route.page === 'year') return `/nam/${route.slug}${suffix}`;
  if (route.page === 'search') return `/tim-kiem${suffix}`;
  if (route.page === 'list') return `/danh-sach/${route.slug}${suffix}`;
  return `/${suffix}`;
}
