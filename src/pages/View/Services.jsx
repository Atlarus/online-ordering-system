// Services.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Services = ({ services, searchInput }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      contactNumber: '',
      selectedSlot: '',
      message: '',
    });

    const availableDates = ['2024-03-01', '2024-03-02', '2024-03-03'];
    const availableTimes = {
      '2024-03-01': ['09:00', '12:00', '15:00'],
      '2024-03-02': ['10:00', '14:00', '18:00'],
      '2024-03-03': ['11:00', '13:00', '16:00'],
    };

    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleDateChange = (date) => {
        setFormData({
          ...formData,
          selectedDate: date,
          selectedTime: '', // Reset selected time when changing the date
        });
      };
    
      const handleTimeChange = (time) => {
        setFormData({
          ...formData,
          selectedTime: time,
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
        closeModal();
      };
    

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Services</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.filter((service) =>
                service.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                service.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase()))
            ).map((service) => (
                <li key={service.serviceID} className="mb-8 p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-2">{service.desc}</p>
                    <p className="text-gray-700 mb-2">${service.price.toFixed(2)}</p>
                    <button onClick={openModal}>Request Service</button>
                    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Form Modal"
        className=""
      >
        <h2>Form Modal</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Contact Number:
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Date:
            <DatePicker
              selected={formData.selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              excludeDates={availableDates.filter((date) => date !== formData.selectedDate)}
            />
          </label>
          <br />
          {formData.selectedDate && availableTimes[formData.selectedDate] && (
  <label>
    Time:
    <select
      name="selectedTime"
      value={formData.selectedTime}
      onChange={handleTimeChange}
    >
      <option value="">Select a time</option>
      {availableTimes[formData.selectedDate].map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  </label>
)}
          <br />
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </Modal>
                </li>
            ))}
            </ul>
        </div>
    );
};


export default Services;
