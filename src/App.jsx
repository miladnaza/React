import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Try from "./pages/Try";
import AccountCenter from "./components/AccountCenter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/AccountCenter" element={<AccountCenter />} />
        <Route path="/try" element={<Try />} />
      </Routes>
    </Router>
  );
};

export default App;
