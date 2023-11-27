import React, { useState } from 'react';

const Admin = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  });

  const handleAddProduct = () => {
    setProducts((prevProducts) => [...prevProducts, { ...newProduct, id: prevProducts.length + 1 }]);
    // Reset the new product form
    setNewProduct({ name: '', description: '', price: 0, stock: 0 });
  };

  const handleEditProduct = (productId, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const handleRemoveProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  return (
    <div className="flex flex-col space-y-4 p-8">
      <div className="p-4 bg-white rounded-md shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Add Product</h2>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full border p-2 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full border p-2 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Price:
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            className="w-full border p-2 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Stock:
          <input
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
            className="w-full border p-2 rounded-md"
          />
        </label>
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Add Product
        </button>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-white rounded-md shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Edit or Remove Product</h2>
            {products.map((product) => (
            <div key={product.id} className="p-4 flex flex-col space-y-2">
                <p className="mb-2">Name: {product.name}</p>
                <p className="mb-2">Description: {product.description}</p>
                <p className="mb-2">Price: ${product.price.toFixed(2)}</p>
                <p className="mb-2">Stock: {product.stock}</p>
                <div className="flex space-x-2">
                <button
                    onClick={() => {
                    const updatedName = prompt('Enter the new name:', product.name);
                    const updatedDescription = prompt('Enter the new description:', product.description);
                    const updatedPrice = parseFloat(prompt('Enter the new price:', product.price) || 0);
                    const updatedStock = parseInt(prompt('Enter the new stock:', product.stock) || 0);

                    if (updatedName !== null && updatedDescription !== null) {
                        handleEditProduct(product.id, {
                        name: updatedName || product.name,
                        description: updatedDescription || product.description,
                        price: updatedPrice || product.price,
                        stock: updatedStock || product.stock,
                        });
                    }
                    }}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none"
                >
                    Remove
                </button>
                </div>
            </div>
            ))}
            </div>
      </div>
    </div>
  );
};

export default Admin;
