import Header from "../components/Header";
import Footer from "./Footer";
import "../styles/Dashboard.css";
import React from 'react';
import { Link } from "react-router-dom";


const AccountCenter = () => {
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
        <div>
        <Header onSearch={handleSearch} />
        </div>
        <div>
        <div className="dashboard-container">
        <header className="dashboard-header">
          <nav className="navbar">
            <ul className="navbar-menu">
              <li>Dashboard</li>
              <li>Order History</li>
              <li>Account Details</li>
              <li>Payment Options</li>
              <li>Email Preferences</li>
              <li>My Points</li>
              <li>Wish List Archive</li>
            </ul>
          </nav>
          <div className="header-buttons">
          <Link to="/" className="header-btn">
              Continue shopping
            </Link>
          </div>
        </header>
  
        
  
        <div className="dashboard-content">
          <main className="main-content">
            <div className="card-container">
              <div className="card">
                <h3>Order History</h3>
                <p>You have no order history</p>
                <button className="card-btn">Learn more!</button>
              </div>
  
              <div className="card">
                <h3>My Points</h3>
                <p>Earn 5 points on almost every dollar spent.</p>
                <button className="card-btn">Learn more!</button>
              </div>
  
              <div className="card">
                <h3>Payment Options</h3>
                <p>Set up a preferred payment option to enjoy faster checkout.</p>
                <button className="card-btn">Set Up Payment Option</button>
                <button className="card-btn secondary">Manage Cards</button>
              </div>
  
              <div className="card">
                <h3>Email Preferences</h3>
                <p>Email: Yes, send email to NkJ@gmail.com</p>
                <p>Mailing Address: Not Specified</p>
                <button className="card-btn">Edit</button>
              </div>
  
              <div className="card">
                <h3>Wish List Archive</h3>
                <p>Refer to your old wish lists.</p>
                <button className="card-btn">View Archive</button>
              </div>
  
              <div className="card">
                <h3>Account Details</h3>
                <p>Name: Niloofar Koochakian Jazi</p>
                <p>Email: kouchakian.niloofar@gmail.com</p>
                <p>Password: ********</p>
                <p>Phone: 437.955.9545</p>
                <p>Language: English</p>
                <p>Saved Address: Not Specified</p>
                <button className="card-btn">Edit</button>
              </div>
            </div>
          </main>
        </div>
      </div>
        </div>
        <div>
          <Footer></Footer>
        </div>
        </>
        
      );
}
export default AccountCenter;