import React, { useState } from 'react';
import Products from './Products';
import Services from './Services';
import Events from './Events';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const View = ({ data, cart, setCart }) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  if (data === null) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg">
          <p className="text-lg font-semibold mb-2">Business Not Found</p>
          <p className="text-sm">We couldn't locate the specified business. Please review the details for any spelling or input errors.</p>
        </div>
      </div>
    )
  }

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const { businessID, events, services, products } = data;

  const shouldRenderProductsButton = products !== null && products !== undefined && products.length > 0;
  const shouldRenderServicesButton = services !== null && services !== undefined && services.length > 0;
  const shouldRenderEventsButton = events !== null && events !== undefined && events.length > 0;
  const shouldRenderFilterButtons = data && [shouldRenderProductsButton, shouldRenderServicesButton, shouldRenderEventsButton].filter(Boolean).length >= 2;

  return (

<div className="p-6">
  {shouldRenderFilterButtons && (
    <div className="flex space-x-2 overflow-x-auto mb-4">
      <button
        onClick={() => handleFilterChange('all')}
        className={`px-4 py-2 rounded-md ${selectedFilter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'
          } hover:bg-gray-900 focus:outline-none focus:ring focus:border-gray-600`}
      >
        All
      </button>
      {shouldRenderProductsButton && (
        <button
          onClick={() => handleFilterChange('products')}
          className={`px-4 py-2 rounded-md ${selectedFilter === 'products' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-pink-600 focus:outline-none focus:ring focus:border-pink-300`}
        >
          Products
        </button>
      )}
      {shouldRenderServicesButton && (
        <button
          onClick={() => handleFilterChange('services')}
          className={`px-4 py-2 rounded-md ${selectedFilter === 'services' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-purple-600 focus:outline-none focus:ring focus:border-purple-300`}
        >
          Services
        </button>
      )}
      {shouldRenderEventsButton && (
        <button
          onClick={() => handleFilterChange('events')}
          className={`px-4 py-2 rounded-md ${selectedFilter === 'events' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300`}
        >
          Events
        </button>
      )}
    </div>
  )}


      <input
        type="text"
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full mb-4 border border-gray-300 px-2 py-1 rounded"
      />
      {/* Products, Services, or Events Component based on the selected filter */}
      {selectedFilter === 'products' && products && <Products products={products} cart={cart} setCart={setCart} searchInput={searchInput} />}
      {selectedFilter === 'services' && services && <Services services={services} searchInput={searchInput} />}
      {selectedFilter === 'events' && events && <Events events={events} searchInput={searchInput} />}
      {selectedFilter === 'all' && (
        <>
          {products && <Products products={products} cart={cart} setCart={setCart} searchInput={searchInput} />}
          {services && <Services services={services} searchInput={searchInput} />}
          {events && <Events events={events} searchInput={searchInput} />}
        </>
      )}

      {/* ToastContainer remains in the main component */}
      <ToastContainer />
    </div>
  );
};

export default View;