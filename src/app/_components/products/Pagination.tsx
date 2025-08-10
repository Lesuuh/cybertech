import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function PaginationDemo({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="inline-flex rounded-md shadow-sm space-x-1"
      aria-label="Pagination"
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 ${
            page === currentPage ? "bg-black text-white" : "bg-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </nav>
  );
}
