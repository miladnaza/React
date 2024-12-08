import React from "react";
import CartItem from "./CartItem";
import "../styles/Shoppingcart.css";

//import logo from "../assets/BS.jpg";
function ShoppingCart({ cartItems, totalItems, onQuantityChange, onRemove }) {
  return (
    <div className="cart-details">
         <div className="cart-header">
      <h2>Shopping Cart</h2>
     
      <p className="book-items">
          {totalItems} Item{totalItems !== 1 ? "s" : ""}
        </p> 
      </div>
      <hr className="horizontal-line" />
      {/* Dynamically display total quantity */}
      
      <table>
        <thead>
          <tr>
            <th>Book Details</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>
      <a href="/Account" class="shopping-link">Continue Shopping</a>
    </div>
  );
}

export default ShoppingCart;
