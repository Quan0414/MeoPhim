import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({ route, pagination, page, navigate }) {
  const totalPages = Math.max(pagination.totalPages || 1, 1);

  return (
    <div className="pagination">
      <button type="button" disabled={page <= 1} onClick={() => navigate({ ...route, query: { ...route.query, page: page - 1 } })}>
        <ChevronLeft size={18} />
        Truoc
      </button>
      <span>{page} / {totalPages}</span>
      <button type="button" disabled={page >= totalPages} onClick={() => navigate({ ...route, query: { ...route.query, page: page + 1 } })}>
        Sau
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
