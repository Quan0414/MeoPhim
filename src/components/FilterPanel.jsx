import { SlidersHorizontal } from 'lucide-react';

export function FilterPanel({ route, categories, countries, years, updateQuery, navigate }) {
  const categoryOptions = Array.isArray(categories) ? categories : [];
  const countryOptions = Array.isArray(countries) ? countries : [];
  const yearOptions = Array.isArray(years) ? years : [];

  return (
    <aside className="filters">
      <div className="filter-title">
        <SlidersHorizontal size={18} />
        Bo loc
      </div>

      <label>
        The loai
        <select
          value={route.page === 'category' ? route.slug : route.query?.category || ''}
          onChange={(event) => {
            const value = event.target.value;
            if (value) navigate({ page: 'category', slug: value, query: { page: 1, limit: 24 } });
            else updateQuery({ category: '' });
          }}
        >
          <option value="">Tat ca</option>
          {categoryOptions.map((item) => (
            <option value={item.slug} key={item.slug}>{item.name}</option>
          ))}
        </select>
      </label>

      <label>
        Quoc gia
        <select
          value={route.page === 'country' ? route.slug : route.query?.country || ''}
          onChange={(event) => {
            const value = event.target.value;
            if (value) navigate({ page: 'country', slug: value, query: { page: 1, limit: 24 } });
            else updateQuery({ country: '' });
          }}
        >
          <option value="">Tat ca</option>
          {countryOptions.map((item) => (
            <option value={item.slug} key={item.slug}>{item.name}</option>
          ))}
        </select>
      </label>

      <label>
        Nam
        <select
          value={route.page === 'year' ? route.slug : route.query?.year || ''}
          onChange={(event) => {
            const value = event.target.value;
            if (value) navigate({ page: 'year', slug: value, query: { page: 1, limit: 24 } });
            else updateQuery({ year: '' });
          }}
        >
          <option value="">Tat ca</option>
          {yearOptions.map((item) => (
            <option value={item.slug || item.name} key={item.slug || item.name}>{item.name}</option>
          ))}
        </select>
      </label>
    </aside>
  );
}
