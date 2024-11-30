import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const BookContainer = ({ books, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const booksPerPage = 35; // Number of books per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Calculate the books for the current page
  const getCurrentBooks = () => {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return books.slice(startIndex, endIndex);
  };

  // Get books for the current page
  const currentBooks = getCurrentBooks();

  // Handle Page Click
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <div id="book-container" className="book-container">
        {loading && <p>Loading books...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && books.length === 0 && <p>No books found for the selected category.</p>}
        {!loading &&
          !error &&
          currentBooks.map((book, index) => (
            <Link
              key={index}
              to={`/book-details/${book.shortTitle}`} // Link to the details page
              className="book-card"
            >
              <img
                src={book.image || "https://via.placeholder.com/200x300?text=Book+Cover"}
                alt={book.shortTitle}
                className="book-image"
              />
              <h3 className="book-title">{book.shortTitle}</h3>
              <p className="book-author">{book.author}</p>
              {!book.category && <p className="book-price">${book.price}</p>}
            </Link>
          ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && ( // Only show pagination if more than one page
        <>
          <div className="pagination-controls">
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                className={`pagination-button ${
                  currentPage === page + 1 ? "active" : ""
                }`}
                onClick={() => handlePageClick(page + 1)}
              >
                {page + 1}
              </button>
            ))}
          </div>
          <div className="pagination-page-info">
            Page {currentPage} of {totalPages}
          </div>
        </>
      )}
    </main>
  );
};

export default BookContainer;
