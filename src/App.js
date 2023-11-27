import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Products from './pages/components/Products';
import Auth from './pages/Auth';
import React, { useState, useEffect } from 'react';
import Layout from './pages/Layout';
import Admin from './pages/Admin';

function App() {
  const [loginID, setLoginID] = useState('');
  const [products, setProducts] = useState([]);

  // Sample product data (replace with actual product data)
  useEffect(() => {
    if (loginID === 'user1') {
      setProducts([
        { id: 1, name: 'Product A', description: 'Description for Product A', price: 19.99, stock: 10 },
        { id: 2, name: 'Product B', description: 'Description for Product B', price: 29.99, stock: 15 },
        { id: 3, name: 'Product C', description: 'Description for Product C', price: 39.99, stock: 8 },
        { id: 4, name: 'Product D', description: 'Description for Product D', price: 49.99, stock: 5 }
      ]);
    } else {
      setProducts([
        { id: 1, name: 'Product A2', description: 'Description for Product A', price: 19.99, stock: 10 },
        { id: 2, name: 'Product B2', description: 'Description for Product B', price: 29.99, stock: 15 },
        { id: 3, name: 'Product C2', description: 'Description for Product C', price: 39.99, stock: 8 },
        { id: 4, name: 'Product D2', description: 'Description for Product D', price: 49.99, stock: 5 }
      ]);
    }
  }, [loginID]);

  const [cart, setCart] = useState([
    { id: 1, name: 'Product A', description: 'Description for Product A', price: 19.99, quantity: 1 },
  ]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/'
          element={<Layout cart={cart} setCart={setCart} />}
        >
          {/* Pass both products and cart to the Products component */}
          <Route index element={<Products products={products} cart={cart} setCart={setCart} />} />
          <Route path='/online-ordering-system' element={<Products products={products} cart={cart} setCart={setCart} />} />
          <Route path='/Auth' element={<Auth loginID={loginID} setLoginID={setLoginID} />} />
          <Route path="/Admin" element={<Admin products={products} setProducts={setProducts} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
