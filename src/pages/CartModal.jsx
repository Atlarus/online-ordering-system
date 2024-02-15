import React from 'react';
import Modal from 'react-modal';

const CartModal = ({ cart, setCart, setProducts, isModalOpen, closeModal }) => {
  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  // Function to increase the quantity of a product in the cart
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity < item.stock ? item.quantity + 1 : item.quantity }
          : item
      )
    );
  };

  // Function to decrease the quantity of a product in the cart
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const placeOrder = () => {
    // Deduct stock after placing the order
    cart.forEach((item) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === item.id
            ? { ...product, stock: product.stock - item.quantity }
            : product
        )
      );
    });

    // Clear the cart after placing the order
    setCart([]);
    closeModal(); // Close the modal
  };

  const overallTotal = cart.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Shopping Cart Modal"
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Product</th>
              <th className="text-left">Quantity</th>
              <th className="text-right">Price</th>
              <th className="text-right">Total</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="text-left">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                </td>
                <td className="flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </td>
                <td className="text-right">${item.price}</td>
                <td className="text-right">${(item.quantity * item.price)}</td>
                <td className="text-right">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right">
          <p className="font-semibold">Overall Total: ${overallTotal}</p>
        </div>
        <button
          onClick={placeOrder}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          disabled={cart.length === 0}
        >
          Place Order
        </button>
        <button
          onClick={closeModal}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-2"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CartModal;
