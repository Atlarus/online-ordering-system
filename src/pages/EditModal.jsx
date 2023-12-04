import React, { useState } from 'react';

const EditModal = ({ product, onEdit, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleEdit = () => {
    // Ensure that editedProduct.price is a valid number
    const editedPrice = isNaN(editedProduct.price) ? 0 : parseFloat(editedProduct.price);

    // Update the product with the edited values
    onEdit({
      ...product,
      name: editedProduct.name,
      description: editedProduct.description,
      price: editedPrice,
    });

    // Close the modal
    handleClose();
  };

  const handleClose = () => {
    // Reset the edited product state and close the modal
    setEditedProduct({
      name: product.name,
      description: product.description,
      price: product.price,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          />
        </label>
        <label className="block mb-2">
          Price:
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          />
        </label>
        <div className="flex justify-between">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Save Changes
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
