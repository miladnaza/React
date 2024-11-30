import React from "react";

function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <tr>
      <td>
        <div className="book-title">
          <strong>{item.title}</strong>
          <p>Paper Book</p>
          <button onClick={() => onRemove(item.id)}>Remove</button>
        </div>
      </td>
      <td>
        <button onClick={() => onQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.id, 1)}>+</button>
      </td>
      <td>${item.price.toFixed(2)}</td>
      <td>${item.total.toFixed(2)}</td>
    </tr>
  );
}

export default CartItem;
