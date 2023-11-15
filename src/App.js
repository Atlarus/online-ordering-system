import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Products from './pages/components/Products';

function App() {

  // Sample product data (replace with actual product data)
  const products = [
    { id: 1, name: 'Product A', description: 'Description for Product A', price: 19.99 },
    { id: 2, name: 'Product B', description: 'Description for Product B', price: 29.99 },
    { id: 3, name: 'Product C', description: 'Description for Product C', price: 39.99 },
    { id: 4, name: 'Product D', description: 'Description for Product C', price: 49.99 },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products products={products}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
