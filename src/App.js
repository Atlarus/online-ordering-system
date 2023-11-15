import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Products from './pages/components/Products';
import Auth from './pages/Auth';
import Cart from './pages/components/Cart';
import { useState } from 'react';
import Layout from './pages/Layout';

function App() {

  // Sample product data (replace with actual product data)
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', description: 'Description for Product A', price: 19.99 },
    { id: 2, name: 'Product B', description: 'Description for Product B', price: 29.99 },
    { id: 3, name: 'Product C', description: 'Description for Product C', price: 39.99 },
    { id: 4, name: 'Product D', description: 'Description for Product C', price: 49.99 }
  ]);

  const [cart, setCart] = useState([
    { id: 1, name: 'Product A', description: 'Description for Product A', price: 19.99}
  ]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Layout />}>
          <Route index element={<Products products={products} />} />
          <Route path='/Auth' element={<Auth />} />
          <Route path='/Cart' element={<Cart cart={cart} setCart={setCart} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
