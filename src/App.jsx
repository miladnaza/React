import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Details from "./pages/Details";
import AccountCenter from "./pages/AccountCenter";
import Bookslist from "./components/Bookslist";
import Login from "./components/Login";
import Register from "./components/Register";
import WishlistPage from "./pages/WhishlistPage";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Main Page */}
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
       
        {/* Account Center Route */}
        <Route path="/account" element={<AccountCenter />} />

        {/* Book Details Route */}
        <Route path="/book-details/:shortTitle" element={<Details />} />
        <Route path="/WishlistPage" element={<WishlistPage />} />
        {/* Books List Route */}
        <Route path="/Bookslist" element={<Bookslist />} />
      </Routes>
    </Router>
  );
};

export default App;
