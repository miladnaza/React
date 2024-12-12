import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const BookContainer = ({ books, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const booksPerPage = 28; // Number of books per page

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
      {totalPages > 1 && ( // Only show pagination if more than one page
  <div className="pagination-container">
    <button
      className="pagination-nav"
      disabled={currentPage === 1}
      onClick={() => handlePageClick(currentPage - 1)}
    >
      &lt;
    </button>
    <span className="pagination-page-info">
      Page {currentPage} of {totalPages}
    </span>
    <button
      className="pagination-nav"
      disabled={currentPage === totalPages}
      onClick={() => handlePageClick(currentPage + 1)}
    >
      &gt;
    </button>
  </div>
)}

    </main>
  );
};

export default BookContainer;
