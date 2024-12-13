
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import BookContainer from "../components/BookContainer";
import Footer from "../components/Footer";
// this is my main page that home it has header footer and everything 
const MainPage = () => {
  const [books, setBooks] = useState([]); // All books fetched from API
  const [filteredBooks, setFilteredBooks] = useState([]); // Books after filtering
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch all books initially
  useEffect(() => {
    fetchBooks(); // Fetch all books on page load
  }, []);

  // Fetch all books from the backend
  const fetchBooks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data); // Set all books
      setFilteredBooks(data); // Set filtered books to all initially
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching books:", error.message);
      setError("Failed to fetch books");
      setLoading(false); // Set loading to false
    }
  };
  

  // Handle filter changes from Navigation component
  const handleFilter = async (filterValue, filterType) => {
    let url = `${import.meta.env.VITE_BE_URL}/api/books`;
    if (filterType === "category") {
      url = `${import.meta.env.VITE_BE_URL}/api/books/category/${filterValue}`;
    } else if (filterType === "author") {
      url = `${import.meta.env.VITE_BE_URL}/api/books/author/${filterValue}`;
    } else if (filterType === "rating") {
      url = `${import.meta.env.VITE_BE_URL}/api/books/rating/${filterValue}`;
    }

    try {
      setLoading(true); // Set loading to true while fetching data
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch filtered books");
      }
      const data = await response.json();
      setFilteredBooks(data); // Set filtered books based on the selected filter
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching filtered books:", error.message);
      setError("Failed to fetch filtered books");
      setLoading(false); // Set loading to false
    }
  };

  // Handle search from Header component
  const handleSearch = (query) => {
    if (!query) {
      setFilteredBooks(books); // Reset to all books if query is empty
      return;
    }

    // Filter books based on search query
    const results = books.filter((book) =>
      book.shortTitle.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(results); // Update filtered books based on the search query
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Navigation onFilter={handleFilter} />
      <BookContainer books={filteredBooks} loading={loading} error={error} />
      <Footer/>
    </div>
  );
};

export default MainPage;
