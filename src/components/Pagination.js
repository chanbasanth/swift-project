import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPages = () => {
    const pages = [];

    // Always show page 1
    pages.push(
      <button
        key={1}
        onClick={() => goToPage(1)}
        className={currentPage === 1 ? 'active' : ''}
      >
        1
      </button>
    );

    // Show ellipsis if current page > 3
    if (currentPage > 3) {
      pages.push(<span key="start-ellipsis">...</span>);
    }

    // Show current page if it's not 1 or last
    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(
        <button
          key={currentPage}
          onClick={() => goToPage(currentPage)}
          className="active"
        >
          {currentPage}
        </button>
      );
    }

    // Show ellipsis if current page < totalPages - 2
    if (currentPage < totalPages - 2) {
      pages.push(<span key="end-ellipsis">...</span>);
    }

    // Always show last page (if not same as 1)
    if (totalPages !== 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className={currentPage === totalPages ? 'active' : ''}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◀
      </button>
      {renderPages()}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
