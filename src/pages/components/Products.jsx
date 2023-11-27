import React, { useState } from 'react';

const Products = ({ products, cart, setCart }) => {
  // Manage selected quantity for each product
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // If the item is already in the cart, update the quantity
      setCart((prevCart) => {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + selectedQuantities[product.id] } : item
        );
      });
    } else {
      // If the item is not in the cart, add it with the selected quantity
      setCart((prevCart) => [...prevCart, { ...product, quantity: selectedQuantities[product.id] }]);
    }

    // Reset the selected quantity for the specific product after adding to the cart
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: 1,
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-extrabold mb-6 text-white">Product Catalog</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product.id} className="mb-8 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-green-600 font-bold mb-2">Price: ${product.price.toFixed(2)}</p>
            <p className="text-blue-500 mb-2">Stock: {product.stock}</p>
            {/* Use a dropdown for quantity selection */}
            <label className="mb-2 block">
              Quantity:
              <select
                value={selectedQuantities[product.id] || 1}
                onChange={(e) =>
                  setSelectedQuantities({
                    ...selectedQuantities,
                    [product.id]: parseInt(e.target.value) || 1,
                  })
                }
                className="ml-2 border border-gray-300 px-2 py-1 rounded"
              >
                {[...Array(product.stock).keys()].map((quantity) => (
                  <option key={quantity + 1} value={quantity + 1}>
                    {quantity + 1}
                  </option>
                ))}
              </select>
            </label>
            {/* Add 'Add to Cart' button */}
            <button
              onClick={() => addToCart(product)}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 focus:outline-none"
              disabled={product.stock === 0 || selectedQuantities[product.id] > product.stock}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
