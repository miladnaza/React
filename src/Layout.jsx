import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header"; // Adjust the path if needed
import Footer from "./components/Footer"; // Adjust the path if needed

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Renders the content of the current route */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
