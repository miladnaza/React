import React, { useState } from "react";

function CartSummary({ cartItems, shippingOptions, onShippingChange }) {
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    contact: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0); // State for promo code discount
  const [showInvoice, setShowInvoice] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
  const selectedShipping = cartItems[0]?.shipping || "standard";
  const shippingCost =
    shippingOptions.find((option) => option.value === selectedShipping)?.cost ||
    0;
  const totalCost = subtotal + shippingCost - discount;

  const handleShippingSelect = (event) => {
    const value = event.target.value;
    setSelectedShipping(value);
    // Update shipping cost based on the selected option
    if (value === "standard") {
      setShippingCost(5.0);
    } else if (value === "express") {
      setShippingCost(10.0);
    } else if (value === "overnight") {
      setShippingCost(20.0);
    }
  };


  const handleApplyPromoCode = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(10); // Apply $10 discount for the correct promo code
      alert("Promo code applied! $10 discount added.");
    } else {
      setDiscount(0);
      alert("Invalid promo code.");
    }
  };

  const handleCheckout = () => {
    const isFormValid =
      deliveryDetails.name.trim() &&
      deliveryDetails.address.trim() &&
      deliveryDetails.contact.trim();

    if (!isFormValid) {
      alert("Please fill in all the delivery details.");
      return;
    }

    setShowInvoice(true); // Show invoice after validation
  };

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <hr className="horizontal-line" />
      <p>Total Book Cost: ${subtotal.toFixed(2)}</p>

      {/* Shipping Dropdown */}
      <div className="dropdown-container">
        <label htmlFor="shipping-select">Select Shipping Method: </label>
        <select
          className="cartsummary-dropdown-select"
          id="shipping-select"
          value={selectedShipping}
          onChange={handleShippingSelect}
        >
          {shippingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Promo Code Section */}
      {!showInvoice && (
        <div>
          <input
            type="text"
            placeholder="Enter your promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button className="checkout-button" onClick={handleApplyPromoCode}>
            Apply
          </button>
        </div>
      )}

      {/* Delivery Form */}
      {!showInvoice && (
        <div className="delivery-form">
          <h4>Enter Delivery Details:</h4>
          <div className="form-field">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Full Name"
              value={deliveryDetails.name}
              onChange={(e) =>
                setDeliveryDetails({ ...deliveryDetails, name: e.target.value })
              }
            />
          </div>
          <div className="form-field">
            <label>Address:</label>
            <textarea
              placeholder="Delivery Address"
              value={deliveryDetails.address}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  address: e.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="form-field">
            <label>Contact:</label>
            <input
              type="text"
              placeholder="Phone Number"
              value={deliveryDetails.contact}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  contact: e.target.value,
                })
              }
            />
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            Confirm & Generate Invoice
          </button>
        </div>
      )}

      {/* Invoice */}
      {showInvoice && (
        <div className="invoice">
          <h3>Invoice</h3>
          <p><strong>Name:</strong> {deliveryDetails.name}</p>
          <p><strong>Address:</strong> {deliveryDetails.address}</p>
          <p><strong>Contact:</strong> {deliveryDetails.contact}</p>
          <hr />
          <h4>Order Summary:</h4>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.quantity} x {item.title} - ${item.total.toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Shipping Cost:</strong> ${shippingCost.toFixed(2)}</p>
          <p><strong>Discount:</strong> -${discount.toFixed(2)}</p>
          <p><strong>Total Cost:</strong> ${totalCost.toFixed(2)}</p>
          <button onClick={() => alert("Thank you for your purchase! Invoice will be sent to your contact number shortly.")}>
            Complete Purchase
          </button>
        </div>
      )}
    </div>
  );
}

export default CartSummary;
