import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardContent from "../components/DashboardContent";
import "../styles/Dashboard.css";

const AccountCenter = () => {
    console.log("rendered")
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
    <>
      <Header onSearch={handleSearch} />
      <div className="dashboard-container">
        <DashboardContent />
      </div>
      <Footer />
    </>
  );
};

export default AccountCenter;