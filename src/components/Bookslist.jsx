import Header from "../components/Header";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import ShoppingCart from "./ShoppingCart"; // Import ShoppingCart component
import CartSummary from "./CartSummary"; // Import CartSummary component

const Booklist = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingOptions] = useState([
    { value: "standard", label: "Standard Shipping - $5.00", cost: 5.00 },
    { value: "express", label: "Express Shipping - $10.00", cost: 10.00 },
    { value: "overnight", label: "Overnight Shipping - $20.00", cost: 20.00 },
  ]);
  const [books, setBooks] = useState([]);  // State to store books

  useEffect(() => {
    // Fetch books from the backend
    const loadBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/Books`); // Your API endpoint
        //console.log(response);
        const booksData = await response.json();
        // Set books in the state
        const initialCartItems = booksData.map((book) => ({
          id: book._id,  // Use the MongoDB '_id' for each book
          title: book.title,
          quantity: 1,
          price: book.price,
          total: book.price,
          shipping: "standard",
        }));
        setBooks(booksData);  // Set the books data
        setCartItems(initialCartItems);  // Set the cart items
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    loadBooks();
  }, []);  // Empty dependency array to run only once on component mount

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + delta,
              total: (item.quantity + delta) * item.price,
            }
          : item
      )
      .filter((item) => item.quantity > 0); // Filter out items with quantity <= 0
    setCartItems(updatedCart);
  };

  const handleShippingChange = (selectedShipping) => {
    const updatedCart = cartItems.map((item) => ({
      ...item,
      shipping: selectedShipping,
    }));
    setCartItems(updatedCart);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };
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
    <div className="shopping-cart-page">
      <ShoppingCart
        cartItems={cartItems}
        totalItems={calculateTotalItems()}
        onQuantityChange={handleQuantityChange}
        onRemove={(id) => setCartItems(cartItems.filter((item) => item.id !== id))}
      />
      <CartSummary
        cartItems={cartItems}
        shippingOptions={shippingOptions}
        onShippingChange={handleShippingChange}
      />
    </div>
    <div>
      <Footer></Footer>
    </div>
    </>
    
  );
};

export default Booklist;
