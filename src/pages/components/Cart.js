// Import necessary dependencies
import React, { useState } from 'react';

// Sample product data (replace with actual product data)
const products = [
  { id: 1, name: 'Product A', description: 'Description for Product A', price: 19.99 },
  { id: 2, name: 'Product B', description: 'Description for Product B', price: 29.99 },
  { id: 3, name: 'Product C', description: 'Description for Product C', price: 39.99 },
];

// React component for Shopping Cart
const Cart = ({cart, setCart}) => {

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
