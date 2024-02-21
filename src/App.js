import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import View from './pages/View/View';
import Layout from './pages/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getBusinessIDFromPath = () => {
    const pathArray = window.location.pathname.split('/');
    const businessIDIndex = pathArray.indexOf('') + 2; // Assuming businessID is the first parameter
    return pathArray[businessIDIndex];
  };

  const businessID = getBusinessIDFromPath();

  useEffect(() => {
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

    fetchData();
  }, [businessID]);

  if (isDataLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Dashboard' element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path={`/v/${businessID}`} element={<Layout cart={cart} setCart={setCart} setData={setData} businessID={businessID} />}>
          <Route index element={<View data={data} cart={cart} setCart={setCart} businessID={businessID} />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
