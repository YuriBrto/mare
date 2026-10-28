import './Pagination.css';

/**
 * Monta a lista de páginas visíveis com reticências.
 * Ex.: total 10, atual 5 → [1, '…', 4, 5, 6, '…', 10]
 */
export function getPageItems(totalPages, currentPage, siblings = 1) {
  const pages = [];
  const start = Math.max(2, currentPage - siblings);
  const end = Math.min(totalPages - 1, currentPage + siblings);

  pages.push(1);
  if (start > 2) pages.push('start-ellipsis');
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < totalPages - 1) pages.push('end-ellipsis');
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

/**
 * Paginação controlada: o componente pai guarda a página atual.
 *
 * @param {number} totalPages
 * @param {number} currentPage - começa em 1.
 * @param {(page: number) => void} onPageChange
 */
export default function Pagination({ totalPages, currentPage, onPageChange, label = 'Paginação' }) {
  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const goTo = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) onPageChange(page);
  };

  return (
    <nav className="pagination" aria-label={label}>
      <button
        type="button"
        className="pagination__step"
        onClick={() => goTo(currentPage - 1)}
        disabled={isFirst}
        aria-label="Página anterior"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        <span className="pagination__step-text">Anterior</span>
      </button>

      <ol className="pagination__list">
        {getPageItems(totalPages, currentPage).map((item) =>
          typeof item === 'number' ? (
            <li key={item}>
              <button
                type="button"
                className="pagination__page"
                onClick={() => goTo(item)}
                aria-current={item === currentPage ? 'page' : undefined}
                aria-label={`Página ${item}`}
              >
                {item}
              </button>
            </li>
          ) : (
            <li key={item} className="pagination__ellipsis" aria-hidden="true">…</li>
          ),
        )}
      </ol>

      <button
        type="button"
        className="pagination__step"
        onClick={() => goTo(currentPage + 1)}
        disabled={isLast}
        aria-label="Próxima página"
      >
        <span className="pagination__step-text">Próxima</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </nav>
  );
}
