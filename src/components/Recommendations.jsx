import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../styles/Recommendations.css";

const Recommendations = ({ category, currentBookShortTitle }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        
        const response = await fetch(
          `${import.meta.env.VITE_BE_URL}/api/books/category/${encodeURIComponent(category)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await response.json();

        // Exclude the current book from recommendations
        const filteredBooks = data.filter(
          (book) => book.shortTitle !== currentBookShortTitle
        );
        setBooks(filteredBooks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchRecommendations();
    }
  }, [category, currentBookShortTitle]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      handleScroll();
      scrollRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [books]);

  if (loading || books.length === 0 || error) return null; // Do not render if loading, empty, or error

  return (
    <div className="recommend-container">
     <h2 className="recommend-title">
  You May Also Like in {category === "All" ? "Newlisting" : category}
</h2>
      <div className="recommend-scroll-wrapper">
        {canScrollLeft && (
          <button className="scroll-button left" onClick={() => scroll("left")}>
            &lt;
          </button>
        )}
        <div className="recommend-book-container" ref={scrollRef}>
          {books.map((book) => (
            <Link
              to={`/book-details/${encodeURIComponent(book.shortTitle)}`} // Navigate to the book details page
              key={book.shortTitle}
              className="recommend-book-card"
            >
              <img
                src={book.image || "https://via.placeholder.com/150"}
                alt={book.shortTitle}
                className="recommend-book-image"
              />
              <h3 className="recommend-book-title">{book.shortTitle}</h3>
              <p className="recommend-book-author">{book.author}</p>
              <p className="recommend-book-price">${book.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
        {canScrollRight && (
          <button className="scroll-button right" onClick={() => scroll("right")}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
