// Products.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader';

const Products = ({ products, cart, setCart, searchInput }) => {
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [imageUrls, setImageUrls] = useState({});
    const [isDataLoading, setIsDataLoading] = useState(true);

    const addToCart = (product) => {
        const selectedQuantity = selectedQuantities[product.name] || 1;

        if (!product.amount) {
            // Check if the product is already in the cart
            const existingItem = cart.find((item) => item.name === product.name);

            if (existingItem) {
                // If the item is already in the cart, update the quantity
                setCart((prevCart) => {
                    return prevCart.map((item) =>
                        item.name === product.name
                            ? {
                                ...item,
                                amount: item.amount + selectedQuantity,
                            }
                            : item
                    );
                });
            } else {
                // If the item is not in the cart, add it with the selected quantity
                setCart((prevCart) => [
                    ...prevCart,
                    { ...product, amount: selectedQuantity },
                ]);
            }

            // Show a notification when the product is added to the cart
            toast.success(`${selectedQuantity} ${product.name}${selectedQuantity > 1 ? 's' : ''} added to the cart!`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000, // Auto-close the notification after 3 seconds
            });

            return
        } else {

            // Check if the total quantity in the cart will exceed the available stock
            const totalQuantityInCart = cart.reduce((total, item) => {
                if (item.name === product.name) {
                    return total + item.amount;
                }
                return total;
            }, 0);

            const remainingStock = product.amount - totalQuantityInCart;

            if (selectedQuantity > remainingStock) {
                // If the added quantity exceeds the remaining stock, show an error notification
                toast.error(`Cannot add item to the cart. Remaining stock: ${remainingStock}.\n Item in Cart: ${totalQuantityInCart}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000, // Auto-close the notification after 5 seconds
                });
                return;
            }

            // Check if the product is already in the cart
            const existingItem = cart.find((item) => item.name === product.name);

            if (existingItem) {
                // If the item is already in the cart, update the quantity
                setCart((prevCart) => {
                    return prevCart.map((item) =>
                        item.name === product.name
                            ? {
                                ...item,
                                amount: item.amount + selectedQuantity,
                            }
                            : item
                    );
                });
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
                autoClose: 3000, // Auto-close the notification after 3 seconds
            });

        }


    };

    const handleQuantityChange = (productName, amount) => {
        setSelectedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productName]: amount,
        }));
    };

    useEffect(() => {
        const fetchImages = async () => {
          const urls = {};
    
          for (const product of products) {
            try {
              const response = await fetch(`http://localhost:5000/images/${product.name}.jpg`);
              
              if (!response.ok) {
                throw new Error(`Failed to fetch image for ${product.name}.`);
              }
    
              const blob = await response.blob();
              const imageUrl = URL.createObjectURL(blob);
    
              urls[product.name.toLowerCase()] = imageUrl;
            } catch (error) {
              console.error(error.message);
            }
          }
    
          setImageUrls(urls);
          setIsDataLoading(false);
        };
    
        fetchImages();
      }, [products]);

    if (products === null) {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                    <p className="text-lg font-semibold mb-2">Business Not Found</p>
                    <p className="text-sm">We couldn't locate the specified business. Please review the details for any spelling or input errors.</p>
                </div>
            </div>
        )
    }

    if (isDataLoading) {
        return <Loader />
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                    .filter((product) =>
                        product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                        product.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase()))
                    )
                    .map((product, productIndex) => {
                        const imageUrl = imageUrls[product.name.toLowerCase()];
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
                            <li key={product.productID} className="mb-8 p-6 bg-white rounded-lg shadow-lg grid grid-cols-1 gap-2">

                                {imageUrls[product.name.toLowerCase()] ? (
                                    <img src={imageUrl} alt={product.name} className="mb-2 rounded-md" />
                                ) : (
                                    <div className="mb-2 rounded-md bg-red-200" style={{ height: '200px' }}>
                                        {/* Loading spinner or placeholder image */}
                                    </div>
                                )}
                                <h3 className="text-2xl font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-gray-600">{product.desc}</p>

                                <select>
                                    <option>Blue</option>
                                </select>
                                <select>
                                    <option>S</option>
                                </select>

                                {options.length > 0 ? (
                                    <select
                                        key={product.productID}
                                        value={selectedQuantities[product.name] || 1}
                                        onChange={(e) => handleQuantityChange(product.name, parseInt(e.target.value))}
                                        className="border rounded-md"
                                    >
                                        {options}
                                    </select>
                                ) : null}

                                {product.price !== null && product.price !== undefined && product.price > 0 && (
                                    <h3 className="text-2xl font-semibold mb-2 text-gray-800">${product.price.toFixed(2)}</h3>
                                )}

                                {/* Add 'Add to Cart' button */}
                                <button
                                    onClick={() => addToCart(product)}
                                    className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded focus:outline-none"
                                >
                                    Add to Cart
                                </button>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
};

export default Products;