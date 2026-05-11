export function getDataNode(payload) {
  return payload?.data || payload || {};
}

export function getItems(payload) {
  const data = getDataNode(payload);
  return data.items || data.item || data.movies || [];
}

export function getList(payload) {
  const data = getDataNode(payload);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export function getPagination(payload) {
  const pagination = payload?.data?.params?.pagination || payload?.params?.pagination || {};
  const totalItems = Number(pagination.totalItems || 0);
  const perPage = Number(pagination.totalItemsPerPage || pagination.limit || 24);
  const totalPages = Number(pagination.totalPages || (totalItems && perPage ? Math.ceil(totalItems / perPage) : 1));

  return {
    currentPage: Number(pagination.currentPage || 1),
    totalPages,
    totalItems,
  };
}

export function getCdnBase(payload) {
  return payload?.data?.APP_DOMAIN_CDN_IMAGE || payload?.APP_DOMAIN_CDN_IMAGE || '';
}
