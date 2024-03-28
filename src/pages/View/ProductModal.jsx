import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ProductModal = ({ product, imageUrl, closeModal, cart, setCart }) => {
    const [selectedQuantities, setSelectedQuantities] = useState({});

    const addToCart = (product) => {
        const selectedQuantity = selectedQuantities[product.name] || 1;

        const updateCart = (item) => {
            setCart((prevCart) => {
                return prevCart.map((cartItem) =>
                    cartItem.name === item.name
                        ? { ...cartItem, amount: cartItem.amount + selectedQuantity }
                        : cartItem
                );
            });
        };

        // Check if the total quantity in the cart will exceed the available stock
        const totalQuantityInCart = cart.reduce((total, item) =>
            item.name === product.name ? total + item.amount : total, 0);

        const remainingStock = product.amount - totalQuantityInCart;

        if (!product.amount || selectedQuantity <= remainingStock) {
            const existingItem = cart.find((item) => item.name === product.name);

            if (existingItem) {
                // If the item is already in the cart, update the quantity
                updateCart(existingItem);
            } else {
                // If the item is not in the cart, add it with the selected quantity
                setCart((prevCart) => [
                    ...prevCart,
                    { ...product, amount: selectedQuantity, stock: remainingStock },
                ]);
            }

            // Reset the selected quantity for the specific product after adding to the cart
            setSelectedQuantities((prevQuantities) => ({
                ...prevQuantities,
                [product.name]: 1,
            }));

            // Show a notification when the product is added to the cart
            toast.success(`${selectedQuantity} ${product.name}${selectedQuantity > 1 ? 's' : ''} added to the cart!`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000, // Auto-close the notification after 3 seconds
            });
        } else {
            // If the added quantity exceeds the remaining stock, show an error notification
            toast.error(`Cannot add item to the cart. Remaining stock: ${remainingStock}.\n Item in Cart: ${totalQuantityInCart}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000, // Auto-close the notification after 5 seconds
            });
        }
    };

    const handleQuantityChange = (productName, amount) => {
        setSelectedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productName]: amount,
        }));
    };

    const handleOverlayClick = (e) => {
        // Check if the click target is the overlay (bg-black opacity-50)
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    const options = [];

    if (product.amount > 0) {
        for (let i = 1; i <= product.amount; i++) {
            options.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center overflow-auto">
            {/* Modal overlay with click event */}
            <div
                className="fixed inset-0 bg-black opacity-50 modal-overlay"
                onClick={handleOverlayClick}
            ></div>

            {/* Modal content */}
            <div className="modal z-0 bg-white p-4 m-4 rounded-lg shadow-lg max-w-md max-h-full overflow-auto">
                {/* Add content for the modal, e.g., product details */}
                <img src={imageUrl} alt={product.name} className="mb-2 rounded-md" />
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p>{product.desc}</p>

                {options.length > 0 && (
                    <select
                        key={product.productID}
                        value={selectedQuantities[product.name] || 1}
                        onChange={(e) => handleQuantityChange(product.name, parseInt(e.target.value))}
                        className="border rounded-md"
                    >
                        {options}
                    </select>
                )}
                <button
                    onClick={() => addToCart(product)}
                    className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded focus:outline-none"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductModal;