import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CartModal from './CartModal';

const Layout = ({ cart, setCart, setProducts, businessID }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-4 shadow-xl">
        <div className="flex items-center justify-between flex-wrap"> {/* Use flex-wrap to allow items to wrap on smaller screens */}
          <Link to={`/v/${businessID}`} className="text-white text-2xl font-bold mr-4 mb-4 sm:mb-0"> {/* Add margin bottom on smaller screens */}
            {businessID}
          </Link>
          <div className="flex items-center space-x-4">
            <Link to={`/v/${businessID}`} className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to={`/Dashboard`} className="text-white hover:text-gray-300">
              Dashboard
            </Link>
            <button
              onClick={openCartModal}
              className="bg-yellow-500 text-gray-800 px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none"
            >
              Cart
            </button>
          </div>
        </div>
      </nav>

      <Outlet />

      {/* Use CartModal component */}
      <CartModal
        cart={cart}
        setCart={setCart}
        setProducts={setProducts}
        isModalOpen={isCartModalOpen}
        closeModal={closeCartModal}
        ariaHideApp={false}
      />
    </div>
  );
};

export default Layout;
