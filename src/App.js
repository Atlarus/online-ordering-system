import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import View from './pages/View/View';
import Layout from './pages/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound';
import Demo from './pages/Demo/Demo';
import Loader from './components/Loader';

function App() {
  const [cart, setCart] = useState([]);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const getBusinessIDFromPath = () => {
    const pathArray = location.pathname.split('/');
    const businessIDIndex = pathArray.indexOf('v') + 1; // Assuming 'v' is part of the path
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

    // Fetch data if the path does not include /Dashboard
    if (location.pathname.includes('/v/')) {
      fetchData();
    } else {
      // If on /Dashboard, set data to an empty object and mark loading as false
      setData({});
      setIsDataLoading(false);
    }
  }, [businessID, location.pathname]);

  if (isDataLoading) {
    return <Loader />
  }

  return (
    <Routes>
      <Route path='/' element={<Demo />} />
      <Route path='/Dashboard' element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      <Route path={`/v/:businessID`} element={
        <Layout
          cart={cart}
          setCart={setCart}
          data={data}
          setData={setData}
          businessID={businessID}
          setError={setError}
          setIsDataLoading={setIsDataLoading}
        />}>
        <Route index element={<View data={data} cart={cart} setCart={setCart} businessID={businessID} />} />
      </Route>
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
}

export default App;