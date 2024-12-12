import React, { useState, useEffect } from "react";
import trashIcon from "./image/trash.png"; // Trash icon for removing items
import "../styles/Shoppingcart.css";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [showPromo, setShowPromo] = useState(false); // State to toggle promo code visibility

  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BE_URL}/api/cart/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cart data.");
        }
        const data = await response.json();
        setCartItems(data.items || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleRemoveFromCart = async (bookId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BE_URL}/api/cart/${userId}/${bookId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from cart.");
      }

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.bookId !== bookId)
      );
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  const handleUpdateQuantity = async (bookId, quantity) => {
    if (quantity < 1) return; // Prevent reducing below 1

    // Optimistically update UI
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.bookId === bookId ? { ...item, quantity } : item
      )
    );

    try {
      const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, bookId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item quantity.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  const handleApplyPromoCode = () => {
    setPromoError("");
    
    const trimmedPromoCode = promoCode.trim(); // Remove any extra spaces

    if (["11116", "11117", "11118", "11119", "11110", "11111"].includes(trimmedPromoCode)) {
      setPromoDiscount(10); // Apply a flat 10% discount
    } else {
      setPromoDiscount(0);
      setPromoError("Promo code not found or invalid.");
    }
  };

  const togglePromo = () => {
    setShowPromo(!showPromo); // Toggle the promo code box visibility
  };

  const handleCheckout = async () => {
    // Remove all items from the cart
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BE_URL}/api/cart/${userId}`, // Assuming there's an endpoint to clear the cart
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to clear cart.");
      }

      // After clearing the cart, reload the window and redirect to the main page
      window.location.reload(); // Reloads the page
      window.location.href = "/"; // Redirects to the home/main page
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  if (loading) return <p className="king-loading">Loading cart...</p>;
  if (error) return <p className="king-error">Error: {error}</p>;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.discountedPrice),
    0
  );
  const totalSavings = cartItems.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        (parseFloat(item.price) - parseFloat(item.discountedPrice)),
    0
  );
  const tax = subtotal * 0.13;
  const shipping = cartItems.length > 0 ? 10 : 0;
  const total = subtotal + tax + shipping - (subtotal * promoDiscount) / 100;

  return (
    <div className="king-cart-container">
      <h1 className="king-cart-title">My Bag ({cartItems.length})</h1>
      <div className="king-cart-content">
        <div className="king-cart-items">
          {cartItems.length === 0 ? (
            <p className="king-empty">Your cart is empty</p>
          ) : (
            <ul className="king-cart-list">
              {cartItems.map((item) => (
                <li key={item.bookId} className="king-cart-item">
                  <img
                    src={item.image || "https://via.placeholder.com/100x150"}
                    alt={item.fullTitle}
                    className="king-cart-image"
                  />
                  <div className="king-item-details">
                    <h3 className="king-item-title">{item.shortTitle}</h3>
                    <p className="king-item-author">Author: {item.author}</p>
                    <p className="king-item-category">Price: {item.discountedPrice}</p>
                  </div>
                  <div className="king-item-actions">
                    <p className="king-item-price">
                      ${(item.discountedPrice * item.quantity).toFixed(2)}
                    </p>
                    <div className="king-quantity-container">
                      <button
                        className="king-quantity-button"
                        onClick={() =>
                          handleUpdateQuantity(item.bookId, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="king-quantity">{item.quantity}</span>
                      <button
                        className="king-quantity-button"
                        onClick={() =>
                          handleUpdateQuantity(item.bookId, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.bookId)}
                      className="king-remove-button"
                    >
                      <img src={trashIcon} alt="Remove" className="king-trash-icon" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="king-order-summary">
          <h2>Order Summary</h2>
          <p>Subtotal: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${subtotal.toFixed(2)}</p>
          <p id="SAVINGSD">Item Savings:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-${totalSavings.toFixed(2)}</p>
          <p>Shipping: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${shipping.toFixed(2)}</p>
          <p>Tax (13%):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${tax.toFixed(2)}</p>
          {promoDiscount > 0 && <p>Promo Discount: -{promoDiscount}%</p>}
          <hr className="king-summary-divider" />
          <p className="king-total">Estimated Total: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${total.toFixed(2)}</p>
          <button className="king-checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          {/* Promo code box */}
          <div className="king-promo-code ">
            <p>Enter a promo code</p>

            <button className="king-show-more" onClick={togglePromo}>
              {showPromo ? "" : " "}{" "}
              <span id ="kkkkkkkk">{showPromo ? "v" : "^"}</span>
            </button>

            {showPromo && (
              <>
                <input
                  type="text"
                  placeholder="Enter a promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="king-promo-input"
                />
                <button onClick={handleApplyPromoCode} className="king-apply-button">
                  Apply
                </button>
                {promoError && <p className="king-promo-error">{promoError}</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
