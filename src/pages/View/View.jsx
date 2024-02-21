import React, { useState } from 'react';
import Products from './Products';
import Services from './Services';
import Events from './Events';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const View = ({ data, cart, setCart }) => {
  const [searchInput, setSearchInput] = useState('');

  if (data === null) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <p className="text-lg font-semibold mb-2">Business Not Found</p>
        <p className="text-sm">We couldn't locate the specified business. Please review the details for any spelling or input errors.</p>
      </div>
    </div>
    )
  }
  
  const { businessID, events, services, products } = data;

  return (
    
    <div className="p-6">
                  <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full mb-4 border border-gray-300 px-2 py-1 rounded"
            />
      {/* Products Component */}
      <Products products={products} cart={cart} setCart={setCart} searchInput={searchInput} />

      {/* Services Component */}
      <Services data={data} searchInput={searchInput} />

      {/* Events Component */}
      <Events data={data} searchInput={searchInput} />

      {/* ToastContainer remains in the main component */}
      <ToastContainer />
    </div>
  );
};

export default View;