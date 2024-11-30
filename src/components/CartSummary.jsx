import React from "react";

function CartSummary({ cartItems, shippingOptions, onShippingChange }) {
  // Calculate subtotal by adding up the total price of all items
  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);

  // Get the selected shipping option for the entire cart (assuming all items use the same shipping option)
  const selectedShipping = cartItems[0]?.shipping || "standard"; // Default to 'standard' if no items
  const shippingCost = shippingOptions.find(option => option.value === selectedShipping)?.cost || 0;

  // Calculate the total cost (items + selected shipping)
  const totalCost = subtotal + shippingCost;

  // Handle change in shipping option for the entire cart
  const handleShippingSelect = (event) => {
    const selectedShipping = event.target.value;
    onShippingChange(selectedShipping); // Update shipping for all items
  };

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <hr className="horizontal-line" />
      <p>Total Book Cost: ${subtotal.toFixed(2)}</p>

      {/* Shipping Dropdown Box */}
      <div className="dropdown-container">
        <label htmlFor="shipping-select">Select Shipping Method: </label>
        <select className="cartsummary-dropdown-select" id="shipping-select" value={selectedShipping} onChange={handleShippingSelect}>
          {shippingOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input type="text" placeholder="Enter your code" />
        <button className="checkout-button">Apply</button>
      </div>

      {/* Total Cost */}
      <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
      <button className="checkout-button">Check Out</button>
    </div>
  );
}

export default CartSummary;
