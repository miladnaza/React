import React from "react";

const Navigation = ({ onFilter }) => {
  const categories = [
    "Adventure", "Biography", "Fantasy", "Fiction", "Fitness", 
    "Investing", "Mystery", "Parenting", "Personal Finance", 
    "Psychology", "Real Estate Investing", "Relationships", 
    "Self-Help", "Short Stories", "Sports", "Thriller"
  ]; // Static categories

  const authors = [
    "J.K. Rowling", "Don Starkell", "Louise Penny", "Freida McFadden", "Robert T. Kiyosaki", 
    "Morgan Housel", "Brianna Wiest", "Kobe Bryant", "George S. Clason", "Michael Matthews"
  ]; // Static list of authors

  const ratings = [1, 2, 3, 4, 4.5, 5]; // Static rating options

  return (
    <nav id="N">
      <div className="filter-options">
        {/* Category Filter */}
        <span className="filter-option">
          Category
          <div className="category-dropdown">
            <span
              className="category-item"
              onClick={() => onFilter("All", "category")}
            >
              All
            </span>
            {categories.map((category, index) => (
              <span
                key={index}
                className="category-item"
                onClick={() => onFilter(category, "category")}
              >
                {category}
              </span>
            ))}
          </div>
        </span>

        {/* Author Filter */}
        <span className="filter-option">
          Author
          <div className="category-dropdown">
            <span
              className="category-item"
              onClick={() => onFilter("All", "author")}
            >
              All Authors
            </span>
            {authors.map((author, index) => (
              <span
                key={index}
                className="category-item"
                onClick={() => onFilter(author, "author")}
              >
                {author}
              </span>
            ))}
          </div>
        </span>

        {/* Rating Filter */}
        <span className="filter-option">
          Rating
          <div className="category-dropdown">
            {ratings.map((rating, index) => (
              <span
                key={index}
                className="category-item"
                onClick={() => onFilter(rating, "rating")}
              >
                {rating} stars or higher
              </span>
            ))}
          </div>
        </span>
      </div>
    </nav>
  );
};

export default Navigation;
