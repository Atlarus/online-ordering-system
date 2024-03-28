// Products.jsx
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader';
import ProductModal from './ProductModal';

const Products = ({ products, cart, setCart, searchInput }) => {
    const [imageUrls, setImageUrls] = useState({});
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // Function to open the modal
    const openModal = (product) => {
        console.log("Opening modal for product:", product);
        setSelectedProduct(product);
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedProduct(null);
        setModalOpen(false);
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

    if (isDataLoading) {
        return <Loader />
    }

    if (products === undefined) {
        return null; // or handle the case where products is not available
    }

    return (
<>
    {products && (
        <div>
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {products
                    .filter((product) =>
                        product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                        product.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase()))
                    )
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((product, productIndex) => {
                        const imageUrl = imageUrls[product.name.toLowerCase()];

                        return (
                            <li key={product.productID} className="mb-8 p-6 bg-white rounded-lg shadow-lg grid grid-cols-1" onClick={() => openModal(product)}>
                                {imageUrls[product.name.toLowerCase()] ? (
                                    <img
                                        src={imageUrl}
                                        alt={product.name}
                                        className="mb-2 rounded-md object-cover sm:h-24 md:h-40 max-h-48 w-full shadow-sm"
                                    />
                                ) : (
                                    <div className="mb-2 rounded-md bg-gray-200 sm:h-24 md:h-40 max-h-48 h-48 w-full shadow-sm">
                                    </div>
                                )}
                                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                                <p className="text-gray-600">{product.desc}</p>

                                {product.price !== null && product.price !== undefined && product.price > 0 && (
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">${product.price.toFixed(2)}</h3>
                                )}
                            </li>
                        );
                    })}
            </ul>
            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`mx-1 px-3 py-1 rounded-md cursor-pointer ${
                            currentPage === index + 1 ? 'bg-gradient-to-br from-pink-500 to-indigo-500 text-white' : 'bg-gray-300 text-gray-700'
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {/* Modal rendering conditionally based on state */}
            {isModalOpen && (
                <ProductModal product={selectedProduct} imageUrl={imageUrls[selectedProduct.name.toLowerCase()]} closeModal={closeModal} cart={cart} setCart={setCart} />
            )}
        </div>
    )}
</>

    )
};

export default Products;