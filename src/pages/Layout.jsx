import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CartModal from './CartModal';

const Layout = ({ cart, setCart, setProducts }) => {
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
        <div className="flex items-center justify-between">
          <Link to={'/'} className="text-white text-2xl font-bold">
            Your Logo
          </Link>
          <div className="flex items-center space-x-4">
            <Link to={'/'} className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to={'/Auth'} className="text-white hover:text-gray-300">
              Auth
            </Link>
            <Link to={'/Admin'} className="text-white hover:text-gray-300">
              Admin
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
      />
    </div>
  );
};

export default Layout;
