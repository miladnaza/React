import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthenticationPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Use lowercase */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default AuthenticationPage;
