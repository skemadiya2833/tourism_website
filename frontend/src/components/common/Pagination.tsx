import React from "react";

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);
  const maxVisiblePages = 5; 

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let start = Math.max(currentPage - halfVisible, 1);
    let end = Math.min(currentPage + halfVisible, totalPages);

    if (currentPage <= halfVisible) {
      end = Math.min(maxVisiblePages, totalPages);
    } else if (currentPage + halfVisible >= totalPages) {
      start = Math.max(totalPages - maxVisiblePages + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-1 text-white ${currentPage === 1 ? 'bg-gray-400' : 'bg-green-500'} rounded hover:bg-green-600`}
      >
        Previous
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => handleClick(1)}
            className={`px-3 py-1 mx-1 rounded bg-green-100 text-green-600 hover:bg-green-200`}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="mx-1">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`px-3 py-1 mx-1 rounded ${currentPage === page ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'} hover:bg-green-200`}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="mx-1">...</span>}
          <button
            onClick={() => handleClick(totalPages)}
            className={`px-3 py-1 mx-1 rounded bg-green-100 text-green-600 hover:bg-green-200`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 mx-1 text-white ${currentPage === totalPages ? 'bg-gray-400' : 'bg-green-500'} rounded hover:bg-green-600`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
