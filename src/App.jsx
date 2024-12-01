import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Try from "./pages/Try";
import Details from "./pages/Details";
import AccountCenter from "./pages/AccountCenter";
import Bookslist from "./components/Bookslist";
/*import Register from "./components/Register";
import Login from "./components/Login"
<Route path="/login" element={<Login />} /> {}
        <Route path="/register" element={<Register />} />*/
import "./styles/ShoppingCart.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        
        <Route path="/account" element={<AccountCenter />} />
        <Route path="/book-details/:shortTitle" element={<Details />} />
        <Route path="/Bookslist" element={<Bookslist />} />        
        <Route path="/try" element={<Try />} />
      </Routes>
    </Router>
  );
};

export default App;
