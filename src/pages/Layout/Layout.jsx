import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import CartModal from './CartModal';
import axios from 'axios';

const Layout = ({ cart, setCart, setData, businessID, data, setError, setIsDataLoading }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/get_products_services_events?businessID=${businessID}`);
      if (response) {
        setData(response.data);
        setError(null);
        setIsDataLoading(false);
      }
    } catch (error) {
      setError(error.response.data.error);
      setData(null);
      setIsDataLoading(false);
    }
  };

  if(data === null || data === undefined){
    fetchData();
  }

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
            <i class="fa-solid fa-house"></i>
            </Link>
            <Link to={`/Dashboard`} className="text-white hover:text-gray-300">
              Dashboard
            </Link>
            <button
              onClick={openCartModal}
              className="bg-yellow-500 text-gray-800 px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none flex items-center"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </nav>

      <Outlet />

      {/* Use CartModal component */}
      <CartModal
        cart={cart}
        setCart={setCart}
        isModalOpen={isCartModalOpen}
        closeModal={closeCartModal}
        ariaHideApp={false}
      />
    </div>
  );
};

export default Layout;
