import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = ({ data, cart, setCart }) => {
  const [searchInput, setSearchInput] = useState('');
  const { businessID, events, services, products } = data;

  // Manage selected quantity for each product
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const addToCart = (product) => {
    const selectedQuantity = selectedQuantities[product.id] || 1;
  
    // Check if the total quantity in the cart will exceed the available stock
    const totalQuantityInCart = cart.reduce((total, item) => {
      if (item.id === product.id) {
        return total + item.quantity;
      }
      return total;
    }, 0);
  
    const remainingStock = product.stock - totalQuantityInCart;
  
    if (selectedQuantity > remainingStock) {
      // If the added quantity exceeds the remaining stock, show an error notification
      toast.error(`Cannot add item to the cart. Remaining stock: ${remainingStock}.\n Item in Cart: ${totalQuantityInCart}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000, // Auto-close the notification after 5 seconds
      });
      return;
    }
  
    // Check if the product is already in the cart
    const existingItem = cart.find((item) => item.id === product.id);
  
    if (existingItem) {
      // If the item is already in the cart, update the quantity
      setCart((prevCart) => {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + selectedQuantity,
              }
            : item
        );
      });
    } else {
      // If the item is not in the cart, add it with the selected quantity
      setCart((prevCart) => [
        ...prevCart,
        { ...product, quantity: selectedQuantity },
      ]);
    }
  
    // Reset the selected quantity for the specific product after adding to the cart
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: 1,
    }));
  
    // Show a notification when the product is added to the cart
    toast.success(`${selectedQuantity} ${product.name}${selectedQuantity > 1 ? 's' : ''} added to the cart!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000, // Auto-close the notification after 3 seconds
    });
  };
  

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-6">Product Catalog</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full mb-4 border border-gray-300 px-2 py-1 rounded"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products
          .filter((product) =>
            product.name.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((product) => (
            <li key={product.productID} className="mb-8 p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.desc}</p>
              
              {/* Options */}
              <div className="mb-4">
                <strong>Options:</strong>
                <ul>
                  {product.options.map((option, index) => (
                    <li key={index}>
                      Color: {option.color}, Size: {option.size}, Amount: {option.amount}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add 'Add to Cart' button */}
              <button
                onClick={() => addToCart(product)}
                className={`${
                  // Add your condition based on product stock or any other criteria
                  'bg-purple-500 hover:bg-purple-600'
                } text-white px-4 py-2 rounded focus:outline-none`}
              >
                Add to Cart
              </button>
            </li>
          ))}
      </ul>
      {/* Add the ToastContainer to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default Products;
