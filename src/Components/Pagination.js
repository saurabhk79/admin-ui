import React from "react";
import "./pagination.css";

/**
 * Pagination component to navigate through pages and perform deletion as well.
 *
 * @component
 * @param {number} props.totalItems - Total number of items.
 * @param {number} props.ITEMS_PER_PAGE - A constant for the Number of items per page.
 * @param {function} props.setCurrentPage - Function to set the current page.
 * @param {number} props.currentPage - The current page.
 * @param {function} props.handleSelectedDeleteUser - Function to handle delete action.
 * @returns {JSX.Element} - The rendered component.
 */
const Pagination = ({
  totalItems,
  ITEMS_PER_PAGE,
  setCurrentPage,
  currentPage,
  handleSelectedDeleteUser,
}) => {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const pageNumbers = [];

  // CSS class for the buttons
  const ICON_BUTTON_STYLE =
    "btn btn-primary rounded-circle mx-1 square-box d-flex justify-center align-center";

  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  /**
   * Handles page click event.
   *
   * @param {number} page - The selected page.
   */
  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination-component">
      {/* Delete button */}
      <button
        className="btn btn-outline-danger me-5"
        onClick={handleSelectedDeleteUser}
      >
        Delete
      </button>

      {/* Pagination */}
      <div className="pagination d-flex align-center justify-center">
        {/* Previous page buttons */}
        <button
          onClick={() => handlePageClick(1)}
          className={ICON_BUTTON_STYLE}
        >
          <i className="fa-solid fa-angles-left text-white"></i>
        </button>
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          className={ICON_BUTTON_STYLE}
        >
          <i className="fa-solid fa-angle-left text-white"></i>
        </button>

        {/* Page numbers */}
        <div className="d-flex">
          {pageNumbers.map((page) => (
            <div
              key={page}
              className={`${currentPage === page ? "active" : ""}`}
            >
              <button
                className="page-link rounded mx-2"
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            </div>
          ))}
        </div>

        {/* Next page button */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          className={ICON_BUTTON_STYLE}
        >
          <i className="fa-solid fa-angle-right text-white"></i>
        </button>
        <button
          onClick={() => handlePageClick(totalPages)}
          className={ICON_BUTTON_STYLE}
        >
          <i className="fa-solid fa-angles-right text-white"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
