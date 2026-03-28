import { useState } from "react";

export function usePagination<T>(items: T[], pageSize = 10) {
  const [page, setPage] = useState(1);

  const totalCount = items.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // Reset to page 1 when items list shrinks past current page
  const safePage = page > totalPages ? 1 : page;
  if (safePage !== page) setPage(safePage);

  const start = (safePage - 1) * pageSize;
  const paginatedItems = items.slice(start, start + pageSize);

  return {
    page: safePage,
    setPage,
    totalCount,
    totalPages,
    pageSize,
    paginatedItems,
  };
}
