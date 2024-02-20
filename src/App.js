import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import Products from './pages/components/Products';
import Auth from './pages/Auth';
import React, { useState, useEffect } from 'react';
import Layout from './pages/Layout';
import Admin from './pages/Admin';
import axios from 'axios';

function App() {
  const [loginID, setLoginID] = useState('');
  const [cart, setCart] = useState([]);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const getBusinessIDFromPath = () => {
    const pathArray = window.location.pathname.split('/');
    const businessIDIndex = pathArray.indexOf('') + 1; // Assuming businessID is the first parameter
    return pathArray[businessIDIndex];
  };

  const businessID = getBusinessIDFromPath();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/get_products_services_events?businessID=${businessID}`);
        setData(response.data);
        setError(null);
        setIsDataLoading(false); // Set loading to false when data is fetched
        console.log("pass");
      } catch (error) {
        setError(error.response.data.error);
        setData(null);
        setIsDataLoading(false); // Set loading to false even on error
        console.log("fail");
      }
    };

    fetchData();
  }, [businessID]);

  if (isDataLoading) {
    // Render a loading indicator or a placeholder while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:businessID' element={<Layout cart={cart} setCart={setCart} setData={setData} businessID={businessID} />}>
          <Route index element={<Products data={data} cart={cart} setCart={setCart} error={error} businessID={businessID} />} />
          <Route path='Auth' element={<Auth loginID={loginID} setLoginID={setLoginID} />} />
          <Route path='Admin' element={<Admin data={data} setData={setData} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
