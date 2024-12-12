import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardContent from "../components/DashboardContent";
import "../styles/Dashboard.css";
import Navigation from "../components/Navigation"; 

const AccountCenter = () => {
    console.log("rendered")
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);      // Track error state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token
        const token = sessionStorage.getItem("token");;
        
        if (!token) {
          setError("No authentication token found.");
          setLoading(false);
          return;
        }

        // Make the API request to fetch user data, passing the token in the Authorization header
        const response = await fetch(`${import.meta.env.VITE_BE_URL}/user/detail`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`  // Add the token in the Authorization header
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);  // Set the user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);  // Set the error message
      } finally {
        setLoading(false);  // Stop loading when the request finishes
      }
    };

    fetchUserData();
  }, []);
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
      <Navigation />
      <div className="dashboard-container">
        <DashboardContent userData={userData} />
      </div>
      <Footer />
    </>
  );
};

export default AccountCenter;