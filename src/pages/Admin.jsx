import React, { useState } from 'react';
import EditModal from './EditModal';

const Admin = ({ products, setProducts }) => {
  const [searchInput, setSearchInput] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    setEditModalOpen(false);
  };

  const handleRemoveProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedProduct(null);
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

      {/* Edit or Remove Product Section */}
      <div className="p-4 bg-white rounded-md shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Edit or Remove Product</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full border p-2 rounded-md mb-4"
        />
        {products
          .filter((product) =>
            product.name.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((product) => (
            <div key={product.id} className="p-4 flex flex-col space-y-2">
              <p className="mb-2">Name: {product.name}</p>
              <p className="mb-2">Description: {product.description}</p>
              <p className="mb-2">Price: ${product.price.toFixed(2)}</p>
              <p className="mb-2">Stock: {product.stock}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(product)}
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

      {/* Edit Modal */}
      {selectedProduct && (
        <EditModal
          product={selectedProduct}
          onEdit={(editedProduct) =>
            handleEditProduct(selectedProduct.id, editedProduct)
          }
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default Admin;