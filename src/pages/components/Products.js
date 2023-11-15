// Import necessary dependencies
import React from 'react';

// React component for Product Catalog
const Products = ({ products }) => {
  return (
    <div>
      <h2>Product Catalog</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            {/* Add 'Add to Cart' button or other actions here */}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
