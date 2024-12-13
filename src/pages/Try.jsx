import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
const Try = () => {
  return (
    <div>
      <Header />
      <Navigation/>
      <main style={{ padding: "20px", textAlign: "center" }}>
        <h1>About Our Bookstore</h1>
        <p style={{ maxWidth: "800px", margin: "20px auto", fontSize: "18px", lineHeight: "1.6" }}>
          Welcome to our online bookstore! Our mission is to provide a wide selection of books 
          across various genres to cater to the needs of every book lover. Whether you're 
          looking for fiction, non-fiction, academic, or children’s books, we have something 
          for everyone. Our platform is user-friendly and designed to make your browsing 
          and shopping experience as seamless as possible. We are committed to offering 
          high-quality books at competitive prices and delivering them right to your doorstep.
        </p>
        <p style={{ maxWidth: "800px", margin: "20px auto", fontSize: "18px", lineHeight: "1.6" }}>
          Explore our categories, discover new authors, and enjoy the world of books with us. 
          Thank you for choosing our bookstore. Happy reading!
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Try;


Try.jsx