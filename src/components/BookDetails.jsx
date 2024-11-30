import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../BookDetails.css";

const BookDetails = () => {
  const { shortTitle } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/books/shortTitle/${encodeURIComponent(shortTitle)}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Book with shortTitle "${shortTitle}" not found.`);
          }
          throw new Error(`Error fetching book details: ${response.statusText}`);
        }
        const data = await response.json();
        setBook(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [shortTitle]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="book-details-container">
      <div className="book-header">
        <img
          src={book.image || "https://via.placeholder.com/200x300"}
          alt={book.title}
          className="book-image"
        />
        <h1>{book.fullTitle}</h1>
      </div>

      <div className="book-info">
        <p>
          <strong>Author:</strong> {book.author || "Unknown"}
        </p>
        <p className="book-price">
          Price: ${book.price || "Unavailable"}
        </p>
        <p>
          <strong>Description:</strong> {book.description || "No description available"}
        </p>
        <div className="rating-bar">
          <span>Rating:</span>
          <div className="rating-stars">
            <div
              className="rating-filled"
              style={{
                width: `${(book.ratings / 5) * 100 || 0}%`,
              }}
            ></div>
          </div>
          <span>{book.ratings || "Not rated"} / 5</span>
        </div>
      </div>

      <div className="book-footer">
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
};

export default BookDetails;
