import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookDetails from "../components/BookDetails";
import Navigation from "../components/Navigation";
const Details = () => {
  const { shortTitle } = useParams(); 
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setError(null); // Clear any existing errors
        setBook(null); // Reset book state to ensure fresh data is loaded
        
        const url = `${import.meta.env.VITE_BE_URL}/api/books/shortTitle/${encodeURIComponent(shortTitle)}`;
        console.log("Fetching book details from:", url); // Debug: Log the URL being fetched
        
        const response = await fetch(url);
        
        if (!response.ok) {
          // Handle HTTP errors
          if (response.status === 404) {
            throw new Error(`Book with shortTitle "${shortTitle}" not found.`);
          }
          throw new Error(`Error fetching book details: ${response.statusText}`);
        }
        
        const data = await response.json();
        setBook(data); // Update the state with the fetched book details
      } catch (err) {
        console.error("Error fetching book details:", err.message); // Debug: Log the error message
        setError(err.message); // Update error state
      }
    };
    
  
    fetchBookDetails();
  
    // Cleanup (optional, in case of unmount during fetch)
    return () => {
      setBook(null); // Clear book details to prevent stale state
      setError(null); // Clear error state
    };
  }, [shortTitle]);
  

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <Header></Header>
      <Navigation></Navigation>
      <BookDetails></BookDetails>
      <Footer></Footer>
    </div>
  );
};

export default Details;
