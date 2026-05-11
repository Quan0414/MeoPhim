import { useEffect, useMemo, useState } from 'react';
import { apiGet } from '../api/ophimApi.js';
import { FilterPanel } from '../components/FilterPanel.jsx';
import { MovieGrid } from '../components/MovieGrid.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { ErrorState, LoadingState } from '../components/StateBox.jsx';
import { LISTS } from '../constants/navigation.js';
import { getCdnBase, getItems, getList, getPagination } from '../utils/response.js';

export function MovieBrowser({ route, navigate }) {
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const page = Number(route.query?.page || 1);
  const limit = Number(route.query?.limit || 24);
  const routeQueryKey = useMemo(() => JSON.stringify(route.query || {}), [route.query]);

  useEffect(() => {
    let ignore = false;
    Promise.allSettled([apiGet('/the-loai'), apiGet('/quoc-gia'), apiGet('/nam-phat-hanh')]).then((results) => {
      if (ignore) return;
      setCategories(results[0].status === 'fulfilled' ? getList(results[0].value) : []);
      setCountries(results[1].status === 'fulfilled' ? getList(results[1].value) : []);
      setYears((results[2].status === 'fulfilled' ? getList(results[2].value) : []).slice(0, 30));
    });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError('');

    const { path, params } = routeToRequest(route);
    apiGet(path, { page, limit, sort_field: 'modified.time', sort_type: 'desc', ...params })
      .then((data) => {
        if (!ignore) setPayload(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message || 'Khong the tai du lieu');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [route.page, route.slug, routeQueryKey, page, limit]);

  const items = Array.isArray(getItems(payload)) ? getItems(payload) : [];
  const pagination = getPagination(payload);
  const cdnBase = getCdnBase(payload);
  const title = browserTitle(route, payload, categories, countries);

  function updateQuery(patch) {
    navigate({ ...route, query: { ...route.query, ...patch, page: 1 } });
  }

  return (
    <section className="browser-shell">
      <FilterPanel
        route={route}
        categories={categories}
        countries={countries}
        years={years}
        updateQuery={updateQuery}
        navigate={navigate}
      />

      <div className="content-area">
        <div className="section-heading">
          <div>
            <p>{pagination.totalItems ? `${pagination.totalItems.toLocaleString('vi-VN')} ket qua` : 'Thu vien phim'}</p>
            <h1>{title}</h1>
          </div>
          <div className="page-indicator">Trang {pagination.currentPage || page} / {Math.max(pagination.totalPages || 1, 1)}</div>
        </div>

        {loading ? <LoadingState /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error ? (
          <>
            <MovieGrid movies={items} cdnBase={cdnBase} navigate={navigate} />
            <Pagination route={route} pagination={pagination} page={page} navigate={navigate} />
          </>
        ) : null}
      </div>
    </section>
  );
}

function routeToRequest(route) {
  const query = route.query || {};
  if (route.page === 'search') return { path: '/tim-kiem', params: { keyword: query.keyword } };
  if (route.page === 'category') return { path: `/the-loai/${route.slug}`, params: filterParams(query, ['country', 'year']) };
  if (route.page === 'country') return { path: `/quoc-gia/${route.slug}`, params: filterParams(query, ['category', 'year']) };
  if (route.page === 'year') return { path: `/nam-phat-hanh/${route.slug}`, params: filterParams(query, ['category', 'country']) };
  if (route.page === 'list') return { path: `/danh-sach/${route.slug}`, params: filterParams(query, ['category', 'country', 'year']) };
  return { path: '/danh-sach/phim-moi', params: {} };
}

function filterParams(query, keys) {
  return keys.reduce((acc, key) => ({ ...acc, [key]: query[key] }), {});
}

function browserTitle(route, payload, categories, countries) {
  const dataTitle = payload?.data?.titlePage;
  if (dataTitle) return dataTitle;
  if (route.page === 'search') return `Tim kiem: ${route.query?.keyword || ''}`;
  if (route.page === 'category') return categories.find((item) => item.slug === route.slug)?.name || route.slug;
  if (route.page === 'country') return countries.find((item) => item.slug === route.slug)?.name || route.slug;
  if (route.page === 'year') return `Phim nam ${route.slug}`;
  return LISTS.find((item) => item.slug === route.slug)?.name || 'Phim moi cap nhat';
}
